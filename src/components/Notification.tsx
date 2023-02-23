import * as React from "react";
import { Alert, Snackbar } from "@mui/material";

function Notification({
  showMessage,
  setShowMessage,
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
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={showMessage.show}
      autoHideDuration={2000}
      onClose={() => setShowMessage({ ...showMessage, show: false })}
    >
      <Alert
        onClose={() => setShowMessage({ ...showMessage, show: false })}
        severity="error"
        sx={{ width: "100%" }}
      >
        {showMessage.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
