import React from "react";

import DrugReportForm from "./components/DrugReportForm";
import AppBarCustom from "./components/ui/AppBarCustom";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarCustom />
      <DrugReportForm />;
    </Box>
  );
}

export default App;
