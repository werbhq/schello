import { Typography, List, Stack } from '@mui/material';
import VideoCard from './../Home/components/VideoCard';
import ArticleCard from './components/articleCard';
import PageLoader from 'components/ui/PageLoader';
import { useCommunityData } from 'hooks/useCommunityData';
import Page from 'components/ui/Page';
import SearchBar from 'components/ui/SearchBar';
import { useState } from 'react';
import { CommunityArticle, CommunityVideo } from 'types/Community';
import NoDataCard from './components/NoDataCard';

function CommunityPage() {
    const { videos, articles, isLoading } = useCommunityData();
    const [search, setSearch] = useState('');

    if (isLoading) return <PageLoader loading={isLoading} />;

    const onSearchChange = (e: any) => setSearch(e.target.value.toLocaleLowerCase());

    const filterSearch = (e: CommunityVideo | CommunityArticle, search: string) => {
        if (search.length > 2) {
            return (
                e.title.toLocaleLowerCase().includes(search) ||
                e.description.toLocaleLowerCase().includes(search) ||
                e.author.toLocaleLowerCase().includes(search) ||
                e.email.toLocaleLowerCase().includes(search)
            );
        }
        return true;
    };

    return (
        <Page>
            <Stack marginY={4} spacing={4} alignItems="center" justifyContent="center">
                <Typography variant="h3">Library</Typography>
                <SearchBar placeholder="Search" onChange={onSearchChange} />

                <Stack spacing={2}>
                    <Typography variant="h4">Videos</Typography>
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            overflow: 'auto',
                            maxWidth: '90vw',
                            minWidth: '90vw',
                        }}
                    >
                        {videos
                            ?.filter((e) => filterSearch(e, search))
                            .map((e, index) => (
                                <VideoCard {...e} key={index} />
                            ))}

                        {videos?.filter((e) => filterSearch(e, search)).length === 0 && (
                            <NoDataCard resource="videos" />
                        )}
                    </List>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h4">Articles</Typography>
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            overflow: 'auto',
                            maxWidth: '90vw',
                            minWidth: '90vw',
                        }}
                    >
                        {articles
                            ?.filter((e) => filterSearch(e, search))
                            .map((e, index) => (
                                <ArticleCard {...e} key={index} />
                            ))}
                        {articles?.filter((e) => filterSearch(e, search)).length === 0 && (
                            <NoDataCard resource="articles" />
                        )}
                    </List>
                </Stack>
            </Stack>
        </Page>
    );
}

export default CommunityPage;
