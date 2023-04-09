import {
  Alert,
  Autocomplete,
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
  TextareaAutosize,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import DialogBox from "components/ui/CustomDialogBox";
import { PlaceSearch } from "./components/PlaceSearch";
import { LoadingButton } from "@mui/lab";
import { Link as LinkRouter } from "react-router-dom";
import { addReport } from "api/report";
import { MapData } from "types/MapData";
import { FacialData, Report } from "types/Report";
import student_data from "constant/student_data.json";
import { FacialField } from "./components/FacialField";

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
  SPAM: {
    title: "SPAM DETECTED",
    description: "Your report has not been submitted due to suspected spamming",
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
    facialData: null,
    wantedPersonId: null,
  };

  const defaultFacialVars: FacialData = {
    hairType: "CURLY",
    skinColor: "FAIR",
    gender: "MALE",
    eyeColor: "BLACK",
    faceShape: "DIAMOND",
  };

  const [formVars, setFormVars] = useState(defaultFormVars);
  const [facialData, setFacialData] = useState(defaultFacialVars);
  const [wantedPersonId, setWantedPersonId] =
    useState<Report["wantedPersonId"]>(null);

  const [enableFaceOption, setEnableFaceOption] = useState(false);
  const [enableWantedOption, setEnableWantedOption] = useState(true);
  const [enableStudentOption, setEnableStudentOption] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState<string[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(DIALOG_MESSAGES.SUCCESS);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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

    if (enableStudentOption && formVars.studentId === null) {
      new_errors.push("Provide a <Student Name>");
    }

    if (enableFaceOption && !enableWantedOption && facialData === null) {
      new_errors.push("Provide <Facial Data>");
    }

    if (enableFaceOption && enableWantedOption && wantedPersonId === null) {
      new_errors.push("Select a person from wanted list");
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
      studentId: enableStudentOption ? formVars.studentId : null,
      facialData: enableFaceOption && !enableWantedOption ? facialData : null,
      wantedPersonId:
        enableFaceOption && enableWantedOption ? wantedPersonId : null,
    };

    try {
      setSubmitLoading(true);
      await addReport(parsedFormVars);
      setDialogData(DIALOG_MESSAGES.SUCCESS);
    } catch (error: any) {
      console.error(error);
      if (error?.message === "SPAM") {
        setDialogData(DIALOG_MESSAGES.SPAM);
      } else {
        setDialogData(DIALOG_MESSAGES.FAILED);
      }
    }

    setDialogOpen(true);
    setSubmitLoading(false);
  };

  const handleChange = async (e: any) =>
    setFormVars({ ...formVars, [e.target.name]: e.target.value });

  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit}>
          <Stack margin={3} spacing={4} direction="column">
            <Stack alignItems="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                Drug Report
              </Typography>
            </Stack>
            <Typography variant="h6">
              <span style={{ color: "red" }}>We guarantee your privacy</span>.
              All the data you submit is{" "}
              <span style={{ color: "red" }}>encrypted</span> and can only be
              seen by a authorized personnel from Excise Department.
              <br /> You can see the stored reports data in our database{" "}
              <LinkRouter to="/visualize" color="primary">
                here
              </LinkRouter>
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
                    setFormVars({
                      ...formVars,
                      timeTo: newValue as dayjs.Dayjs,
                    });
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
              <TextareaAutosize
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
              <FormControl>
                <FormLabel id="student-flag">
                  Is the person a student?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="student-flag"
                  value={enableStudentOption}
                  name="student-flag-group"
                  onChange={(e, value) => {
                    const currentVal = value === "true";
                    setEnableStudentOption(currentVal);
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

            {enableStudentOption ? (
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
            ) : (
              <FacialField
                enableFacialFeatures={enableFaceOption}
                setEnableFacialFeatures={setEnableFaceOption}
                enableWantedList={enableWantedOption}
                setEnableWantedList={setEnableWantedOption}
                facialData={facialData}
                setFacialData={setFacialData}
                wantedPersonId={wantedPersonId}
                setWantedPersonId={setWantedPersonId}
              />
            )}

            {error.length > 0 && (
              <Alert severity="error">
                {error.map((e, index) => {
                  return (
                    <div key={index}>
                      {e}
                      <br />
                    </div>
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
    </Grid>
  );
}
