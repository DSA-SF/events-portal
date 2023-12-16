'use client'
import UIPage from "../../components/ui/page";
import { useUser } from '@auth0/nextjs-auth0/client';
import ActionNetworkSection, { makeRequest } from '../../utils/action-network/actionnetwork';
import { ActionNetwork, OsdiEvent } from '../../utils/action-network/actionNetworkInterface';
import CollapsibleSection from '../../components/ui/CollapsibleSection';

interface Eventprops {
  actionNetworkEvents: OsdiEvent[];
}

export default function Page() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  makeRequest<ActionNetwork>(`https://actionnetwork.org/api/v2/events?filter=local&per_page=100`)
  return (
    <UIPage>
      <h1>Event</h1> 
      <div>{user && <span>Signed in as {user?.email}</span>}</div>
    </UIPage>
  );
}