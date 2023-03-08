import {
  Grid,
  Divider,
  Card,
  Icon,
  Button,
  Stack,
  Collapse,
} from "@mui/material";
import { LocationOnSharp, Schedule } from "@mui/icons-material";
import stringToHtml from "html-react-parser";
import type { Event } from "types/General Awarness";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import dayjs from "dayjs";
import { useState } from "react";
import Expand from "components/ui/Expand";

function EventCard({ event, ...rest }: { event: Event }) {
  const displayTime = {
    startDate: dayjs(event.date_from).format("D MMM YYYY"),
    endDate: dayjs(event.date_to).format("D MMM YYYY"),
    startTime: dayjs(event.time_from).format("hh:mm A"),
    endTime: dayjs(event.time_to).format("hh:mm A"),
  };

  const displayTimeDateString =
    displayTime.startDate !== displayTime.endDate
      ? `${displayTime.startTime}, ${displayTime.startDate} → ${displayTime.endTime}, ${displayTime.endDate}`
      : `${displayTime.startDate}, ${displayTime.startTime} → ${displayTime.endTime}`;

  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(!expanded);

  return (
    <Card
      variant="outlined"
      sx={{ padding: "10px", maxWidth: "90%", minWidth: "90%" }}
      onClick={handleExpand}
      {...rest}
    >
      <Grid container rowGap={"2px"}>
        <Grid container justifyContent="space-between">
          <Grid component={"h5"} sx={{ margin: "0" }}>
            {event.title}
          </Grid>

          <Grid component={"h5"} sx={{ margin: "0", color: "grey" }}>
            {event.mode}
          </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Schedule />
            <p style={{ fontSize: "0.8em", margin: "0", padding: "0px 5px" }}>
              {displayTimeDateString}
            </p>
          </Stack>

          <Expand expanded={expanded} handleExpand={handleExpand} />
        </Grid>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid container rowGap={"10px"}>
            <Divider sx={{ width: "100%" }} />

            <Grid
              item
              xs={12}
              component={"p"}
              sx={{ fontSize: "12px", margin: "0" }}
            >
              {stringToHtml(event.description)}
            </Grid>

            <Grid container alignItems="center">
              <Grid alignItems="center" justifyContent="center">
                <Icon>
                  <LocationOnSharp />
                </Icon>
              </Grid>
              <Grid>
                <a style={{ fontSize: "12px", margin: "0" }} href={event.venue}>
                  {event.venue}
                </a>
              </Grid>
            </Grid>

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!!event.register_url && (
                <Button
                  variant="contained"
                  href={event.register_url}
                  sx={{ maxHeight: "40px" }}
                >
                  Register
                </Button>
              )}
              <Stack spacing={0.5} direction="row">
                {["Google", "Apple"].map((e, index) => (
                  <AddToCalendarButton
                    key={index}
                    name={event.title}
                    description={event.description}
                    startDate={dayjs(event.date_from).format("YYYY-MM-DD")}
                    endDate={dayjs(event.date_to).format("YYYY-MM-DD")}
                    startTime={dayjs(event.time_from).format("HH:mm")}
                    endTime={dayjs(event.time_to).format("HH:mm")}
                    timeZone="currentBrowser"
                    location={event.venue}
                    options={e}
                    size="3"
                    hideBackground
                    hideCheckmark
                    hideBranding
                    hideTextLabelButton
                    buttonStyle="neumorphism"
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Card>
  );
}

export default EventCard;
