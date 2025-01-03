import { Event } from "@/models/event";

interface DateFilter {
  year: number;
  month: number;
}

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(
    "https://nextjs-course-f1fec-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events: Event[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string): Promise<Event | null> {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id) || null;
}

export async function getFilteredEvents(
  dateFilter: DateFilter
): Promise<Event[]> {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
