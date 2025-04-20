import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayaut } from "./layouts";
import Dashboards from "./pages/Dashboards";
import Referalget from "./pages/referal/Referalget";
import ReferalPost from "./pages/referal/ReferalPost";
import UserProfile from "./pages/Profile/UserProfile";
import EditProfile from "./pages/Profile/EditProfile";
import ProfileImage from "./pages/Profile/ProfilImage";
import UserTask from "./pages/UserTask";
import { CoinClick } from "./pages/CoinClick";
import NewTask from "./pages/adminPanel/NewTask";
import { AllUsers } from "./pages/adminPanel/AllUsers";
import UserDetails from "./pages/adminPanel/UserDetails";
import LoginImage from "./pages/LoginImage";
import Register from "./pages/Register";
import Docs from "./pages/Docs";
import SocialMediaTable from "./pages/SocialMedia/SocialMediaRead";
import PaymentResult from "./pages/PaymentResult";
import { HelmetProvider } from "react-helmet-async";
import Auth from "./pages/Auth";

export default function App() {
  // Token va Role tekshiruvi
  const isAuthenticated = !!localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); 

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route index element={<Auth />} />
          <Route path="login" element={<LoginImage />} />
          <Route path="register" element={<Register />} />
          <Route path="/docs" element={<Docs />} />

          {/* Protected Routes */}
          <Route path="/" element={<AppLayaut />}>
            {/* User Routes */}
            <Route
              path="dashboard"
              element={
                isAuthenticated ? (
                  <Dashboards />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="socialMediaLink"
              element={
                isAuthenticated ? (
                  <SocialMediaTable />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="referralGet"
              element={
                isAuthenticated ? (
                  <Referalget />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="referralPost"
              element={
                isAuthenticated ? (
                  <ReferalPost />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="profile"
              element={
                isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="editProfile"
              element={
                isAuthenticated ? (
                  <EditProfile />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="profileImage"
              element={
                isAuthenticated ? (
                  <ProfileImage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="userTask"
              element={
                isAuthenticated ? (
                  <UserTask />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="payment"
              element={
                isAuthenticated ? (
                  <CoinClick />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="paymentResult"
              element={
                isAuthenticated ? (
                  <PaymentResult />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Admin Routes */}
            <Route
              path="newtask"
              element={
                isAuthenticated && userRole === "admin" ? (
                  <NewTask />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="allUsers"
              element={
                isAuthenticated && userRole === "admin" ? (
                  <AllUsers />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="userDetails/:id"
              element={
                isAuthenticated && userRole === "admin" ? (
                  <UserDetails />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}