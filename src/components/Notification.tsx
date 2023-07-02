import * as React from 'react';
import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';

function Notification({
    showMessage,
    setShowMessage,
    severity = 'error',
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
}: {
    showMessage: {
        show: boolean;
        message: string;
    };
    setShowMessage: React.Dispatch<
        React.SetStateAction<{
            show: boolean;
            message: string;
        }>
    >;
    severity?: AlertColor;
    anchorOrigin?: SnackbarOrigin;
}) {
    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={showMessage.show}
            autoHideDuration={2000}
            onClose={() => setShowMessage({ ...showMessage, show: false })}
        >
            <Alert
                onClose={() => setShowMessage({ ...showMessage, show: false })}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {showMessage.message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
