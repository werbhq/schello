import { Card, CardContent } from "@mui/material";
import "./Loading.css";

const LoadingMessage = () => {
  return (
    <Card
      variant="outlined"
      style={{
        padding: "10px",
        margin: "20px",
        maxWidth: "400px",
        minHeight: "max-content",
        float: "left",
        clear: "both",
      }}
      sx={{ backgroundColor: "#179f97", color: "white" }}
    >
      <CardContent style={{ padding: "8px" }}>
        <div style={{ padding: "8px" }}>
          <div className="dot-flashing" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingMessage;
