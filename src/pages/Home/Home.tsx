import { Grid, Divider, List, ListItem, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import EventCard from './components/EventCard';
import VideoCard from './components/VideoCard';
import NewsCard from './components/NewsCard';
import NoDataCard from './components/NoDataCard';
import { useGeneralData } from 'hooks/useGeneralData';
import PageLoader from 'components/ui/PageLoader';
import Page from 'components/ui/Page';

function HomePage() {
    const { events, videos, news, isLoading } = useGeneralData();
    if (isLoading) return <PageLoader loading={isLoading} />;

    return (
        <Page padding="50px 0px">
            <Grid container spacing={2} xs={12} sx={{ width: '100%' }}>
                <Grid
                    item
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0px 146px',
                        width: '100%',
                    }}
                >
                    <Stack spacing={2} margin={2}>
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

                    <Stack spacing={2} margin={2}>
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

                <Grid
                    item
                    xs={12}
                    lg={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: ' 10px',
                        border: '1px solid rgba(199, 173, 165, 0.50)',
                        background: '#FFF',
                        // position: 'fixed',
                        right: '8px',
                        top: '72px',
                        bottom: '8px',
                    }}
                >
                    <Stack spacing={2} margin={2}>
                        <Typography variant="h6">Latest Events</Typography>
                        <List
                            style={{
                                overflow: 'auto',
                                padding: '0px',
                                maxHeight: '350px',
                            }}
                        >
                            {events?.map((e, index) => (
                                <ListItem
                                    key={index}
                                    style={{
                                        padding: '5px 0px',
                                    }}
                                >
                                    <EventCard event={e} key={index} />
                                </ListItem>
                            ))}
                            {events?.length === 0 && <NoDataCard resource="events" />}
                        </List>
                    </Stack>
                </Grid>
            </Grid>
        </Page>
    );
}

export default HomePage;
