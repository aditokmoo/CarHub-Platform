import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginLayout from './features/auth/LoginLayout/LoginLayout';
import RegisterLayout from './features/auth/RegisterLayout/RegisterLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import PrivateRoute from './router/PrivateRoute/PrivateRoute';
import PublicRoute from './router/PublicRoute/PublicRoute';
import Appointments from './features/appointments/Appointments';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import VerifyLayout from './features/auth/VerifyLayout/VerifyLayout';
import { AuthContextProvider } from './features/auth/context/auth.context';
import { ToastContainer } from 'react-toastify';
import NotFound from './features/NotFound/NotFound';
import PersistLogin from './components/PersistLogin';
import ServiceProviders from './features/serviceProviders/ServiceProviders';
import Settings from './features/settings/Settings';
import SavedProviders from './features/savedProviders/SavedProviders';
import 'react-toastify/dist/ReactToastify.css';
// SCSS
import './styles/App.scss'
import SingleServiceProvider from './features/singleServiceProvider/SingleServiceProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Navigate to="/" />} />

              {/* Private routes with layout */}
              <Route path="/" element={
                <AppLayout />
              }>
                {/* Public routes */}
                <Route index element={<ServiceProviders />} />
                <Route path="/serviceProvider/:id" element={<SingleServiceProvider />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="saved-providers" element={<SavedProviders />} />
                <Route path="settings" element={<Settings />} />

                {/* not found route */}
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Public routes */}
              <Route path='/auth' element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              } >
                <Route index element={<Navigate to='login' />} />
                <Route path='login' element={<LoginLayout />} />
                <Route path='register' element={<RegisterLayout />} />
                <Route path='verify' element={<VerifyLayout />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer />
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App