import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";
import Offers from "./pages/Offers";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./component/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./component/privateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/editListing";
import Listing from "./pages/listing";
import ErrorPage from "./pages/errorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="/edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
          <Route
            path="/listing/catagory/:catagoryType/:listingId"
            element={<Listing />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
