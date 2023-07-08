import { Grid, Box, Typography } from '@mui/material';
import UploadVideoArticleForm from './components/UploadForm';
import Page from 'components/ui/Page';

function CommunityForm() {
    return (
        <Page>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                >
                    <Grid item xs={12} sx={{ paddingTop: '30px', paddingBottom: '20px' }}>
                        <Typography variant="h3">Share Your Experience</Typography>
                    </Grid>
                    <Grid>
                        <UploadVideoArticleForm />
                    </Grid>
                </Grid>
            </Box>
        </Page>
    );
}

export default CommunityForm;
