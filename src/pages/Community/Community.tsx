import { Typography, Stack, Grid } from '@mui/material';
import PageLoader from 'components/ui/PageLoader';
import { useCommunityData } from 'hooks/useCommunityData';
import Page from 'components/ui/Page';
import SearchBar from 'components/ui/SearchBar';
import { useState } from 'react';
import NoDataCard from './components/NoDataCard';
import { MediaInformation, EventInformation } from 'types/Media';
import MediaCard from 'pages/Home/components/MediaCard';
import { SDSChip } from 'components/ui/chip';
import { useGeneralData } from 'hooks/useGeneralData';
import { SDSColorsSemantic } from 'components/ui/Colours';

function CommunityPage() {
    const { videos, articles, isLoading } = useCommunityData();
    const { videos: exciseVideos, events, news, isLoading: isLoadingExcise } = useGeneralData();
    const [search, setSearch] = useState('');

    const selectionMap = {
        all: true,
        videos: true,
        articles: true,
        news: true,
        events: true,
        excise: false,
    };
    const [selected, setSelected] = useState(selectionMap);

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

    const filterSelected = (
        e: MediaInformation | EventInformation,
        selected: typeof selectionMap
    ) => {
        if (selected.all) {
            return true;
        }

        return (
            ((selected.videos && e.type === 'MEDIA' && e.media_type === 'VIDEO') ||
                (selected.articles && e.type === 'MEDIA' && e.media_type === 'ARTICLE') ||
                (selected.news && e.type === 'MEDIA' && e.media_type === 'NEWS') ||
                (selected.events && e.type === 'EVENT')) &&
            (!selected.excise || (selected.excise && e.fromExcise === true))
        );
    };

    const setSelection = (selectedItem: string) => {
        if (selectedItem === 'all') {
            setSelected((prevSelected) => ({
                all: !prevSelected.all,
                videos: !prevSelected.all ? true : prevSelected.videos,
                articles: !prevSelected.all ? true : prevSelected.articles,
                news: !prevSelected.all ? true : prevSelected.news,
                events: !prevSelected.all ? true : prevSelected.events,
                excise: prevSelected.all,
            }));
        } else if (selectedItem === 'excise') {
            setSelected((prevSelected) => {
                const allSelected =
                    prevSelected.videos &&
                    prevSelected.articles &&
                    prevSelected.news &&
                    prevSelected.events;
                return {
                    ...prevSelected,
                    excise: !prevSelected.excise,
                    all: allSelected && !prevSelected.excise === false ? true : false,
                };
            });
        } else {
            setSelected((prevSelected) => {
                const updatedSelected = {
                    ...prevSelected,
                    [selectedItem]: !prevSelected[selectedItem as keyof typeof prevSelected],
                };

                const allSelected =
                    updatedSelected.videos &&
                    updatedSelected.articles &&
                    updatedSelected.news &&
                    updatedSelected.events &&
                    !updatedSelected.excise;

                return {
                    ...updatedSelected,
                    all: allSelected,
                };
            });
        }
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
                        <Typography variant="h3" sx={{ zIndex: 999 }}>
                            Explore
                        </Typography>
                        <Stack
                            direction={'row'}
                            gap={'12px'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            sx={{
                                position: 'sticky',
                                top: '16px',

                                background: SDSColorsSemantic.surface,
                                padding: '12px',
                                borderRadius: '16px',
                                width: '100%',

                                border: '1px solid rgba(199, 173, 165, 0.50)',
                                boxShadow:
                                    '0px 4px 50px 0px rgba(64, 93, 136, 0.04), 0px -80px 0px 40px #F5F0EC',
                                textDecoration: 'none',
                                marginBottom: '160px',
                                zIndex: 998,

                                flexWrap: 'wrap',
                            }}
                        >
                            <SearchBar placeholder="Search" onChange={onSearchChange} />
                            <Stack direction={'row'} gap={'8px'} flexWrap={'wrap'}>
                                <SDSChip
                                    label="All"
                                    color={selected.all ? 'primary' : undefined}
                                    onClick={() => setSelection('all')}
                                ></SDSChip>
                                <SDSChip
                                    label="Videos"
                                    color={selected.videos ? 'primary' : undefined}
                                    onClick={() => setSelection('videos')}
                                ></SDSChip>
                                <SDSChip
                                    label="Articles"
                                    color={selected.articles ? 'primary' : undefined}
                                    onClick={() => setSelection('articles')}
                                ></SDSChip>
                                <SDSChip
                                    label="Events"
                                    color={selected.events ? 'primary' : undefined}
                                    onClick={() => setSelection('events')}
                                ></SDSChip>
                                <SDSChip
                                    label="News"
                                    color={selected.news ? 'primary' : undefined}
                                    onClick={() => setSelection('news')}
                                ></SDSChip>
                                <SDSChip
                                    label="Excise-Only"
                                    color={selected.excise ? 'primary' : undefined}
                                    onClick={() => setSelection('excise')}
                                ></SDSChip>
                            </Stack>
                        </Stack>

                        <Grid
                            direction={'row'}
                            container
                            // spacing={}
                            sx={{
                                width: '100%',
                                rowGap: '16px',
                                columnGap: '16px',
                                // marginLeft: '-12px !important',
                            }}
                        >
                            {mediaList
                                ?.filter((e) => filterSelected(e, selected))
                                .filter((e) => filterSearch(e, search))
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
                                            page="Explore"
                                        />
                                    </Grid>
                                ))}

                            {mediaList
                                ?.filter((e) => filterSelected(e, selected))
                                .filter((e) => filterSearch(e, search)).length === 0 && (
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
