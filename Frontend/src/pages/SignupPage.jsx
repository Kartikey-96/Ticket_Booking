import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/Api";

const SignupPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    name: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password too short")
      .max(100, "Password too big."),
    name: Yup.string().required("Name is required"),
  });

  const handleSubmit = async (values) => {
    // Handle form submission here
    try {
      const response = await axios.post(`${BASE_URL}user/signup/`, values);
      if (response.status === 201) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary p-2 sm:p-0">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              <ErrorMessage
                name="email"
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
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-gray-700">
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
