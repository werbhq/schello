import * as React from "react";
import {
  MenuItem,
  Select,
  Typography,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  TextField,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import Textarea from "@mui/joy/Textarea";
import { PlaceSearch } from "./components/PlaceSearch";

import DialogBox from "../../components/ui/CustomDialogBox";

import type { MapData } from "../../models/MapData";
import { addReport } from "../../api/report";
import { Report } from "../../models/Report";
import { LoadingButton } from "@mui/lab";
import { Link as LinkRouter } from "react-router-dom";

interface FormVars {
  dateIncident: dayjs.Dayjs | null;
  timeFrom: dayjs.Dayjs | null;
  timeTo: dayjs.Dayjs | null;
  category: string | null;
  description: string;
  image: string | null;
  location: MapData | null;
}

const DIALOG_MESSAGES = {
  SUCCESS: {
    title: "Success",
    description: "Your report has been submitted",
  },
  WAIT: {
    title: "Please wait",
    description: "Facial features image is still loading",
  },
  FAILED: {
    title: "Failed",
    description: "Your report has not been submitted",
  },
};

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

  const [enableFaceOption, setEnableFaceOption] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [error, setError] = React.useState<string[]>([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(DIALOG_MESSAGES.SUCCESS);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {
      timeFrom: time_from,
      timeTo: time_to,
      description,
      location,
    } = formVars;

    // Handle Errors
    setError([]);
    const new_errors = [];

    if (time_from?.isAfter(time_to))
      new_errors.push(
        "Incident <from time> cannot be after incident <to time>"
      );

    if (description.split(" ").length < 10)
      new_errors.push("Provide a <description> greater than 10 words");

    if (location == null) new_errors.push("Provide a <rough location>");

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
      setSubmitLoading(true);
      await addReport(parsedFormVars as Report);
      setDialogData(DIALOG_MESSAGES.SUCCESS);
    } catch (error) {
      console.error(error);
      setDialogData(DIALOG_MESSAGES.FAILED);
    }

    setDialogOpen(true);
    setSubmitLoading(false);
  };

  const handleChange = async (e: any) =>
    setFormVars({ ...formVars, [e.target.name]: e.target.value });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Stack margin={4} spacing={4} direction="column">
          <Typography variant="h3">Drug Report</Typography>

          <Typography variant="h6">
            <span style={{ color: "red" }}>We guarantee your privacy</span>. All
            the data you submit is{" "}
            <span style={{ color: "red" }}>encrypted</span> and can only be seen
            by a authorized personnel from Excise Department.
            <br /> You can see the stored reports data in our database{" "}
            <LinkRouter to="/visualize">here</LinkRouter>
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
              name="category"
              onChange={handleChange}
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
              placeholder="Describe what happened. The more details you provide the better we can investigate your report."
              required
              minRows={5}
              maxRows={12}
              name="description"
              onBlur={handleChange}
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

          <LoadingButton
            type="submit"
            loading={submitLoading}
            variant="contained"
            sx={{ width: "8rem", marginTop: "20px" }}
          >
            Submit
          </LoadingButton>
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
