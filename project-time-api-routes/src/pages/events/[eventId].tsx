import Head from "next/head";
import { Fragment } from "react";

import { GetStaticPropsContext } from "next";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import Comments from "../../components/input/comments";
import { getEventById } from "../../helpers/api-util";

interface EventDetailPageProps {
  selectedEvent: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
  } | null;
}

function EventDetailPage(props: EventDetailPageProps) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const eventId = context?.params?.eventId;

  if (!eventId || Array.isArray(eventId)) {
    return {
      props: {
        selectedEvent: null,
      },
    };
  }

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event || null,
    },
    revalidate: 30,
  };
}

export default EventDetailPage;
