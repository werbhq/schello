import React from "react";
import {
  Grid,
  Box,
  Container,
  Divider,
  Card,
  Icon,
  Button,
  ButtonGroup,
} from "@mui/material";
import {
  LocationOnSharp,
  CalendarTodaySharp,
  Schedule,
} from "@mui/icons-material";

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
        <Box
          sx={{
            backgroundColor: "red",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <Card variant="outlined" sx={{ padding: "10px" }}>
            <Grid container rowGap={"10px"}>
              <Grid xs={12} component={"h4"} sx={{ margin: "0" }}>
                Event Title
              </Grid>
              <Grid
                xs={12}
                component={"p"}
                sx={{ fontSize: "12px", margin: "0" }}
              >
                Event Description
              </Grid>
              <Divider sx={{ width: "100%" }} />
              <Grid container alignItems="center">
                <Grid alignItems="center" justifyContent="center">
                  <Icon>
                    <LocationOnSharp />
                  </Icon>
                </Grid>
                <Grid>
                  <p style={{ fontSize: "12px", margin: "0" }}>Location/Link</p>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid alignItems="center" justifyContent="center">
                  <Icon>
                    <Schedule />
                  </Icon>
                </Grid>
                <Grid>
                  <p style={{ fontSize: "12px", margin: "0" }}>
                    6pm, 12th Feb 22 → 8pm, 13th Feb 22
                  </p>
                </Grid>
              </Grid>
              <ButtonGroup
                size="small"
                disableElevation
                sx={{ colGap: "10px" }}
              >
                <Button variant="contained">Register</Button>
                {/* <div style={{ width: "10px" }}></div> */}
                <Button variant="outlined" startIcon={<CalendarTodaySharp />}>
                  Add to Calendar
                </Button>
              </ButtonGroup>
            </Grid>
          </Card>
          <Card variant="outlined" sx={{ padding: "10px" }}>
            <Grid container rowGap={"10px"}>
              <Grid xs={12} component={"h4"} sx={{ margin: "0" }}>
                Event Title
              </Grid>
              <Grid
                xs={12}
                component={"p"}
                sx={{ fontSize: "12px", margin: "0" }}
              >
                Event Description
              </Grid>
              <Divider sx={{ width: "100%" }} />
              <Grid container alignItems="center">
                <Grid alignItems="center" justifyContent="center">
                  <Icon>
                    <LocationOnSharp />
                  </Icon>
                </Grid>
                <Grid>
                  <p style={{ fontSize: "12px", margin: "0" }}>Location/Link</p>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid alignItems="center" justifyContent="center">
                  <Icon>
                    <Schedule />
                  </Icon>
                </Grid>
                <Grid>
                  <p style={{ fontSize: "12px", margin: "0" }}>
                    6pm, 12th Feb 22 → 8pm, 13th Feb 22
                  </p>
                </Grid>
              </Grid>
              <ButtonGroup
                size="small"
                disableElevation
                sx={{ colGap: "10px" }}
              >
                <Button variant="contained">Register</Button>
                {/* <div style={{ width: "10px" }}></div> */}
                <Button variant="outlined" startIcon={<CalendarTodaySharp />}>
                  Add to Calendar
                </Button>
              </ButtonGroup>
            </Grid>
          </Card>
          <Card variant="outlined" sx={{ padding: "10px" }}>
            <Grid container rowGap={"10px"}>
              <Grid xs={12} component={"h4"} sx={{ margin: "0" }}>
                Event Title
              </Grid>
              <Grid
                xs={12}
                component={"p"}
                sx={{ fontSize: "12px", margin: "0" }}
              >
                Event Description
              </Grid>
              <Divider sx={{ width: "100%" }} />
              <Grid container alignItems="center">
                <Grid alignItems="center" justifyContent="center">
                  <Icon>
                    <LocationOnSharp />
                  </Icon>
                </Grid>
                <Grid>
                  <p style={{ fontSize: "12px", margin: "0" }}>Location/Link</p>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid alignItems="center" justifyContent="center">
                  <Icon>
                    <Schedule />
                  </Icon>
                </Grid>
                <Grid>
                  <p style={{ fontSize: "12px", margin: "0" }}>
                    6pm, 12th Feb 22 → 8pm, 13th Feb 22
                  </p>
                </Grid>
              </Grid>
              <ButtonGroup
                size="small"
                disableElevation
                sx={{ colGap: "10px" }}
              >
                <Button variant="contained">Register</Button>
                {/* <div style={{ width: "10px" }}></div> */}
                <Button variant="outlined" startIcon={<CalendarTodaySharp />}>
                  Add to Calendar
                </Button>
              </ButtonGroup>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default HomePage;
