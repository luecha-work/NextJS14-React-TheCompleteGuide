import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/auth-utail";
import { Event } from "@/models/event";
import Head from "next/head";

interface HomePageProps {
  event: Event[];
}

function HomePage(props: HomePageProps) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventList items={props.event} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      event: featuredEvents,
    },
    revalidate: 10,
  };
}

export default HomePage;
