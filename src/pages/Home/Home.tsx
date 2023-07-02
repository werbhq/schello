import { Grid, Divider, List, ListItem, Typography, Stack } from '@mui/material';
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
        <Page>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={2} margin={2}>
                        <Stack paddingY={8}>
                            <Typography
                                variant="h2"
                                style={{
                                    fontFamily: 'Fixel Display',
                                    fontWeight: 'bold',
                                    color: '#1C2D46',
                                    fontSize: '40px',
                                    fontStyle: 'normal',
                                    lineHeight: '120%',
                                    letterSpacing: '-2.4px',
                                    fontFeatureSettings: '"ss01" 1',
                                }}
                            >
                                Welcome to Schello!
                            </Typography>
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

                <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={2} margin={2}>
                        <Typography variant="h6">Events</Typography>
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
