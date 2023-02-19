import { Grid, Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CommunityArticle, CommunityVideo } from "../../models/Community";
import { useEffect, useState } from "react";
import { getCommunityArticle, getCommunityVideos } from "../../api/community";

function CommunityPage() {
  const [videos, setVideos] = useState<CommunityVideo[]>([]);
  const [articles, setArticles] = useState<CommunityArticle[]>([]);

  useEffect(() => {
    getCommunityVideos().then(setVideos);
    getCommunityArticle().then(setArticles);
  }, []);

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
        <Grid item xs={12} sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <Container component={"h2"} sx={{ textAlign: "center" }}>
            Community Page
          </Container>
        </Grid>
        <Grid>
          <Button
            color="inherit"
            component={Link}
            to="/community/form"
            variant="contained"
          >
            Submit Your Experience here
          </Button>
          {/* TODO: Add articles, videos */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default CommunityPage;
