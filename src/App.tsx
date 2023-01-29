import DrugReportForm from "./pages/DrugReport/DrugReportForm";
import AppBarCustom from "./components/ui/AppBarCustom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Community from "./pages/Community/Community";
import Error from "./pages/Error/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppBarCustom />}>
          <Route index element={<Home />} />
          <Route path="form" element={<DrugReportForm />} />
          <Route path="community" element={<Community />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
