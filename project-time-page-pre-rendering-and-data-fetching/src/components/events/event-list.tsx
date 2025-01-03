import { Event } from "@/models/event";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

interface EventListProps {
  items: Event[];
}

function EventList(props: EventListProps) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
