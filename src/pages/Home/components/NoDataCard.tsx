import { Card, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from '@mui/system';

export default function NoDataCard({ resource }: { resource: string }) {
    return (
        <Card variant="outlined" sx={{ padding: '10px', maxWidth: '30rem' }}>
            <Stack direction="row" spacing={1}>
                <ClearIcon color="error" />
                <Typography>No {resource} available right now</Typography>
            </Stack>
        </Card>
    );
}
