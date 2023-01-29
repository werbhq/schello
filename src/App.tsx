import React from "react";

import DrugReportForm from "./pages/DrugReport/DrugReportForm";
import AppBarCustom from "./components/ui/AppBarCustom";
import { Box } from "@mui/material";
import HomePage from "./pages/Home/Home";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarCustom />
      {/* <DrugReportForm />; */}
      <HomePage/>
    </Box>
  );
}

export default App;
