import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import OpenRoute from "./auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
import MyProfile from "./Dashboard/MyProfile";
import Settings from "./Dashboard/Settings/Settings";
import { ACCOUNT_TYPE } from "./data/constants";
import { useSelector } from "react-redux";
import Instructor from "./Dashboard/Instructor/Instructor";

function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="flex flex-col">
      <Navbar />
      <Routes>
        {/* Route for all */}
        <Route path="/" element={<Home />} />

        {/* Route for UnAuthorized Users*/}
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        {/* Route for authorized users */}

        <Route
      
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/Settings" element={<Settings />} />
      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="dashboard/instructor" element={<Instructor />} />

          </>
        )
      }

        </Route>

      </Routes>
    </div>
  );
}

export default App;
