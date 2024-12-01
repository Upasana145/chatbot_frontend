import React, { useState } from "react";
import logo from "../Images/logo.gif";
// import backgroundImage from "../Images/bgimg.jpg";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/valEmail";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../utils/fetchapi";

const containerStyle = {
  // backgroundImage: `url(${backgroundImage})`,
  backgroundColor: "red",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
};

function Otppage() {
  const navigate = useNavigate();
  // 0 -> forgetpw 1 -> otp 2 ->confirm
  const [pageNum, setPageNum] = useState(0);
  const [form, setForm] = useState({
    email: "",
    enteredOTP: "",
    newPW: "",
    confirmPW: "",
  });

  // Check mail in DB & OTP Send
  const handleNext = async (event) => {
    event.preventDefault();
    if (form?.email === "") {
      toast.warning("Please enter your email");
    } else if (!validateEmail(form?.email)) {
      toast.warning("Please enter a valid email");
    } else {
      try {
        const payload = {
          email: form.email,
        };
        console.log(payload);
        let res = await postAPI("auth/forget", payload, null);
        console.log(res);
        if (res.status) {
          setPageNum(1);
          toast.success(res.message);
        } else {
          toast.error("Failed to send email. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  // OTP Check
  const handleVerify = async (event) => {
    event.preventDefault();
    if (form?.email === "") {
      toast.warning("Please enter your email");
    } else if (!validateEmail(form?.email)) {
      toast.warning("Please enter a valid email");
    } else if (form?.enteredOTP === "") {
      toast.warning("Please enter a valid entered OTP");
    } else {
      try {
        const payload = {
          email: form.email,
          enteredOTP: form.enteredOTP,
        };
        console.log(payload);
        let res = await postAPI("auth/otpVerify", payload, null);
        console.log(res);
        if (res.status) {
          setPageNum(2);
          toast.success(res.message);
        } else {
          toast.error("Failed to send email. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleNewPw = async (event) => {
    event.preventDefault();
    console.log(form?.newPW === form?.confirmPW);
    if (form?.email === "") {
      toast.warning("Please enter your email");
    } else if (!validateEmail(form?.email)) {
      toast.warning("Please enter a valid email");
    } else if (form?.enteredOTP === "") {
      toast.warning("Please enter a valid entered OTP");
    } else if (form?.newPW === "" || form?.confirmPW === "") {
      toast.warning("Please enter a valid password");
    } else if (form?.newPW !== form?.confirmPW) {
      toast.warning("New Password and confirm password must be the same");
    } else {
      try {
        const payload = {
          email: form.email,
          enteredOTP: form.enteredOTP,
          newPW: form.newPW,
        };
        let res = await postAPI("auth/updateNewPw", payload, null);
        if (res.status) {
          toast.success(res.message);
          setForm({
            email: "",
            enteredOTP: "",
            newPW: "",
            confirmPW: "",
          });
          navigate("/");
        } else {
          toast.error("Failed to send email. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(`User input - ${name}: ${value}`);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <div style={containerStyle}>
        <a href="/" className="logo-link">
          <img className="logo-image" alt="Logo" src={logo} />
        </a>

        {pageNum === 2 ? (
          <div className="resetcontent">
            <button className="close" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </button>
            <form onSubmit={handleNewPw}>
              <h1 className="reset-heading">Create Your New Password</h1>
              <br />
              <input
                type="text"
                name="otp"
                placeholder="Enter your password"
                className="form-control"
                value={form?.newPW}
                onChange={(e) => setForm({ ...form, newPW: e.target.value })}
              />
              <br />

              <input
                type="text"
                name="otp"
                placeholder="Confirm your password"
                className="form-control"
                value={form?.confirmPW}
                onChange={(e) =>
                  setForm({ ...form, confirmPW: e.target.value })
                }
              />
              <br />
              <input type="submit" value="Verify" />
            </form>
          </div>
        ) : pageNum === 1 ? (
          <>
            <div className="resetcontent">
              <button className="close" onClick={handleClose}>
                <i className="fas fa-times"></i>
              </button>
              <form onSubmit={handleVerify}>
                <h1 className="reset-heading">Verify your Email</h1>
                <br />
                <label htmlFor="vendor-login">
                  <strong>Enter OTP</strong>
                </label>
                <br />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="form-control"
                  value={form?.enteredOTP}
                  onChange={(e) =>
                    setForm({ ...form, enteredOTP: e.target.value })
                  }
                />
                <br />
                <input type="submit" value="Verify" />
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="resetcontent">
              <button className="close" onClick={handleClose}>
                <i className="fas fa-times"></i>
              </button>
              <form onSubmit={handleNext}>
                <h1 className="reset-heading">Reset your password</h1>
                <div className="mb-3">
                  <label htmlFor="vendor-login">
                    <strong>Enter your Email</strong>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email..."
                    value={form?.email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <input type="submit" value="Next" />
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Otppage;

//  Notes:-

// import React from "react";
// function Otppage() {
//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="otpContent">
//               <form action="#">
//                 <h1>Enter OTP</h1>
//                 <p>Check your Mobile for the OTP</p>

//                 <input type="text" id="otp" placeholder="" />
//                 <br />
//                 <input type="submit" />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Forget password */}

//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="password_verification">
//               <form className="create_pass">
//                 <div className="pass">
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Create Password"
//                     className="new_pas"
//                   />
//                 </div>

//                 <div className="pass">
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Confirm Password"
//                     className="conf_pas"
//                     required
//                   />
//                 </div>

//                 <p>Use atleast 8 character</p>
//                 <button type="submit" className="Check_btn">
//                   Check
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Email Verification */}
//       {/* <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="email_content">
//               <h1>Reset your password</h1>
//               <form action="#">
//                 <div className="email_content_form">
//                   <h1>Email Address</h1>
//                   <p>Please write your email</p>
//                 </div>

//                 <input type="text" id="otp" placeholder="" />
//                 <br />
//                 <button
//                   type="submit"
//                   style={{
//                     marginTop: "18px",
//                     padding: "10px 43px",
//                     marginBottom: "37px",
//                     backgroundColor: "rgb(61 71 237 / 87%)",
//                     color: "#fff",
//                     borderRadius: "5px",
//                     border: "none",
//                     cursor: "pointer",
//                     fontSize: "21px",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.backgroundColor = "rgb(10 15 89 / 87%)")
//                   } // Change background color on hover
//                   onMouseOut={(e) =>
//                     (e.target.style.backgroundColor = "rgb(61 71 237 / 87%)")
//                   }
//                 >
//                   Send Verification Code
//                 </button>
//                 <br />
//                 <button
//                   type="submit"
//                   name="cont"
//                   style={{
//                     padding: "10px 43px",
//                     backgroundColor: "rgb(19 129 43 / 88%)",
//                     color: "#fff",
//                     borderRadius: "5px",
//                     border: "none",
//                     cursor: "pointer",
//                     marginRight: "228px",
//                     fontSize: "21px",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.backgroundColor = "#11752b")
//                   } // Change background color on hover
//                   onMouseOut={(e) =>
//                     (e.target.style.backgroundColor = "rgb(19 129 43 / 88%)")
//                   }
//                 >
//                   Continue
//                 </button>
//                 <button
//                   type="submit"
//                   className="button_cancel"
//                   style={{
//                     padding: "10px 43px",
//                     backgroundColor: "#ff6347",
//                     color: "#fff",
//                     borderRadius: "5px",
//                     border: "none",
//                     cursor: "pointer",
//                     fontSize: "21px",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.backgroundColor = "#d9534f")
//                   }
//                   onMouseOut={(e) =>
//                     (e.target.style.backgroundColor = "#ff6347")
//                   }
//                 >
//                   Cancel
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// export default Otppage;

// another page

// import React from "react";
// import logo from "../Images/logo.gif";

// import backgroundImage from "../Images/Background Images.jpg";
// import { useNavigate } from "react-router-dom";

// function Signin() {
//   // const navigate = useNavigate();

//   const containerStyle = {
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundColor: "red",
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat",
//     minHeight: "100vh",
//   };
//   const handleClose = () => {
//     // Navigate to the dashboard page
//     // navigate("/dashboard");
//     console.log("hello");
//   };

//   return (
//     <div>
//       <div>
//         <div style={containerStyle}>
//           <a href className="logo-link">
//             <img className="logo-image" alt="Logo" src={logo} />
//           </a>

//           <h1 className="reset-heading">Reset your password</h1>
//           <br></br>

//           <div className="resetcontent">
//             <button className="close" onClick={handleClose}>
//               <i className="fas fa-times"></i>
//             </button>

//             <form action="#">
//               <label htmlFor="vendor-login">
//                 <strong>Enter your Email</strong>
//               </label>
//               <br />
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="email"
//                 value="vendorLogin"
//                 className="reset-input-field"
//               />
//               <br />
//               {/* className="next-button" */}
//               <input type="submit" value="Next" />
//             </form>
//           </div>
//         </div>
//         {/*end::Authentication - Sign-in*/}
//       </div>
//     </div>
//   );
// }

// export default Signin;
