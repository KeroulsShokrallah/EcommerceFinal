import React, { useContext, useState } from "react";
import style from "./UpdatePassword.module.css"
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from './../../Context/UserContext';

export default function UpdatePassword() {
  let {userLogin,setuserLogin} =useContext(UserContext)
  let navigate = useNavigate();

  const [Apierror, setApierror] = useState("");
  const [Isloading, setIsloading] = useState(false);

  async function handleNewPassword(values) {
    console.log(values);
    setIsloading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((res) => {
        setIsloading(false);
        console.log(res.status);
        if (res.status == "200") {
          // localStorage.setItem("userToken", res.data.token);
          // setuserLogin(res.data.token)
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res.response.data.message);
        setIsloading(false);
        setApierror(res.response.data.message);
      });
  }

  let myValidation = yup.object().shape({
  

    email: yup.string().required("email is required").email("E-mail not valid"),

    password: yup
      .string()
      .required("password is required")
      .min(6, "min length is 6"),


  });

  let formik = useFormik({
    initialValues: {

      email: "",
      newPassword: "",
 
    },

    // // validate: myValidation,
    // validationSchema: myValidation,
    onSubmit: handleNewPassword,
  });

  return (
    <>
      {Apierror ? (
        <div className="bg-red-200 font-bold text-xl p-3 text-center w-1/2 mx-auto text-red-800 rounded-lg mt-7">
          {Apierror}
        </div>
      ) : null}
      <div className="text-center text-emerald-600 font-bold text-xl my-5">
        <h3>Update Password</h3>
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">


        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-0"
          >
            Enter Your Email
          </label>

          {formik.errors.email && formik.touched.email ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium"> {formik.errors.email}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-0"
          >
            Enter Your New  Password
          </label>

          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium"> {formik.errors.newPassword}</span>
              </div>
            </div>
          ) : null}
        </div>

   

<div className="flex gap-4 items-center">
<button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {Isloading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verify"}
        </button>
       
</div>

      </form>
    </>
  );
}
