import Textarea from "@mui/joy/Textarea";
import {
  Alert,
  Autocomplete,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import FeatureSelector from "./components/FeatureSelector";
import * as React from "react";
import DialogBox from "../../components/ui/CustomDialogBox";
import { PlaceSearch } from "./components/PlaceSearch";
import FeatureButton from "./components/FeatureButton";
import { LoadingButton } from "@mui/lab";
import { Link as LinkRouter } from "react-router-dom";
import { addReport } from "../../api/report";
import { MapData } from "../../models/MapData";
import { Report } from "../../models/Report";
import straight from "./public/Straight.png";
import wavy from "./public/Wavy.png";
import curly from "./public/Curly.png";
import kinky from "./public/Kinky.png";
import brown from "./public/brown.png";
import fair from "./public/fair.png";
import darkbrown from "./public/dark-brown.png";
import olive from "./public/olive.png";
import lightbrown from "./public/light-brown.png";

import student_data from "../../constant/student_data.json";

const studentData: { [index: string]: { id: string } } = student_data;

type FormVars = Omit<
  Report,
  "dateIncident" | "timeFrom" | "timeTo" | "location"
> & {
  dateIncident: dayjs.Dayjs;
  timeFrom: dayjs.Dayjs;
  timeTo: dayjs.Dayjs;
  location: MapData | null;
};

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

  const defaultFormVars: FormVars = {
    dateIncident: currentTime,
    timeFrom: currentTime,
    timeTo: currentTime.add(2, "hour"),
    category: "USAGE_SUSPECTED",
    description: "",
    location: null,
    studentId: null,
    status: "NEW",
  };

  const [formVars, setFormVars] = React.useState<FormVars>(defaultFormVars);

  const [enableFaceOption, setEnableFaceOption] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [error, setError] = React.useState<string[]>([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(DIALOG_MESSAGES.SUCCESS);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formVars);
    // Handle Errors
    setError([]);
    const new_errors = [];

    if (formVars.timeFrom?.isAfter(formVars.timeTo))
      new_errors.push(
        "Incident <from time> cannot be after incident <to time>"
      );

    if (formVars.description.split(" ").length < 5)
      new_errors.push("Provide a <description> greater than 5 words");

    if (formVars.location == null)
      new_errors.push("Provide a <rough location>");

    if (
      (formVars.category === "USAGE_SUSPECTED" ||
        formVars.category === "USAGE_CONFIRMED") &&
      formVars.studentId === null
    ) {
      new_errors.push("Provide a <Student Name>");
    }

    if (new_errors.length > 0) {
      setError(new_errors);
      return;
    }

    const parsedFormVars: Report = {
      ...formVars,
      dateIncident: formVars.dateIncident.toISOString(),
      timeFrom: formVars.timeFrom.toISOString(),
      timeTo: formVars.timeTo.toISOString(),
      location: formVars.location as Report["location"],
    };

    try {
      setSubmitLoading(true);
      await addReport(parsedFormVars);
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
  const hairimages = [
    { image: straight, label: "Straight" },
    { image: wavy, label: "Wavy" },
    { image: curly, label: "Curly" },
    { image: kinky, label: "Kinky" },
    //{ image: "../public/Wavy.png", label: "Wavy" },
  ];
  const skinimages = [
    { image: fair, label: "Fair" },
    { image: lightbrown, label: "Light-Brown" },
    { image: olive, label: "Olive" },
    { image: brown, label: "Brown" },
    { image: darkbrown, label: "Dark-Brown" },
    //{ image: "../public/Wavy.png", label: "Wavy" },
  ];
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
                setFormVars({
                  ...formVars,
                  dateIncident: newValue as dayjs.Dayjs,
                });
              }}
              inputFormat="DD/MM/YYYY"
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
                  setFormVars({
                    ...formVars,
                    timeFrom: newValue as dayjs.Dayjs,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 150 }} />
                )}
              />

              <TimePicker
                label="To"
                value={formVars.timeTo}
                onChange={(newValue) => {
                  setFormVars({ ...formVars, timeTo: newValue as dayjs.Dayjs });
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

          {["USAGE_SUSPECTED", "USAGE_CONFIRMED"].includes(
            formVars.category
          ) && (
            <Stack spacing={2}>
              <FormLabel id="student-select">Student Name*</FormLabel>
              <Autocomplete
                disableClearable
                options={Object.keys(studentData)}
                onChange={(e, value) => {
                  setFormVars({
                    ...formVars,
                    studentId: studentData[value].id,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Stack>
          )}
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
            <FormLabel>Location*</FormLabel>
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
              <Collapse in={enableFaceOption}>
                <FormLabel>Gender</FormLabel>
                <Stack direction="row">
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Female"
                  />
                </Stack>
                <FormLabel>Hair type</FormLabel>
                <FeatureSelector data={hairimages} />
                <FormLabel sx={{ margin: "20px 10px 20px 0px" }}>
                  Skin color
                </FormLabel>
                <FeatureSelector data={skinimages} />
              </Collapse>
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
            sx={{ width: "8rem", marginTop: "80px" }}
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
