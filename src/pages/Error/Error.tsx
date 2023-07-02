import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const primary = '#F6B208';

export default function Error() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: primary,
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                The page you&apos;re looking for doesn&apos;t exist.
            </Typography>
            <Button style={{ color: 'white' }} component={Link} to="/">
                Back Home
            </Button>
        </Box>
    );
}
