import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/auth/Register';
import LoginPage from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import LearnMore from './pages/LearnMore';
// import GuestOnlyRoute from './pages/auth/GuestOnlyRoute';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import PublicRoute from './pages/auth/PublicRoute';
import StockIn from './pages/stocks/StockIn';
import StockOut from './pages/stocks/StockOut';
import StockList from './pages/stocks/StockList';
import StockLogs from './pages/stocks/StockLogs';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn-more" element={<LearnMore />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/stocks-in" element={<ProtectedRoute><StockIn /></ProtectedRoute>} />
        <Route path="/stocks-out" element={<ProtectedRoute><StockOut /></ProtectedRoute>} />
        <Route path="/stocks" element={<ProtectedRoute><StockList /></ProtectedRoute>} />
        <Route path="/stocks-logs" element={<ProtectedRoute><StockLogs /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>    </MainLayout>
  );
}

export default App;
