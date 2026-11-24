import { links } from "./links";
import { photos, type Photo } from "./photos";

export const eventCategories = [
  "All events",
  "Learning",
  "Leadership",
  "Community",
] as const;
export type EventFilter = (typeof eventCategories)[number];
export interface ProgrammeEvent {
  id: string;
  title: string;
  category:
    "Professional Learning" | "Classroom Practice" | "Leadership" | "Community";
  filter: Exclude<EventFilter, "All events">;
  description: string;
  date: string;
  venue: string;
  href: string;
  photo: Photo;
  illustrative: true;
}

// Illustrative Figma examples. Replace with confirmed events before announcing
// a programme. No date or venue has been supplied.
export const events: readonly ProgrammeEvent[] = [
  {
    id: "journey-to-excellence",
    title: "Journey to Excellence",
    category: "Professional Learning",
    filter: "Learning",
    description:
      "A shared space to exchange ideas, learn from colleagues and bring fresh perspectives back to your classroom.",
    photo: photos[4],
  },
  {
    id: "leading-learning",
    title: "Leading learning, together",
    category: "Leadership",
    filter: "Leadership",
    description:
      "Make room for reflection, honest conversations and stronger connections with the people who lead learning.",
    photo: photos[5],
  },
  {
    id: "every-learner-belongs",
    title: "Every learner belongs",
    category: "Classroom Practice",
    filter: "Learning",
    description:
      "Explore practical approaches to building welcoming classrooms where every learner can participate and thrive.",
    photo: photos[2],
  },
  {
    id: "good-ideas-shared",
    title: "Good ideas, shared",
    category: "Community",
    filter: "Community",
    description:
      "Connect across schools, share what is working and turn a conversation with a colleague into your next step.",
    photo: photos[1],
  },
].map((event) => ({
  ...event,
  category: event.category as ProgrammeEvent["category"],
  filter: event.filter as ProgrammeEvent["filter"],
  date: "To be announced",
  venue: "Venue to be announced",
  href: links.login,
  illustrative: true,
}));
