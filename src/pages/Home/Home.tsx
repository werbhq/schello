import { useState, useEffect } from "react";
import { Grid, Container, Divider, List, ListItem } from "@mui/material";
import EventCard from "./components/EventCard";
import { getEvents } from "../../api/events";
import VideoCard from "./components/VideoCard";
import NewsCard from "./components/NewsCard";
import { getGeneralNews, getGeneralVideos } from "../../api/general";
import {
  Event,
  GeneralNews,
  GeneralVideo,
} from "../../models/General Awarness";
import NoDataCard from "./components/NoDataCard";

function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [videos, setVideos] = useState<GeneralVideo[]>([]);
  const [news, setNews] = useState<GeneralNews[]>([]);

  useEffect(() => {
    getEvents().then(setEvents);
    getGeneralVideos().then(setVideos);
    getGeneralNews().then(setNews);
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      <Grid
        item
        xs={12}
        sx={{ paddingTop: "50px !important", paddingBottom: "30px !important" }}
      >
        <Container component={"h2"} sx={{ textAlign: "center" }}>
          Schello is a school monitoring system to track down and reduce
          substance abuse
        </Container>
      </Grid>
      <Divider sx={{ width: "100%" }} />

      <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
        <h3>Videos</h3>
        <List
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 0,
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          {videos.map((e, index) => (
            <VideoCard {...e} key={index} />
          ))}
          {videos.length === 0 && <NoDataCard resource="videos" />}
        </List>

        <h3>News</h3>
        <List
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 0,
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          {news.map((e, index) => (
            <NewsCard {...e} key={index} />
          ))}
          {news.length === 0 && <NoDataCard resource="news" />}
        </List>
      </Grid>

      <Grid item xs={4} sx={{ display: "flex", flexDirection: "column" }}>
        <h3>Events</h3>
        <List style={{ maxHeight: "350px", overflow: "auto", padding: "0px" }}>
          {events.map((e, index) => (
            <ListItem key={index} style={{ padding: "5px 0px" }}>
              <EventCard event={e} key={index} />
            </ListItem>
          ))}
          {events.length === 0 && <NoDataCard resource="events" />}
        </List>
      </Grid>
    </Grid>
  );
}

export default HomePage;
