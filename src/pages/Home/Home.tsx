import { useState, useEffect } from "react";
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

import { events as eventsData } from "../tempData";

function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetches Data here
    setEvents(eventsData);
  }, []);

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
        <List style={{ maxHeight: "350px", overflow: "auto", padding: "0px" }}>
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
