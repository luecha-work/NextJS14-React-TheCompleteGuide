import EventList from "@/components/events/event-list";
import Layout from "@/components/layout/layout";
import { getFeaturedEvents } from "@/helpers/auth-utail";
import { Event } from "@/models/event";

interface HomePageProps {
  event: Event[];
}

function HomePage(props: HomePageProps) {
  // return (
  //   <div>
  //     <EventList items={props.event} />
  //   </div>
  // );

  return (
    <Layout>
      <EventList items={props.event} />
    </Layout>
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
