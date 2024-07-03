import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import WelcomePage from './pages/welcome/WelcomePage';
import UserProfile from './components/profile/UserProfile';
import { fetchProfileService } from './services/authService';
import { useEffect, useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await fetchProfileService();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.error(error.message);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/user-profile" />} />
        <Route path="/user-profile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
