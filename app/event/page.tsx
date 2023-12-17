'use server'
import UIPage from "../../components/ui/page";
import makeRequest from "../../utils/action-network/actionnetwork";

export default async function EventPage() {
  const response = await makeRequest('781268a3-9403-4b61-b0c1-63587f28fec5');

  return (
    <UIPage>
      <img src={response.featured_image_url} alt=''/>
      <h1>Event: {response.title} </h1>
      <div>
      </div>
      <div>
        <ul role="list" className="divide-y divide-gray-100">
          <li>
            {response.description.replace(/<[^>]*>?/gm, '')}
          </li>
          <li>
            <div>
              Location: {response.location.venue}
            </div>
            {response.location.address_lines}, {response.location.locality} {response.location.region}
            <br />
            {response.location.postal_code}, {response.location.country}
          </li>
          <li>
            {response.start_date}
          </li>
          <li>
            {response.end_date}
          </li>
          <li>
            <p>Hosted by: {response['action_network:sponsor'].title} </p>
          </li>
          <li>

          </li>
        </ul>
      </div>
    </UIPage>
  );
}