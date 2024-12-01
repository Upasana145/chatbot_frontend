import React from "react";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../redux/slices/authSlice"
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { initialProjectTypeHandler } from "../../redux/slices/projectSlice";

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const logoutFun = () => {
    dispatch(logoutHandler());
  };

  const navigate = useNavigate();
  const sureToDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Log Out?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Nope!", "Yes!"],
    }).then(async (willDelete) => {
      if (willDelete) {
        await logout();
      }
    });
  };
  const logout = () => {
    dispatch(logoutHandler());
    dispatch(initialProjectTypeHandler());
    navigate("/");
  };
  return (
    <>
      <div className="header align-items-stretch shadow">
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
            <div className="d-flex align-items-stretch">
              <div className="header-menu align-items-stretch">
                <div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch">
                  <div className="menu-item here show menu-lg-down-accordion me-lg-1">
                    <span className="menu-link py-3">
                      <span className="menu-title">{title}</span>
                      <span className="menu-arrow d-lg-none"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="menu_link">
            <ul>
              <li>
                <button onClick={sureToDelete}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
