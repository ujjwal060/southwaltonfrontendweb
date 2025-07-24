import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HomeSection1 from "./components/HomeSection1/HomeSection1";
import HomeSection2 from "./components/HomeSection2/HomeSection2";
import HomeSection3 from "./components/HomeSection3/HomeSection3";
import HomeSection4 from "./components/HomeSection4/HomeSection4";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Cart from "./components/Cart/Cart";
import Cart1 from "./components/Cart1/Cart1";
import Cart2 from "./components/Cart2/Cart2";
import Acknowledgment from "./components/Acknowledgment/Acknowledgment";
import Agreement from "./components/Agreement/Agreement";
import Profile from "./components/Profile/Profile";
import PaymentType from "./components/PaymentType/PaymentType";
import Payment from "./components/Payment/Payment";
import Booking from "./components/Booking/Booking/Booking";
import Booking1 from "./components/Booking/Booking1/Booking1";
import Booking2 from "./components/Booking/Booking2/Booking2";
import Booking3 from "./components/Booking/Booking3/Booking3";
import Booking4 from "./components/Booking/Booking4/Booking4";
import Checkout from "./components/Checkout/Checkout";
import Checkout1 from "./components/Checkout1/Checkout1";
import Logout from "./components/Logout/Logout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangePassword from "./components/ChangePassword/Change";
import Feedback from "./components/Feedback/Feedback";
import DownloadApp from "./components/DownloadApp/DownloadApp";
import PaymentSuccessfully from "./components/PaymentSuccessfully/PaymentSuccessfully";
import Popup from "./components/Popup/Popup";
import Contact from "./components/ContactUs/Contact";
import Agree from "./components/Agreement/Agree";
import Reserve from "./Resserve/Reserve";
import ThankYou from "./components/ThankYou/ThankYou";
// for admin
import AdminAgreement from "./components/Admin/AdminAgreement";
import AdminPayment from "./components/Admin/AdminPayment";
import AdminPaymentSuccessful from "./components/Admin/AdminPaymentSuccessful";
// pages
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import DeleteAccount from "./components/Pages/DeleteAccountPolicy";
import TermsandCondition from "./components/Pages/TermsandCondition";
import Testimonials from "./components/Testimonials/Testimonials";
import AgreementPage from "./components/AgreementPage/AgreementPage";

import Blog from "./components/Blog/blog";

import { useEffect } from "react";

import ScrollToTop from "./components/scroll/ScrollToTop"; // Import here
import ReservePage from "./components/ReservePage/ReservePage";
import ReservePage2 from "./components/ReservePage/ReservePage2";

// import StripePayment from "./components/Payment/StripePayment";


function TitleUpdater() {
  const location = useLocation();

  // Define page titles for specific routes
  const pageTitles = {
    "/": "Home | South Walton",
    "/home": "Home | South Walton",
    "/login": "Login | South Walton",
    "/sign-up": "Sign Up | South Walton",
    "/about": "About Us | South Walton",
    "/cart": "Shopping Cart | South Walton",
    "/checkout": "Checkout | South Walton",
    "/profile": "My Profile | South Walton",
    "/payment": "Payment | South Walton",
    "/contact": "Contact Us | South Walton",
    "/privacy-policy": "Privacy Policy | South Walton",
    "/terms-and-condition": "Terms & Conditions | South Walton",
    "/thankyou": "Thank You | South Walton",
    "/booking": "My Bookings | South Walton",
    "/testimonials": "Testimonials | South Walton",
    "/blog": "Blogs | South Walton"
  };

  useEffect(() => {
    // Set title based on current pathname
    document.title = pageTitles[location.pathname] || "South Walton";
  }, [location.pathname]);

  return null; // This component does not render anything
}

function Layout({ children }) {
  const location = useLocation();

  const noHeaderFooterRoutes = [
    "/privacy-policy",
    "/delete-account-policy",
    "/terms-and-condition",
  ];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <TitleUpdater /> {/* Include the TitleUpdater component */}
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function Routing() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Layout>
        <ScrollToTop /> 
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home4" element={<HomeSection4 />} />
            <Route path="/home3" element={<HomeSection3 />} />
            <Route path="/home2" element={<HomeSection2 />} />
            <Route path="/home1" element={<HomeSection1 />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart1" element={<Cart1 />} />
            <Route path="/cart2" element={<Cart2 />} />
            <Route path="/acknowledgment" element={<Acknowledgment />} />
            <Route path="/agreement" element={<Agreement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment-type" element={<PaymentType />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking1" element={<Booking1 />} />
            <Route path="/booking2" element={<Booking2 />} />
            <Route path="/booking3" element={<Booking3 />} />
            <Route path="/booking4" element={<Booking4 />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout1" element={<Checkout1 />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/download" element={<DownloadApp />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/payment-successfully"
              element={<PaymentSuccessfully />}
            />
            <Route path="/popup" element={<Popup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/agree" element={<Agree />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/agreementpage" element={<AgreementPage />} />
            {/*For admin */}
            <Route path="/agreement-admin" element={<AdminAgreement />} />
            <Route path="/payment-admin" element={<AdminPayment />} />
            <Route
              path="/paymentsuccessful-admin"
              element={<AdminPaymentSuccessful />}
            />

            {/* pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/delete-account-policy" element={<DeleteAccount />} />
            <Route
              path="/terms-and-condition"
              element={<TermsandCondition />}
            />
            <Route
              path="/reservepage"
              element={<ReservePage />}
            />
            <Route
              path="/reservepage2"
              element={<ReservePage2 />}
            />

            {/* <Route path="/StripePayment" element={<StripePayment />} /> */}
          </Routes>
        </Layout>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default Routing;
