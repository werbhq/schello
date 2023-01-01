import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import Textarea from "@mui/joy/Textarea";
import { PlaceSearch, PlaceData } from "./PlaceSearch";
import {
  Button,
  CircularProgress,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface FormVars {
  dateIncident: dayjs.Dayjs | null;
  time_from: dayjs.Dayjs | null;
  time_to: dayjs.Dayjs | null;
  category: string | null;
  description: string;
  image: string | null;
  location: PlaceData | null;
}

export default function DrugReportForm() {
  const currentTime = dayjs();

  const [formVars, setFormVars] = React.useState<FormVars>({
    dateIncident: currentTime,
    time_from: currentTime,
    time_to: currentTime.add(2, "hour"),
    category: "USAGE_SUSPECTED",
    description: "",
    image: null,
    location: null,
  });

  const [imageLoading, setImageLoading] = React.useState(false);

  window.addEventListener("message", subscribe);
  document.addEventListener("message", subscribe);

  function subscribe(event: any) {
    if (
      typeof event.data === "string" &&
      event?.data?.startsWith("https://models.readyplayer.me")
    ) {
      const id: string = event.data
        .replace("https://models.readyplayer.me/", "")
        .replace(".glb", ".png");

      setImageLoading(true);
      setFormVars({
        ...formVars,
        image: `https://api.readyplayer.me/v1/avatars/${id}`,
      });
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack margin={4} spacing={4} direction="column">
        <FormGroup>
          <InputLabel>Date Of Incident</InputLabel>
          <DatePicker
            views={["year", "month", "day"]}
            value={formVars.dateIncident}
            onChange={(newValue) => {
              setFormVars({ ...formVars, dateIncident: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: 220 }} />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Stack spacing={2}>
            <InputLabel id="incident-time">Incident Time</InputLabel>
            <Stack spacing={2} direction="row">
              <TimePicker
                label="From"
                value={formVars.time_from}
                onChange={(newValue) => {
                  setFormVars({ ...formVars, time_from: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 150 }} />
                )}
              />

              <TimePicker
                label="To"
                value={formVars.time_to}
                onChange={(newValue) => {
                  setFormVars({ ...formVars, time_from: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 150 }} />
                )}
              />
            </Stack>
          </Stack>
        </FormGroup>

        <FormGroup>
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            value={formVars.category}
            label="Category"
            variant="standard"
            sx={{ width: 300 }}
            onChange={(newValue) => {
              setFormVars({ ...formVars, category: newValue.target.value });
            }}
          >
            <MenuItem value={"USAGE_SUSPECTED"}>
              Suspected Usage of drugs
            </MenuItem>
            <MenuItem value={"USAGE_CONFIRMED"}>
              Confirmed Usage of drugs
            </MenuItem>
            <MenuItem value={"TRADING_SUSPECTED"}>
              Suspected Trading of drugs
            </MenuItem>
            <MenuItem value={"TRADING_CONFIRMED"}>
              Confirmed Trading of drugs
            </MenuItem>
          </Select>
        </FormGroup>

        <FormGroup>
          <InputLabel>Description</InputLabel>
          <Textarea
            placeholder="Briefly describe what happened"
            required
            minRows={5}
            maxRows={12}
            onChange={(e) => {
              setFormVars({ ...formVars, description: e.target.value });
            }}
          />
        </FormGroup>

        <FormGroup>
          <InputLabel>Rough Location</InputLabel>
          <PlaceSearch formVars={formVars} setFormVars={setFormVars} />
        </FormGroup>

        <FormGroup>
          <InputLabel>Facial Features</InputLabel>
          <Typography variant="body2">
            Select all the information you see fit
          </Typography>
          {!formVars.image && (
            <iframe
              id="frame"
              height={600}
              title="Profile Pic"
              src="https://yourappname.readyplayer.me/avatar?clearCache&bodyType=fullbody"
              onLoad={() => {
                setFormVars({ ...formVars, image: null });
              }}
            ></iframe>
          )}

          <Stack direction="row" spacing={2} alignItems="center">
            {imageLoading && <CircularProgress sx={{ padding: 5 }} />}
            {formVars.image && (
              <img
                src={formVars.image}
                width={200}
                height={200}
                alt="No Avatar Found"
                onLoad={() => setImageLoading(false)}
              ></img>
            )}
            {!imageLoading && formVars.image != null && (
              <Button
                variant="contained"
                sx={{ width: "10rem", height: "2rem", marginTop: "10px" }}
                onClick={() => {
                  setImageLoading(false);
                  setFormVars({ ...formVars, image: null });
                }}
              >
                Reset
              </Button>
            )}
          </Stack>
        </FormGroup>
        <Button
          variant="contained"
          sx={{ width: "10rem", marginTop: "20px" }}
          onClick={() => {
            console.log(formVars);
          }}
        >
          Submit
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}
