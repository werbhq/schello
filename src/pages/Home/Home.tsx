import { Grid, List, ListItem, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// import EventCard from './components/EventCard';
import VideoCard from './components/VideoCard';
import NewsCard from './components/NewsCard';
import NoDataCard from './components/NoDataCard';
import MediaCard from './components/HomeCard';
import { useGeneralData } from 'hooks/useGeneralData';
import PageLoader from 'components/ui/PageLoader';
import Page from 'components/ui/Page';
import { SDSColoursSemantic } from 'components/ui/Colours';
import { useNewData } from 'hooks/useData';

function HomePage() {
    const { events, videos, news, isLoading } = useGeneralData();
    const { mediaList, eventList, isLoading: isLoading2 } = useNewData();

    if (isLoading || isLoading2) return <PageLoader loading={isLoading} />;

    return (
        <Page padding="64px 0px 0px 0px" scroll={false}>
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
                    <Stack spacing={2}>
                        <Stack padding={'64px 0px 24px 0px'}>
                            <Typography variant="h3">Welcome to Schello!</Typography>
                        </Stack>

                        <Stack
                            component={Link}
                            to="/community/form"
                            sx={{
                                borderRadius: '24px',
                                border: '1px solid rgba(199, 173, 165, 0.50)',
                                background: '#FFF',
                                boxShadow: '0px 4px 50px 0px rgba(64, 93, 136, 0.04)',
                                padding: '16px',
                                textDecoration: 'none',
                                marginBottom: '160px',
                            }}
                        >
                            <Typography variant="h5">Got something to share?</Typography>
                            <Typography>
                                Click here to share a video or article you feel would be helpful to
                                others.
                            </Typography>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                }}
                            >
                                <Button disabled sx={{ backgroundColour: 'red !important' }}>
                                    Share
                                </Button>
                            </div>
                        </Stack>

                        <List
                            style={{
                                gap: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100% !important',
                                padding: 0,
                                marginTop: 24,
                            }}
                        >
                            {mediaList?.map((e, index) => (
                                <MediaCard {...e} key={index} />
                            ))}
                        </List>

                        <Typography variant="h6">Videos</Typography>
                        <List
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 0,
                                maxWidth: '100%',
                                overflow: 'auto',
                            }}
                        >
                            {videos?.map((e, index) => (
                                <VideoCard {...e} key={index} />
                            ))}
                            {videos?.length === 0 && <NoDataCard resource="videos" />}
                        </List>
                    </Stack>

                    <Stack spacing={2}>
                        <Typography variant="h6">News</Typography>
                        <List
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 0,
                                maxWidth: '100%',
                                overflow: 'auto',
                            }}
                        >
                            {news?.map((e, index) => (
                                <NewsCard {...e} key={index} />
                            ))}
                            {news?.length === 0 && <NoDataCard resource="news" />}
                        </List>
                    </Stack>
                </Grid>
                <Grid item lg xs></Grid>

                <Grid
                    item
                    xs={5}
                    sm={0}
                    md={3}
                    lg={3}
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
                    <Typography variant="h6">Latest Events</Typography>
                    <List
                        style={{
                            overflow: 'auto',
                            padding: '0px',
                            marginTop: '16px',
                        }}
                    >
                        {eventList?.map((e, index) => (
                            <ListItem
                                key={index}
                                style={{
                                    padding: '5px 0px',
                                }}
                            >
                                <MediaCard {...e} key={index} />
                            </ListItem>
                        ))}
                        {events?.length === 0 && <NoDataCard resource="events" />}
                    </List>
                </Grid>
            </Grid>
        </Page>
    );
}

export default HomePage;
