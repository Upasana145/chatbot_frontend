// import React, { useState } from "react";
// import logo from "../Images/logo.gif";
// import { postAPI } from "../utils/fetchapi";
// import { useDispatch } from "react-redux";
// import { loginHandler } from "../redux/slices/authSlice.js";
// import { toast } from "react-toastify";


// function Signin() {
//   const dispatch = useDispatch();
//   const [vendorLogin, setVendorLogin] = useState("");
//   const [vendorPassword, setVendorPassword] = useState("");
//   const [isNavigating, setIsNavigating] = useState(false);

//   const handleLogin = async () => {
//     setIsNavigating(true);

//     try {
//       const payload = {
//         username: vendorLogin,
//         password: vendorPassword,
//       };

//       let data = await postAPI("auth/login", payload, null);
//       if (data?.status) {
//         dispatch(loginHandler(data));
//       } else {
//         toast.error(data?.message);
//       }
//     } catch (error) {
//       console.error(error.message);
//       toast.error(error?.message);
//     } finally {
//       setIsNavigating(false);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div >

//           <div className="logo-link">
//             <span className="logo-icon">🤖</span>
//           </div>
//           <h1 className="welcome-heading">Get Started by Signing In</h1>

//           <br></br>

//           <div className="logincontent">
//             <form className="login-form" onSubmit={handleLogin}>
//               <div className="form-group w-100 info">
// <label htmlFor="vendor-login">
//   <strong>Username</strong>
// </label>

//                 <input
// type="text"
// name="username"
// placeholder="Username"
//                   value={vendorLogin}
//                   onChange={(e) => setVendorLogin(e.target.value)}
//                   className="input-field form-control info-text"
//                 />
//               </div>

//               <div className="form-group w-100 info">
//                 <label htmlFor="password">
//                   <strong>Password</strong>
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="input-field form-control info-text"
//                   value={vendorPassword}
//                   onChange={(e) => setVendorPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 onClick={handleLogin}
//                 disabled={isNavigating}
//                 className="submit-button"
//               >
//                 {isNavigating ? "Logging in..." : "Login"}
//               </button>

//               <p className="signupbtn">
//                 If you're not registered. Please
//                 <button type="" className="btn_simple">
//                   <u>SIGNUP</u>
//                 </button>
//                 "before login."
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signin;


import React, { useState } from "react";
import { postAPI } from "../utils/fetchapi";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/slices/authSlice.js";
import { toast } from "react-toastify";
import robotImage from "../Images/AdobeStock_302394870_Preview.jpeg"; // Replace with the robot image
import logo from "../Images/logo.gif"; // Replace with the logo

function Signin() {
    const dispatch = useDispatch();
    const [vendorLogin, setVendorLogin] = useState("");
    const [vendorPassword, setVendorPassword] = useState("");
    const [isNavigating, setIsNavigating] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsNavigating(true);

        try {
            const payload = {
                username: vendorLogin,
                password: vendorPassword,
            };

            let data = await postAPI("auth/login", payload, null);
            if (data?.status) {
                dispatch(loginHandler(data));
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error?.message);
        } finally {
            setIsNavigating(false);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-left col-6">

                {/* <div className="logo-link">
          <span className="logo-icon">🤖</span>
        </div> */}
                <h3 className="welcome-heading">Welcome Back</h3>
                <p className="chatbot-intro">
                    Get Started by Signing In
                </p>
                <form onSubmit={handleLogin}>


                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={vendorLogin}
                        onChange={(e) => setVendorLogin(e.target.value)}
                        className="input-field"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Your Password"
                        value={vendorPassword}
                        onChange={(e) => setVendorPassword(e.target.value)}
                        className="input-field"
                        required
                    />
                    <div className="form-options">
                        <label>
                            <input type="checkbox" />
                            Keep me logged in
                        </label>
                    </div>
                    <button type="submit" className="login-button" disabled={isNavigating}>
                        {isNavigating ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="signup-text ">
                    Don’t have an account yet? <a href="#">Sign Up</a>
                </p>
            </div>
            <div className="signin-right col-6">
                {/* <img src={robotImage} alt="Robot Illustration" className="robot-image" /> */}
            </div>

            {/* <div className="signin-right">
        <img
          src={robotImage}
          alt="AI Chatbot Illustration"
          className="floating-bot"
        />
      </div> */}


        </div>
    );
}

export default Signin;

