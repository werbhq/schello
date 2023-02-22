import { Button, Typography, List } from "@mui/material";
import { Link } from "react-router-dom";
import { CommunityArticle, CommunityVideo } from "../../models/Community";
import { useEffect, useState } from "react";
import { getCommunityArticle, getCommunityVideos } from "../../api/community";
import VideoCard from "../Home/components/VideoCard";
import NewsCard from "../Home/components/NewsCard";
import { Stack } from "@mui/system";

function CommunityPage() {
  const [videos, setVideos] = useState<CommunityVideo[]>([]);
  const [articles, setArticles] = useState<CommunityArticle[]>([]);

  useEffect(() => {
    getCommunityVideos().then(setVideos);
    getCommunityArticle().then(setArticles);
  }, []);

  return (
    <Stack margin={4} spacing={4} alignItems="center" justifyContent="center">
      <Typography variant="h3" color="primary" fontWeight="bold">
        Community Page
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h4">Videos</Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
            maxWidth: "90vw",
            minWidth: "90vw",
          }}
        >
          {videos.map((e, index) => (
            <VideoCard {...e} key={index} />
          ))}
        </List>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h4">Articles</Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
            maxWidth: "90vw",
            minWidth: "90vw",
          }}
        >
          {articles.map((e, index) => (
            <NewsCard {...e} key={index} />
          ))}
        </List>
      </Stack>

      <Button
        color="secondary"
        component={Link}
        to="/community/form"
        variant="contained"
      >
        Share Your Experience here
      </Button>
    </Stack>
  );
}

export default CommunityPage;
