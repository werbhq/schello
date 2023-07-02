import { Typography, Stack } from '@mui/material';
import ReportTable from './components/ReportTable';
import { useReportsData } from 'hooks/useVisualizeData';
import PageLoader from 'components/ui/PageLoader';
import Page from 'components/ui/Page';

function VisualizePage() {
    const { data: reports, isLoading } = useReportsData();

    if (isLoading) return <PageLoader loading={isLoading} />;

    return (
        <Page>
            <Stack spacing={4} margin={4}>
                <Typography variant="h3">Visualize Your Reports</Typography>

                <Stack spacing={2}>
                    <Typography variant="h6" color={'red'}>
                        We guarantee your privacy.
                    </Typography>

                    <ReportTable reports={reports ?? []} />
                </Stack>
            </Stack>
        </Page>
    );
}

export default VisualizePage;
