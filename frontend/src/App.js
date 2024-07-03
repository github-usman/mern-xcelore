import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./components/profile/UserProfile";
import ProtectedRoute from "./custom-hooks/protectedRoute";
import LoginPage from "./pages/login/LoginPage";
import UserRegister from "./pages/register/UserRegister";
import WelcomePage from "./pages/welcome/WelcomePage";
import UserProfileUpdate from "./components/update/UserProfileUpdate"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/user">
          <Route path="register" element={<UserRegister />} />
          <Route path="login" element={<LoginPage />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="update"
            element={
              <ProtectedRoute>
                <UserProfileUpdate />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Routes path="/admin">
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
