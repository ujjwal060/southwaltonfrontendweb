import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function Routing() {
    return (
      <div>
        <Router>  
          <Navbar />    

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
            <Route path="/payment-successfully" element={<PaymentSuccessfully />} />
            <Route path="/popup" element={<Popup/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/agree" element={<Agree/>} />
            <Route path="/reserve" element={<Reserve/>} />

          </Routes>
          <Footer/>
        </Router>
      </div>
    );
  }
  
  export default Routing;