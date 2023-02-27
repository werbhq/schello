import DrugReportForm from "./pages/DrugReport/DrugReportForm";
import AppBarCustom from "./components/ui/AppBarCustom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Community from "./pages/Community/Community";
import Error from "./pages/Error/Error";
import HomePage from "./pages/Home/Home";
import VisualizePage from "./pages/Visualize/Visualize";
import CommunityForm from "./pages/Community/Form/Form";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppBarCustom />}>
            <Route index element={<HomePage />} />
            <Route path="form" element={<DrugReportForm />} />
            <Route path="community" element={<Community />} />
            <Route path="community/form" element={<CommunityForm />} />
            <Route path="visualize" element={<VisualizePage />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {process.env.REACT_APP_ENABLE_DEV_TOOLS && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
