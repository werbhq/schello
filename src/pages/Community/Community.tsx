import {
  Grid,
  Box,
  Button,
  Typography,
  CardMedia,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CommunityArticle, CommunityVideo } from "../../models/Community";
import { useEffect, useState } from "react";
import { getCommunityArticle, getCommunityVideos } from "../../api/community";
import VideoCard from "../Home/components/VideoCard";
import NewsCard from "../Home/components/NewsCard";

function CommunityPage() {
  const [videos, setVideos] = useState<CommunityVideo[]>([]);
  const [articles, setArticles] = useState<CommunityArticle[]>([]);

  useEffect(() => {
    getCommunityVideos().then(setVideos);
    getCommunityArticle().then(setArticles);
  }, []);

  console.log({ videos, articles });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Box
          component="img"
          sx={{
            height: "40vh",
            width: "60vh",
            maxHeight: { xs: "20vh", md: "40vh" },
            maxWidth: { xs: "40vh", md: "60vh" },
            borderRadius: "10px",
            margin: "3vh",
          }}
          alt="Community"
          src={require("./Public/Community.jpg")}
        />

        <Grid>
          <Button
            color="success"
            component={Link}
            to="/community/form"
            variant="contained"
          >
            Submit Your Experience here
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ fontFamily: "Poppins", margin: "5vh 20vh 10vh" }}>
        <Typography variant="h4" align="center" margin="0px 0px 40px">
          Community Videos
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
            margin: "15px",
          }}
        >
          {videos.map((e, index) => (
            <VideoCard {...e} key={index} />
          ))}
        </Box>
      </Grid>
      <Grid sx={{ fontFamily: "Poppins", margin: "20vh 20vh 10vh" }}>
        <Typography variant="h4" align="center" margin="0px 0px 40px">
          Community Articles
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflow: "auto",
            margin: "15px",
          }}
        >
          {articles.map((e, index) => (
            <NewsCard {...e} key={index} />
          ))}
        </Box>
      </Grid>
    </Box>
  );
}

export default CommunityPage;
