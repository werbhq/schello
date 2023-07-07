import { Typography, Stack, Grid } from '@mui/material';
import PageLoader from 'components/ui/PageLoader';
import { useCommunityData } from 'hooks/useCommunityData';
import Page from 'components/ui/Page';
import SearchBar from 'components/ui/SearchBar';
import { useState } from 'react';
import NoDataCard from './components/NoDataCard';
import { MediaInformation, EventInformation } from 'types/Media';
import MediaCard from 'pages/Home/components/HomeCard';
import { SDSChip } from 'components/ui/chip';
import { useGeneralData } from 'hooks/useGeneralData';

function CommunityPage() {
    const { videos, articles, isLoading } = useCommunityData();
    const { videos: exciseVideos, events, news, isLoading: isLoadingExcise } = useGeneralData();
    const [search, setSearch] = useState('');

    if (isLoading || isLoadingExcise) return <PageLoader loading={isLoading} />;

    const mediaList = [
        ...(videos ?? []),
        ...(articles ?? []),
        ...(news ?? []),
        ...(events ?? []),
        ...(exciseVideos ?? []),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const onSearchChange = (e: any) => setSearch(e.target.value.toLocaleLowerCase());

    const filterSearch = (e: MediaInformation | EventInformation, search: string) => {
        if (search.length > 2) {
            return (
                e.title.toLocaleLowerCase().includes(search) ||
                e.description?.toLocaleLowerCase().includes(search) ||
                e.source?.toLocaleLowerCase().includes(search) ||
                e.email?.toLocaleLowerCase().includes(search)
            );
        }
        return true;
    };

    return (
        <Page padding="64px 0px 0px 0px" scroll={false}>
            <Grid
                container
                style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '100%',
                    width: '100%',
                    padding: '0px 16px 32px 16px',
                }}
            >
                <Grid item xs sm md lg></Grid>
                <Grid item xs={12} sm={10} md={10} lg={10}>
                    <Stack
                        spacing={4}
                        alignItems="start"
                        justifyContent="center"
                        sx={{ width: '100%', paddingTop: '64px' }}
                    >
                        <Typography variant="h3">Library</Typography>
                        <Stack direction={'row'}>
                            <SearchBar placeholder="Search" onChange={onSearchChange} />
                            <Stack direction={'row'}>
                                <SDSChip label="Videos"></SDSChip>
                                <SDSChip label="Articles"></SDSChip>
                                <SDSChip label="News"></SDSChip>
                                <SDSChip label="Events"></SDSChip>
                            </Stack>
                        </Stack>

                        <Grid
                            direction={'row'}
                            container
                            spacing={'20px'}
                            sx={{
                                width: '100%',
                                marginLeft: '-20px !important',
                            }}
                        >
                            {mediaList
                                ?.filter((e) => filterSearch(e, search))
                                .map((e, index) => (
                                    <Grid
                                        item
                                        sx={{
                                            flexGrow: 1,

                                            display: 'flex',
                                        }}
                                    >
                                        <MediaCard
                                            data={e}
                                            expand={false}
                                            key={index}
                                            index={index}
                                            grow={true}
                                        />
                                    </Grid>
                                ))}

                            {mediaList?.filter((e) => filterSearch(e, search)).length === 0 && (
                                <Grid item>
                                    <NoDataCard resource="results" />
                                </Grid>
                            )}
                        </Grid>
                    </Stack>
                </Grid>
                <Grid item xs sm md lg></Grid>
            </Grid>
        </Page>
    );
}

export default CommunityPage;
