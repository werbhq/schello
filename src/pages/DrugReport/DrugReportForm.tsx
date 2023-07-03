import {
    Alert,
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
    CardMedia,
    Grid,
    FormControl,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import DialogBox from 'components/ui/CustomDialogBox';
import { PlaceSearch } from './components/PlaceSearch';
import { LoadingButton } from '@mui/lab';
import { Link as LinkRouter } from 'react-router-dom';
import { addReport } from 'api/report';
import { MapDataInput } from 'types/MapData';
import { FacialData, InputReport } from 'types/Report';
import { FacialField } from './components/FacialField';
import ReportVideo from 'assets/video/visualization.mp4';
import useCheckMobileScreen from 'hooks/useMobile';
import { useSchoolDetailsData } from 'hooks/useSchoolDetails';
import PageLoader from 'components/ui/PageLoader';
import Error from 'pages/Error/Error';
import Page from 'components/ui/Page';
import { SDSColoursSemantic } from 'components/ui/Colours';

type FormVars = Omit<InputReport, 'dateIncident' | 'timeFrom' | 'timeTo' | 'location' | 'ip'> & {
    dateIncident: dayjs.Dayjs;
    timeFrom: dayjs.Dayjs;
    timeTo: dayjs.Dayjs;
    location: MapDataInput | null;
};

const DIALOG_MESSAGES = {
    SUCCESS: {
        title: 'Success',
        description: 'Your report has been submitted',
    },
    WAIT: {
        title: 'Please wait',
        description: 'Facial features image is still loading',
    },
    SPAM: {
        title: 'SPAM DETECTED',
        description: 'Your report has not been submitted due to suspected spamming',
    },
    FAILED: {
        title: 'Failed',
        description: 'Your report has not been submitted',
    },
};

export default function DrugReportForm(props: any) {
    const { data: schools, isLoading } = useSchoolDetailsData();
    const isMobile = useCheckMobileScreen();

    const currentTime = dayjs();

    const defaultFormVars: FormVars = {
        dateIncident: currentTime,
        timeFrom: currentTime,
        timeTo: currentTime.add(2, 'hour'),
        category: 'USAGE_SUSPECTED',
        description: '',
        location: null,
        tenant: '',
        student: {
            name: '',
            class: '',
        },
        status: 'NEW',
        facialData: null,
    };

    const defaultFacialVars: FacialData = {
        hairType: 'CURLY',
        skinColor: 'FAIR',
        gender: 'MALE',
        eyeColor: 'BLACK',
        faceShape: 'DIAMOND',
    };

    const [formVars, setFormVars] = useState<FormVars>(defaultFormVars);
    const [facialData, setFacialData] = useState<FacialData>(defaultFacialVars);

    const [enableFaceOption, setEnableFaceOption] = useState(false);
    const [enableStudentOption, setEnableStudentOption] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [error, setError] = useState<string[]>([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState(DIALOG_MESSAGES.SUCCESS);

    useEffect(() => {
        if (!isLoading && schools) {
            setFormVars({
                ...defaultFormVars,
                tenant: schools[0].id,
                student: {
                    name: '',
                    class: schools[0].classes[0],
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (isLoading) return <PageLoader loading={isLoading} />;
    if (!schools) return <Error />;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Handle Errors
        setError([]);
        const new_errors = [];

        if (formVars.timeFrom?.isAfter(formVars.timeTo))
            new_errors.push('Incident <from time> cannot be after incident <to time>');

        if (formVars.description.split(' ').length < 5)
            new_errors.push('Provide a <description> greater than 5 words');

        if (formVars.location == null) new_errors.push('Provide a <rough location>');

        if (enableStudentOption) {
            if (!formVars.student?.name) new_errors.push('Provide a <Student Name>');
            if (!formVars.student?.class) new_errors.push('Select a <Class>');
        }

        if (!enableStudentOption && enableFaceOption && facialData === null) {
            new_errors.push('Provide <Facial Data>');
        }

        if (new_errors.length > 0) {
            setError(new_errors);
            return;
        }

        const parsedFormVars: InputReport = {
            ...formVars,
            dateIncident: formVars.dateIncident.toISOString(),
            timeFrom: formVars.timeFrom.toISOString(),
            timeTo: formVars.timeTo.toISOString(),
            location: formVars.location as InputReport['location'],
            student: enableStudentOption ? formVars.student : null,
            facialData: enableFaceOption ? facialData : null,
        };

        try {
            setSubmitLoading(true);
            await addReport(parsedFormVars, formVars.tenant);
            setDialogData(DIALOG_MESSAGES.SUCCESS);
        } catch (error: any) {
            console.error(error);
            if (error?.message === 'SPAM') {
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
        <Page padding={'64px 0px 0px 0px'} scroll={false}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container style={{ overflow: 'hidden', height: '100%', padding: '16px' }}>
                    <Grid item lg xs></Grid>
                    <Grid
                        item
                        xs={12}
                        sm={5}
                        md={7}
                        lg={7}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100vh',
                            overflow: 'scroll',
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack
                                // margin={3}
                                paddingY={'64px'}
                                spacing={4}
                                direction="column"
                                // style={{ backgroundColor: 'red' }}
                                // paddingX={isMobile ? '0px' : 25}
                            >
                                <Typography variant="h3">Submit a Drug Report</Typography>

                                <Stack
                                    spacing={4}
                                    // direction={isMobile ? 'column' : 'row'}
                                >
                                    <Stack spacing={2}>
                                        <FormLabel>Incident Date*</FormLabel>
                                        <DatePicker
                                            views={['year', 'month', 'day']}
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
                                </Stack>

                                <Stack spacing={2}>
                                    <FormLabel id="category-select">Category*</FormLabel>
                                    <Select
                                        required
                                        labelId="category-select"
                                        value={formVars.category}
                                        label="Category"
                                        variant="outlined"
                                        sx={{ width: 300 }}
                                        name="category"
                                        onChange={handleChange}
                                        disableUnderline
                                    >
                                        <MenuItem value={'USAGE_SUSPECTED'}>
                                            Suspected Usage of drugs
                                        </MenuItem>
                                        <MenuItem value={'USAGE_CONFIRMED'}>
                                            Confirmed Usage of drugs
                                        </MenuItem>
                                        <MenuItem value={'TRADING_SUSPECTED'}>
                                            Suspected Trading of drugs
                                        </MenuItem>
                                        <MenuItem value={'TRADING_CONFIRMED'}>
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
                                    <FormLabel id="school-select">Select School</FormLabel>
                                    <Select
                                        labelId="school-select"
                                        value={formVars.tenant}
                                        onChange={(e) => {
                                            const id = e.target.value;
                                            setFormVars({
                                                ...formVars,
                                                tenant: id,
                                                student: {
                                                    name: formVars.student?.name ?? '',
                                                    class:
                                                        schools.find((e) => e.id === id)
                                                            ?.classes[0] ?? '',
                                                },
                                            });
                                        }}
                                    >
                                        {schools.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                                {e.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                                const currentVal = value === 'true';
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
                                        <Stack spacing={2}>
                                            <FormLabel id="class-select">Select Class</FormLabel>
                                            <Select
                                                labelId="class-select"
                                                value={formVars.student?.class}
                                                onChange={(e) =>
                                                    setFormVars({
                                                        ...formVars,
                                                        student: {
                                                            name: formVars.student?.name ?? '',
                                                            class: e.target.value,
                                                        },
                                                    })
                                                }
                                            >
                                                {schools
                                                    .find((e) => e.id === formVars.tenant)
                                                    ?.classes.map((e) => (
                                                        <MenuItem value={e}>{e}</MenuItem>
                                                    ))}
                                            </Select>
                                        </Stack>

                                        <Stack spacing={2}>
                                            <FormLabel id="name-enter">
                                                Enter Name (Please Enter the full name)
                                            </FormLabel>
                                            <TextField
                                                variant="outlined"
                                                onBlur={(e) => {
                                                    setFormVars({
                                                        ...formVars,
                                                        student: {
                                                            name: e.target.value,
                                                            class: formVars.student?.class ?? '',
                                                        },
                                                    });
                                                }}
                                            />
                                        </Stack>
                                    </Stack>
                                ) : (
                                    <FacialField
                                        enableFacialFeatures={enableFaceOption}
                                        setEnableFacialFeatures={setEnableFaceOption}
                                        facialData={facialData}
                                        setFacialData={setFacialData}
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
                                    sx={{}}
                                >
                                    Submit
                                </LoadingButton>

                                <div style={{ height: '24px' }}></div>
                            </Stack>
                        </form>
                    </Grid>
                    <Grid item lg xs></Grid>

                    <Grid
                        item
                        xs={5}
                        sm={0}
                        md={3}
                        lg={3}
                        direction={'row'}
                        sx={{
                            borderRadius: ' 10px',
                            border: '1px solid rgba(199, 173, 165, 0.50)',
                            background: SDSColoursSemantic.surface,
                            padding: '16px',
                            boxSizing: 'border-box',
                            height: '100%',
                            overflow: 'scroll',
                        }}
                    >
                        <Stack
                            marginY={4}
                            spacing={4}
                            alignItems="center"
                            justifyContent="center"
                            direction="column"
                        >
                            <Typography variant="h6">
                                <span style={{ color: 'red' }}>We guarantee your privacy</span>. All
                                the data you submit is{' '}
                                <span style={{ color: 'red' }}>encrypted</span> and can only be seen
                                by a authorized personnel from Excise Department.
                            </Typography>

                            <Stack>
                                <CardMedia
                                    component="video"
                                    style={{
                                        minWidth: '20vw',
                                        maxWidth: 700,
                                        border: '5px solid black',
                                        display: 'block',
                                        margin: '10px  auto',
                                    }}
                                    image={ReportVideo}
                                    autoPlay
                                    loop
                                    controls
                                />
                                <Typography variant="h6" align="center">
                                    <br /> You can see the stored reports data in our database{' '}
                                    <LinkRouter to="/visualize" color="primary">
                                        here
                                    </LinkRouter>
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                <DialogBox
                    title={dialogData.title}
                    description={dialogData.description}
                    openFlag={dialogOpen}
                    handleOpen={setDialogOpen}
                />
            </LocalizationProvider>
        </Page>
    );
}
