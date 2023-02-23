import { useState, useEffect } from "react";
import {
  Grid,
  Divider,
  List,
  ListItem,
  Typography,
  Stack,
} from "@mui/material";
import EventCard from "./components/EventCard";
import { getEvents } from "../../api/events";
import VideoCard from "./components/VideoCard";
import NewsCard from "./components/NewsCard";
import {
  Event,
  GeneralVideo,
  GeneralNews,
} from "../../models/General Awarness";
import NoDataCard from "./components/NoDataCard";
import { getGeneralNews, getGeneralVideos } from "../../api/general";

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
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{ paddingTop: "50px !important", paddingBottom: "30px !important" }}
      >
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <Typography variant="h3" color="primary" fontWeight="bold">
            Schello
          </Typography>
          <Typography>
            A school monitoring system to track down and reduce substance abuse
          </Typography>
        </Stack>
      </Grid>
      <Divider sx={{ width: "100%" }} />

      <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
        <Stack spacing={2} margin={2}>
          <Typography variant="h6">Videos</Typography>
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
        </Stack>

        <Stack spacing={2} margin={2}>
          <Typography variant="h6">News</Typography>
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
        </Stack>
      </Grid>

      <Grid item xs={4} sx={{ display: "flex", flexDirection: "column" }}>
        <Stack spacing={2} margin={2}>
          <Typography variant="h6">Events</Typography>
          <List
            style={{ overflow: "auto", padding: "0px", maxHeight: "350px" }}
          >
            {events.map((e, index) => (
              <ListItem key={index} style={{ padding: "5px 0px" }}>
                <EventCard event={e} key={index} />
              </ListItem>
            ))}
            {events.length === 0 && <NoDataCard resource="events" />}
          </List>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default HomePage;
