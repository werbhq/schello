import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import Textarea from "@mui/joy/Textarea";
import {
  CircularProgress,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface FormVars {
  dateIncident: dayjs.Dayjs | null;
  time_from: dayjs.Dayjs | null;
  time_to: dayjs.Dayjs | null;
  category: string | null;
  description: string;
  image: string | null;
}

export default function NativePickers() {
  const currentTime = dayjs();

  const [formVars, setFormVars] = React.useState<FormVars>({
    dateIncident: currentTime,
    time_from: currentTime,
    time_to: currentTime.add(2, "hour"),
    category: "USAGE_SUSPECTED",
    description: "",
    image: null,
  });

  const [imageLoad, setImageLoad] = React.useState(false);

  const frameRef = React.useRef<HTMLIFrameElement>(null);

  window.addEventListener("message", subscribe);
  document.addEventListener("message", subscribe);

  function subscribe(event: any) {
    const frame = frameRef.current as HTMLIFrameElement;
    if (
      typeof event.data === "string" &&
      event?.data?.startsWith("https://models.readyplayer.me")
    ) {
      const id: string = event.data
        .replace("https://models.readyplayer.me/", "")
        .replace(".glb", ".png");
      frame.style.display = "none";
      setImageLoad(true);
      setFormVars({
        ...formVars,
        image: `https://api.readyplayer.me/v1/avatars/${id}`,
      });
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack padding={20} spacing={3} direction="column">
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
          <InputLabel id="facial-feat">Facial Features</InputLabel>
          <iframe
            id="frame"
            ref={frameRef}
            height={600}
            title="Profile Pic"
            src="https://yourappname.readyplayer.me/avatar?clearCache&bodyType=fullbody"
            onLoad={() => {
              setFormVars({ ...formVars, image: null });
            }}
          ></iframe>

          {imageLoad && <CircularProgress sx={{ padding: 5 }} />}
          {formVars.image != null ? (
            <img
              src={formVars.image}
              width={200}
              height={200}
              alt="No Avatar Found"
              onLoad={() => setImageLoad(false)}
            ></img>
          ) : (
            <></>
          )}
        </FormGroup>
      </Stack>
    </LocalizationProvider>
  );
}
