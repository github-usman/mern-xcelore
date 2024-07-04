import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllUserProfile from "./pages/admin/AllUserProfile";
import AdminProfile from "./pages/admin/AdminProfile";
import UserProfile from "./pages/user/UserProfile";
import UserProfileUpdate from "./pages/user/UserProfileUpdate";
import ProtectedRoute from "./custom-hooks/ProtectedRoute";
import UserLoginPage from "./pages/LoginPage";
import UserRegister from "./pages/user/UserRegister";
import WelcomePage from "./pages/welcome/WelcomePage";
import AuthAdmin from "./custom-hooks/AuthAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/user/login" element={<UserLoginPage />} />

        {/* protected routes */}
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
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* admin routes */}
        <Route path="/admin">
          <Route
            path="profile"
            element={
              <AuthAdmin>
                <AdminProfile />
              </AuthAdmin>
            }
          />
          <Route
            path="all-user"
            element={
              <AuthAdmin>
                <AllUserProfile />
              </AuthAdmin>
            }
          />
        </Route>

        {/* admin routes end */}
        {/* Protected Route end */}
      </Routes>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
