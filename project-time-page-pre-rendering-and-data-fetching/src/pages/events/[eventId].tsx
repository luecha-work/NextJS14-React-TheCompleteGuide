import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { getAllEvents, getEventById } from "@/helpers/auth-utail";
import { Event } from "@/models/event";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";

interface EventDetailPageProps {
  selectedEvent: Event;
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
    </Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const eventId = context.params?.eventId;

  if (!eventId || typeof eventId !== "string") {
    return {
      notFound: true,
    };
  }

  const selectedEvent = await getEventById(eventId);

  if (!selectedEvent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      selectedEvent,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
