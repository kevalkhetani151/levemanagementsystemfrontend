"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import RegisterUser from "./signup";


const UserForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "employee", // Default value
      departmentId: "",
      designation: "",
      hire_date: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Form data submitted:", data);
    try {
        const response = await RegisterUser({
            ...data,
            departmentId:parseInt(data.departmentId)
        });
        console.log("Login response:", response);
  
        if (response.error) {
          // Handle errors returned from the server
          toast.error(response.error, { position: 'top-center' });
          return;
        }
  
        if (response?.data?.status === "error") {
          // Display error message from the API
          toast.error(response?.data?.message, { position: 'top-center' });
        //   setTimeout(() => router.push("login"), 3000);
        } else {
          toast.success(response?.message || "Login successful!", { position: 'top-center' });
          localStorage.setItem("token", response?.data?.token);
          
          // Redirect user to the home page after successful login
        //   setTimeout(() => router.push("home"), 3000);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred. Please try again.", { position: 'top-center' });
      }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">User Form</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* First Name */}
                  <div>
                    <input
                      id="first_name"
                      type="text"
                      placeholder="First Name"
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Last Name"
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <select
                      id="role"
                      {...register("role", {
                        required: "Role is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                    {errors.role && (
                      <p className="text-red-500 text-sm">{errors.role.message}</p>
                    )}
                  </div>

                  {/* Department ID */}
                  <div>
                    <input
                      id="departmentId"
                      type="number"
                      placeholder="Department ID"
                      {...register("departmentId", {
                        required: "Department ID is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    {errors.departmentId && (
                      <p className="text-red-500 text-sm">
                        {errors.departmentId.message}
                      </p>
                    )}
                  </div>

                  {/* Designation */}
                  <div>
                    <input
                      id="designation"
                      type="text"
                      placeholder="Designation"
                      {...register("designation", {
                        required: "Designation is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    {errors.designation && (
                      <p className="text-red-500 text-sm">
                        {errors.designation.message}
                      </p>
                    )}
                  </div>

                  {/* Hire Date */}
                  <div>
  <Controller
    name="hire_date"
    control={control}
    rules={{ required: "Hire date and time are required" }}
    render={({ field: { onChange, value, ...field } }) => (
      <input
        id="hire_date"
        type="datetime-local"
        {...field}
        value={value ? new Date(value).toISOString().slice(0, 16) : ""}
        onChange={(e) => {
          const datetimeLocalValue = e.target.value; // Get the datetime-local value
          // Convert to ISO 8601 UTC format
          const utcDatetime = new Date(datetimeLocalValue).toISOString();
          onChange(utcDatetime); // Pass the formatted value to the field
        }}
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
      />
    )}
  />
  {errors.hire_date && (
    <p className="text-red-500 text-sm">
      {errors.hire_date.message}
    </p>
  )}
</div>


                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserForm;
