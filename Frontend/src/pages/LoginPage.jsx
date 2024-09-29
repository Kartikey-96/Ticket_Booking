import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/Api";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(null);
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password too short")
      .max(100, "Password too big."),
  });

  const handleSubmit = async (values) => {
    // Handle form submission here
    try {
      const response = await axios.post(`${BASE_URL}user/login/`, values);
      if (response.status === 200) {
        localStorage.setItem("refresh_token", response?.data?.refresh_token);
        localStorage.setItem("access_token", response?.data?.access);
        localStorage.setItem(
          "access_token_exp",
          response?.data?.access_token_exp
        );
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setFailed(error?.response?.data?.non_field_errors?.[0]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary p-2 sm:p-0">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            {failed ? (
              <h3 className="pb-4 text-red-500 text-center font-semibold">
                {failed}
              </h3>
            ) : (
              <></>
            )}
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-gray-700">
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
