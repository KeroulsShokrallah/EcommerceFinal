import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let Navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    Navigate("/login")
  }

  return (
    <>
      <nav className="bg-slate-300 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex gap-3 items-center">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                className="h-8"
                alt="freshcart Logo"
                width={"120px"}
              />
            </Link>

            {userLogin != null ? (
              <ul className="flex gap-3">
                <li className="text-slate-500">
                  <Link to="">Home</Link>
                </li>
                <li className="text-slate-500">
                  <Link to="cart">Cart</Link>
                </li>
                <li className="text-slate-500">
                  <Link to="products">Products</Link>
                </li>
                <li className="text-slate-500">
                  <Link to="categories">Categories</Link>
                </li>
                <li className="text-slate-500">
                  <Link to="brands">Brands</Link>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-4">
              <li>
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li>
                <i className="fa-brands fa-youtube"></i>
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
              </li>
            </ul>

            <ul className="flex gap-4">
              {userLogin != null ? (
                <span onClick={logout} className="cursor-pointer">Logout</span>
              ) : (
                <>
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
