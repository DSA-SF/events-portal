import zoomApi from "zoomapi";
import redis from "./redis";
import { DateTime } from "luxon";
import pMap from "p-map";
import { ZoomMeeting } from "../model/event";

export interface ZoomAccount {
  id: string;
  name: string;
  email: string;
}

export const zoom = zoomApi({
  accountId: process.env.ZOOM_ACCOUNT_ID || "MISSING",
  oauthClientId: process.env.ZOOM_CLIENT_ID || "MISSING",
  oauthClientSecret: process.env.ZOOM_CLIENT_SECRET || "MISSING",
});

export const getLicensedUsers = async (): Promise<ZoomAccount[]> => {
  let licensedUsersCache = await redis.get("zoomLicensedUsers");
  if (licensedUsersCache) {
    return JSON.parse(licensedUsersCache);
  }

  const response = await zoom.users.ListUsers();
  const licensedUsers = response.users
    .filter((u) => u.type === 2)
    .map((u) => ({
      id: u.id,
      name: (u.first_name + " " + u.last_name).trim(),
      email: u.email,
    }));
  try {
    redis.set("zoomLicensedUsers", JSON.stringify(licensedUsers), "EX", 60 * 60); // 1HR CACHE
  } catch (error) {
    console.error(error);
  }

  return licensedUsers;
};

export const getAllUserMeetings = async (licensedUsers: ZoomAccount[]) => {
  let allUserMeetings = await redis.get("zoomAllUserMeetings");
  if (allUserMeetings) {
    return JSON.parse(allUserMeetings);
  }

  const getUserMeetings = async ({ id, name: accountName }: ZoomAccount): Promise<ZoomMeeting[]> => {
    const response = await zoom.meetings.ListMeetings(id, { type: "upcoming", page_size: 300 });

    type SomeAreRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

    return response.meetings
      .map((m) => {
        const { start_time, duration, agenda, topic } = m;
        return {
          id: m.id || "UNKNOWN_ID",
          startTime: !!start_time ? new Date(start_time) : new Date(), // HACK: Fix types to return a partial ZoomMeeting
          endTime: DateTime.fromISO(start_time || "").plus({ minutes: (duration || 60) }).toJSDate(),
          agenda: agenda || "Agenda N/A",
          topic: topic || "Untitled",
          title: topic || "Untitled",
          account: `${accountName}`,
          zoomAccountId: accountName,
          meetingType: m.type || "unknown",
          source: "zoom",
        } as ZoomMeeting;
      })
      .filter((m) => !!m.startTime)
  };

  const meetings = await pMap(licensedUsers, getUserMeetings, { concurrency: 4 });
  //@ts-ignore
  const flattenedMeetings = meetings.flat().sort((a, b) => a.start_date_time - b.start_date_time);
  try {
    redis.set("zoomAllUserMeetings", JSON.stringify(flattenedMeetings), "EX", 60 * 3); // 3 minute cache
  } catch (error) {
    console.error(error);
  }

  return flattenedMeetings;
};
