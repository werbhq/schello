import { useEffect } from "react";
import { Grid, Box, Container } from "@mui/material";
import UploadVideoArticleForm from "./components/UploadForm";

function CommunityPage() {
  useEffect(() => {
    // Fetches Data here
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
        style={{
          minHeight: "100vh",
          paddingTop: "10px",
          paddingBottom: "30px",
        }}
      >
        <Grid item xs={12} sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <Container component={"h2"} sx={{ textAlign: "center" }}>
            Community Page
          </Container>
        </Grid>
        <Grid>
          <UploadVideoArticleForm />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CommunityPage;
