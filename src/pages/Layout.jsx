import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import { useSelector } from "react-redux";
import Otppage from "./Otppage";
import Chat from "./Chat";
import Signup from "./Signup";

const Layout = () => {
  const auth = useSelector((state) => state.auth.value);

  return (
    <>
      <BrowserRouter>
        {!auth ? (
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget" element={<Otppage />} />
          </Routes>
        ) : (
          <>
            <Chat />
          </>
        )}
      </BrowserRouter>
    </>
  );
};

export default Layout;
