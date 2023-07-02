import { Button, Typography, List, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import VideoCard from 'pages/Home/components/VideoCard';
import ArticleCard from './components/articleCard';
import PageLoader from 'components/ui/PageLoader';
import { useCommunityData } from 'hooks/useCommunityData';

function CommunityPage() {
    const { videos, articles, isLoading } = useCommunityData();

    if (isLoading) return <PageLoader loading={isLoading} />;

    return (
        <Stack margin={4} spacing={4} alignItems="center" justifyContent="center">
            <Typography variant="h3" color="primary" fontWeight="bold">
                Community Page
            </Typography>

            <Button color="secondary" component={Link} to="/community/form" variant="contained">
                Share Your Experience here
            </Button>

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
                    {videos?.map((e, index) => (
                        <VideoCard {...e} key={index} />
                    ))}
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
                    {articles?.map((e, index) => (
                        <ArticleCard {...e} key={index} />
                    ))}
                </List>
            </Stack>
        </Stack>
    );
}

export default CommunityPage;
