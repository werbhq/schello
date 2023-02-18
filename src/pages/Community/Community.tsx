import { Grid, Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

function CommunityPage() {
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
