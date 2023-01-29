import {
  Grid,
  Box,
  Container,
  Divider,
  Card,
  List,
  ListItem,
} from "@mui/material";

import EventCard from "./components/EventCard";
import { Event } from "../../models/General Awarness";
import dayjs from "dayjs";

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
  },
  {
    id: "feiojeifwiowejo",
    title: "Venu Drug Campaign",
    visible: true,
    time_from: dayjs("09:00AM", "HH:mmA").toISOString(),
    time_to: dayjs("12:00PM", "HH:mmA").toISOString(),
    date_from: dayjs("2023-01-23").toISOString(),
    date_to: dayjs("2023-01-23").toISOString(),
    description: "A campaign for venu for drug awareness", // HTML
    mode: "OFFLINE",
    venue: "https://meet.google.com/wqa-eohc-uws", // Venue for offline. Meeting link for online
  },
];

for (let i = 0; i < 50; i++) {
  events.push(events[0]);
  events.push(events[1]);
}

function HomePage() {
  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      <Grid
        item
        xs={12}
        sx={{ paddingTop: "50px !important", paddingBottom: "30px !important" }}
      >
        <Container component={"h2"} sx={{ textAlign: "center" }}>
          Our mission is to catch drug selling people like Mr nithin.... ADD
          MORE
        </Container>
      </Grid>
      <Divider sx={{ width: "100%" }} />

      <Grid item xs={8}>
        <h3>Videos</h3>
        <Box sx={{ backgroundColor: "red", padding: "10px" }}>
          <Card variant="outlined">
            <h3>This is an Event</h3>
          </Card>
        </Box>
        <h3>News</h3>
        <Box sx={{ backgroundColor: "red", padding: "10px" }}>xs=8</Box>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", flexDirection: "column" }}>
        <h3>Events</h3>
        <List style={{ maxHeight: "500px", overflow: "auto", padding: "0px" }}>
          {events.map((e, index) => (
            <ListItem key={index} style={{ padding: "5px 0px" }}>
              <EventCard event={e} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default HomePage;
