import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import NewTaskDetail from './pages/adminPanel/NewTaskDetail';
import ResetUsersPage from './pages/adminPanel/ResetUsersPage';
export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayaut />}>
            <Route path="dashboard" element={<Dashboards />} />
            
            <Route path="socialMediaLink" element={<SocialMediaTable />} />
            <Route path="referralGet" element={<Referalget />} />
            <Route path="referralPost" element={<ReferalPost />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="profileImage" element={<ProfileImage />} />
            <Route path="userTask" element={<UserTask />} />
            <Route path="payment" element={<CoinClick />} />
            <Route path="paymentResult" element={<PaymentResult />} />

            {/* Admin sahifalari */}
            <Route path="newtask" element={<NewTask />} />
            <Route path="newtaskDetail/:id" element={<NewTaskDetail />} />
            <Route path="allUsers" element={<AllUsers />} />
            <Route path="userDetails/:id" element={<UserDetails />} />
            <Route path="resetUsers" element={<ResetUsersPage />} />
            {/* docs */}
            <Route path="/docs" element={<Docs />} />
          </Route>
          {/* auth */}
          <Route index element={<Auth />} />
          {/* auth */}
          <Route path="login" element={<LoginImage />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}  