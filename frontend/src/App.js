import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./components/profile/UserProfile";
import ProtectedRoute from "./custom-hooks/protectedRoute";
import UserLoginPage from "./pages/login/UserLoginPage";
import AdminLoginPage from "./pages/login/AdminLoginPage";
import UserRegister from "./pages/register/UserRegister";
import WelcomePage from "./pages/welcome/WelcomePage";
import UserProfileUpdate from "./components/update/UserProfileUpdate"
import AdminProfile from "./components/profile/AdminProfile";
import AllUserProfile from "./components/admin-user-controls/AllUserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
            path="/update"
            element={
              <ProtectedRoute>
                <UserProfileUpdate />
              </ProtectedRoute>
            }
          />
        <Route path="/user">
          <Route path="register" element={<UserRegister />} />
          <Route path="login" element={<UserLoginPage />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          
        </Route>
        <Route path="/admin">
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="profile"
         element={
          <ProtectedRoute>
             <AdminProfile />
          </ProtectedRoute>
          } /> 
        <Route path="all-user"
         element={
          <ProtectedRoute>
             <AllUserProfile />
          </ProtectedRoute>
          } />
      </Route>
      </Routes>
      
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
