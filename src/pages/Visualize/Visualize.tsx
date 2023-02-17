import { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import { getEncryptedReports } from "../../api/report";
import { Report } from "../../models/Report";
import { CircularProgress } from "@mui/joy";
import ReportTable from "./components/ReportTable";

function VisualizePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEncryptedReports().then(setReports);
    setLoading(false);
  }, []);

  return (
    <Stack spacing={4} margin={4}>
      <Typography variant="h3">Visualize Your Reports</Typography>

      <Stack spacing={2}>
        <Typography variant="h6" color={"red"}>
          We guarantee your privacy.
        </Typography>

        {loading ? <CircularProgress /> : <ReportTable reports={reports} />}
      </Stack>
    </Stack>
  );
}

export default VisualizePage;
