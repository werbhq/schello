import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import DrugReportForm from './pages/DrugReport/DrugReportForm';
import AppBarCustom from './components/ui/AppBarCustom';
import HomePage from './pages/Home/Home';
import Community from './pages/Community/Community';
import Error from './pages/Error/Error';
import VisualizePage from './pages/Visualize/Visualize';
import CommunityForm from './pages/Community/Form/Form';
import ChatPage from './pages/Chat';
import ROUTES from 'routes';

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
                    <Route path={ROUTES.DEFAULT} element={<AppBarCustom />}>
                        <Route index element={<HomePage />} />
                        <Route path={ROUTES.DRUG_FORM} element={<DrugReportForm />} />
                        <Route path={ROUTES.COMMUNITY} element={<Community />} />
                        <Route path={ROUTES.COMMUNITY_FORM} element={<CommunityForm />} />
                        <Route path={ROUTES.INTERNAL.VISUALIZE} element={<VisualizePage />} />
                        <Route path={ROUTES.CHAT} element={<ChatPage />} />
                        <Route path="*" element={<Error />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            {process.env.REACT_APP_ENABLE_DEV_TOOLS && <ReactQueryDevtools />}
        </QueryClientProvider>
    );
}

export default App;
