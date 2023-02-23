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
  TextareaAutosize,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import FeatureSelector from "./components/FeatureSelector";
import DialogBox from "../../components/ui/CustomDialogBox";
import { PlaceSearch } from "./components/PlaceSearch";
import { LoadingButton } from "@mui/lab";
import { Link as LinkRouter } from "react-router-dom";
import { addReport } from "../../api/report";
import { MapData } from "../../models/MapData";
import { FacialData, Report } from "../../models/Report";
import straight from "./assets/Straight.png";
import wavy from "./assets/Wavy.png";
import curly from "./assets/Curly.png";
import kinky from "./assets/Kinky.png";
import brown from "./assets/brown.png";
import fair from "./assets/fair.png";
import darkBrown from "./assets/dark-brown.png";
import olive from "./assets/olive.png";
import lightBrown from "./assets/light-brown.png";
import black from "./assets/Black.png";
import blue from "./assets/Blue.png";
import green from "./assets/Green.png";
import silver from "./assets/Silver.png";
import browneye from "./assets/Browneye.png";
import diamond from "./assets/Diamond.png";
import oval from "./assets/Oval.png";
import invtriangle from "./assets/Invertedtriangle.png";
import square from "./assets/Square.png";
import round from "./assets/Round.png";
import triangle from "./assets/Triangle.png";
import student_data from "../../constant/student_data.json";
import { useState } from "react";
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

const hairImages: {
  image: string;
  label: string;
  value: FacialData["hairType"];
}[] = [
  { image: straight, label: "Straight", value: "STRAIGHT" },
  { image: wavy, label: "Wavy", value: "WAVY" },
  { image: curly, label: "Curly", value: "CURLY" },
  { image: kinky, label: "Kinky", value: "KINKY" },
];

const skinImages: {
  image: string;
  label: string;
  value: FacialData["skinColor"];
}[] = [
  { image: fair, label: "Fair", value: "FAIR" },
  { image: olive, label: "Olive", value: "OLIVE" },
  { image: lightBrown, label: "Light-Brown", value: "LIGHT-BROWN" },
  { image: brown, label: "Brown", value: "BROWN" },
  { image: darkBrown, label: "Dark-Brown", value: "DARK-BROWN" },
];

const eyecolorImages: {
  image: string;
  label: string;
  value: FacialData["eyeColor"];
}[] = [
  { image: black, label: "Black", value: "BLACK" },
  { image: blue, label: "Blue", value: "BLUE" },
  { image: green, label: "Green", value: "GREEN" },
  { image: silver, label: "Silver", value: "SILVER" },
  { image: browneye, label: "BROWN", value: "BROWNEYE" },
];
const faceImages: {
  image: string;
  label: string;
  value: FacialData["faceShape"];
}[] = [
  { image: diamond, label: "Diamond", value: "DIAMOND" },
  { image: oval, label: "Oval", value: "OVAL" },
  {
    image: invtriangle,
    label: "Inverted Triangle",
    value: "INVERTED_TRIANGLE",
  },
  { image: round, label: "Round", value: "ROUND" },
  { image: triangle, label: "Triangle", value: "TRIANGLE" },
  { image: square, label: "Square", value: "SQUARE" },
];

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

  const [enableFaceOption, setEnableFaceOption] = useState(false);
  const [enableStudentOption, setEnableStudentOption] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState<string[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(DIALOG_MESSAGES.SUCCESS);

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

    if (enableStudentOption && formVars.studentId === null) {
      new_errors.push("Provide a <Student Name>");
    }

    if (enableFaceOption && formVars.facialData === null) {
      new_errors.push("Provide <Facial Data>");
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
      facialData: enableFaceOption ? formVars.facialData : null,
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Stack margin={4} spacing={4} direction="column">
          <Stack alignItems="center">
            <Typography variant="h3" color="primary" fontWeight="bold">
              Drug Report
            </Typography>
          </Stack>
          <Typography variant="h6">
            <span style={{ color: "red" }}>We guarantee your privacy</span>. All
            the data you submit is{" "}
            <span style={{ color: "red" }}>encrypted</span> and can only be seen
            by a authorized personnel from Excise Department.
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
              <FormLabel id="student-flag">Is the person a student?</FormLabel>
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
                      const currentVal = value === "true";
                      setEnableFaceOption(currentVal);
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
                  <Stack spacing={2}>
                    <Stack>
                      <FormLabel id="gender">Gender</FormLabel>
                      <RadioGroup
                        name="gender-group"
                        aria-labelledby="gender"
                        value={facialData.gender}
                        onChange={(e, value) =>
                          setFacialData({
                            ...facialData,
                            gender: value as FacialData["gender"],
                          })
                        }
                      >
                        <Stack direction="row">
                          <FormControlLabel
                            value="MALE"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="FEMALE"
                            control={<Radio />}
                            label="Female"
                          />
                        </Stack>
                      </RadioGroup>
                    </Stack>

                    <FeatureSelector
                      data={hairImages}
                      label="Hair Type"
                      id="hairType"
                      value={facialData}
                      setValue={setFacialData}
                    />

                    <FeatureSelector
                      data={skinImages}
                      label="Skin Color"
                      id="skinColor"
                      value={facialData}
                      setValue={setFacialData}
                      imageProps={{ width: "120px", height: "120px" }}
                    />

                    <FeatureSelector
                      data={eyecolorImages}
                      label="Eye Color"
                      id="eyeColor"
                      value={facialData}
                      setValue={setFacialData}
                      imageProps={{ width: "124px", height: "100px" }}
                    />
                    <FeatureSelector
                      data={faceImages}
                      label="Face Shape"
                      id="faceShape"
                      value={facialData}
                      setValue={setFacialData}
                      imageProps={{ width: "100px", height: "100px" }}
                    />
                  </Stack>
                </Collapse>
              </Stack>
            </Stack>
          )}

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
