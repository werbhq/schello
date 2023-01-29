import dayjs from "dayjs";
import { Event, GeneralNews } from "../models/General Awarness";

let events: Event[] = [
  {
    id: "feiojeifwiowejo",
    title: "Anti Drug Campaign",
    visible: true,
    time_from: dayjs("09:00AM", "HH:mmA").toISOString(),
    time_to: dayjs("12:00PM", "HH:mmA").toISOString(),
    date_from: dayjs("2023-01-23").toISOString(),
    date_to: dayjs("2023-01-25").toISOString(),
    description: "A campaign for children for drug awareness", // HTML
    mode: "VIRTUAL",
    venue: "https://meet.google.com/wqa-eohc-uws", // Venue for offline. Meeting link for online
    register_url: "https://forms.gle/7B5sYCiT8ouhgbpj6",
  },
  {
    id: "feiojeifwioaso",
    title: "Venu Drug Campaign",
    visible: true,
    time_from: dayjs("09:00AM", "HH:mmA").toISOString(),
    time_to: dayjs("12:00PM", "HH:mmA").toISOString(),
    date_from: dayjs("2023-01-23").toISOString(),
    date_to: dayjs("2023-01-23").toISOString(),
    description: `<p>A <b>paragraph</b> (from <a href="/wiki/Ancient_Greek_language" class="mw-redirect" title="Ancient Greek language">Ancient Greek</a> <i> παράγραφος (parágraphos)</i>&nbsp;'to write beside') is a self-contained unit of discourse in <a href="/wiki/Writing" title="Writing">writing</a> dealing with a particular point or <a href="/wiki/Idea" title="Idea">idea</a>. Though not required by the orthographic conventions of any language with a <a href="/wiki/Writing_system" title="Writing system">writing system</a>, paragraphs are a conventional means of organizing extended segments of <a href="/wiki/Prose" title="Prose">prose</a>.
</p>`, // HTML
    mode: "OFFLINE",
    venue: "https://meet.google.com/wqa-eohc-uws", // Venue for offline. Meeting link for online
  },
];

for (let i = 0; i < 50; i++) {
  events.push(events[0]);
  events.push(events[1]);
}

let news: GeneralNews[] = [];

export { events, news };
