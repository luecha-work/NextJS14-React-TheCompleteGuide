import { Fragment } from "react";

import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/helpers/auth-utail";
import { Event } from "@/models/event";
import { useRouter } from "next/router";

interface AllEventsPageProps {
  events: Event[];
}

function AllEventsPage(props: AllEventsPageProps) {
  const router = useRouter();
  const events = props.events;

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
