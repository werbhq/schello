import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import Textarea from "@mui/joy/Textarea";
import { PlaceSearch } from "./components/PlaceSearch";
import DialogBox from "../../components/ui/CustomDialogBox";

import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import type { MapData } from "../../models/MapData";
import { addReport } from "../../api/report";
import { Report } from "../../models/Report";
interface FormVars {
  dateIncident: dayjs.Dayjs | null;
  timeFrom: dayjs.Dayjs | null;
  timeTo: dayjs.Dayjs | null;
  category: string | null;
  description: string;
  image: string | null;
  location: MapData | null;
}

export default function DrugReportForm(props: any) {
  const currentTime = dayjs();
  const defaultFormVars = {
    dateIncident: currentTime,
    timeFrom: currentTime,
    timeTo: currentTime.add(2, "hour"),
    category: "USAGE_SUSPECTED",
    description: "",
    image: null,
    location: null,
  };

  const [formVars, setFormVars] = React.useState<FormVars>(defaultFormVars);

  const [gender, setGender] = React.useState<"female" | "male">("female");
  const [enableFaceOption, setEnableFaceOption] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);

  const [error, setError] = React.useState<string[]>([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dialog = [
    {
      title: "Success",
      description: "Your report has been submitted",
    },
    {
      title: "Please wait",
      description: "Facial features image is still loading",
    },
    {
      title: "Failed",
      description: "Your report has not been submitted",
    },
  ];

  const [dialogData, setDialogData] = React.useState({
    title: "Success",
    description: "Your report has been submitted",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {
      timeFrom: time_from,
      timeTo: time_to,
      description,
      location,
    } = formVars;

    setError([]);
    const new_errors = [];

    if (imageLoading) {
      setDialogData(dialog[1]);
      setDialogOpen(true);
      return;
    }

    if (time_from?.isAfter(time_to))
      new_errors.push(
        "Incident {from time} cannot be after incident {to time}"
      );

    if (description.split(" ").length < 10)
      new_errors.push("Provide a {description} greater than 10 words");

    if (location == null) new_errors.push("Provide a {rough location}");

    if (new_errors.length > 0) {
      setError(new_errors);
      return;
    }

    const parsedFormVars = {
      ...formVars,
      dateIncident: formVars.dateIncident?.toISOString(),
      timeFrom: formVars.timeFrom?.toISOString(),
      timeTo: formVars.timeTo?.toISOString(),
    };

    try {
      await addReport(parsedFormVars as Report);
      setDialogData(dialog[0]);
      setDialogOpen(true);
    } catch (error) {
      console.error(error);
      setDialogData(dialog[2]);
      setDialogOpen(true);
    }
  };

  window.addEventListener("message", listenFacialAPI);
  document.addEventListener("message", listenFacialAPI);

  function listenFacialAPI(event: any) {
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
      <form onSubmit={handleSubmit}>
        <Stack margin={4} spacing={4} direction="column">
          <Typography>
            The more details you provide the better we can investigate your
            report
          </Typography>

          <Stack spacing={2}>
            <FormLabel>Date Of Incident*</FormLabel>
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
          </Stack>

          <Stack spacing={2}>
            <FormLabel id="incident-time">Incident Time*</FormLabel>
            <Stack spacing={2} direction="row">
              <TimePicker
                label="From"
                value={formVars.timeFrom}
                onChange={(newValue) => {
                  setFormVars({ ...formVars, timeFrom: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 150 }} />
                )}
              />

              <TimePicker
                label="To"
                value={formVars.timeTo}
                onChange={(newValue) => {
                  setFormVars({ ...formVars, timeTo: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 150 }} />
                )}
              />
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <FormLabel id="category-select">Category*</FormLabel>
            <Select
              required
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
          </Stack>

          <Stack spacing={2}>
            <FormLabel>Description*</FormLabel>
            <Textarea
              placeholder="Briefly describe what happened"
              required
              minRows={5}
              maxRows={12}
              onChange={(e) => {
                setFormVars({ ...formVars, description: e.target.value });
              }}
            />
          </Stack>

          <Stack spacing={2}>
            <FormLabel>Rough Location*</FormLabel>
            <PlaceSearch formVars={formVars} setFormVars={setFormVars} />
          </Stack>

          <Stack spacing={2}>
            <FormLabel>Facial Features</FormLabel>
            <Stack spacing={2} paddingLeft={2}>
              <Typography variant="body1">
                This is optional. But helps us identify the person better.
                Select all the information you see fit
              </Typography>
              <FormControl>
                <FormLabel id="face-flag">Have you seen the face?</FormLabel>
                <RadioGroup
                  aria-labelledby="face-flag"
                  value={enableFaceOption}
                  name="face-flag-group"
                  onChange={(e, value) => {
                    if (value === "true") setEnableFaceOption(true);
                    else setEnableFaceOption(false);
                  }}
                >
                  <Stack direction="row">
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </Stack>
                </RadioGroup>
              </FormControl>

              {enableFaceOption === true ? (
                <>
                  <FormControl>
                    <FormLabel id="gender">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="gender"
                      value={gender}
                      name="gender-group"
                      onChange={(e, value) => {
                        setGender(value as "female" | "male");
                      }}
                    >
                      <Stack direction="row">
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  {!formVars.image && (
                    <iframe
                      id="frame"
                      height={600}
                      title="Profile Pic"
                      src={`https://yourappname.readyplayer.me/avatar?clearCache&bodyType=fullbody&gender=${gender}`}
                      onLoad={() => {
                        setFormVars({ ...formVars, image: null });
                      }}
                    ></iframe>
                  )}
                </>
              ) : null}
              {imageLoading && <CircularProgress sx={{ padding: 5 }} />}
              {!imageLoading && formVars.image != null && (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ width: "10rem", height: "2rem", marginTop: "10px" }}
                  onClick={() => {
                    setImageLoading(false);
                    setFormVars({ ...formVars, image: null });
                  }}
                >
                  Reset Face Data
                </Button>
              )}
              {formVars.image && (
                <img
                  src={formVars.image}
                  width={200}
                  height={200}
                  style={{ border: imageLoading ? "" : "3px solid black" }}
                  alt="No Avatar Found"
                  onError={() => {
                    setImageLoading(false);
                  }}
                  onLoad={() => {
                    setImageLoading(false);
                  }}
                ></img>
              )}
            </Stack>
          </Stack>

          {error.length > 0 && (
            <Alert severity="error">
              {error.map((e) => {
                return (
                  <>
                    {e}
                    <br />
                  </>
                );
              })}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "10rem", marginTop: "20px" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
      <DialogBox
        title={dialogData.title}
        description={dialogData.description}
        openFlag={dialogOpen}
        handleOpen={setDialogOpen}
      />
    </LocalizationProvider>
  );
}
