import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const SignIn = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  // Handle Email & Password Signup
  const onSubmit = async (data) => {
    setFirebaseError(""); // Reset previous errors
    try {
      await createUser(data.email, data.password);
      alert(`Welcome, ${data.name}!`);
      reset();
      navigate("/login"); // Redirect after signup
    } 
    catch (error) {
      setFirebaseError(error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    setFirebaseError("");
    try {
      await googleSignIn();
      navigate("/"); // Redirect on success
    } 
    catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div className="hero bg-white min-h-screen flex justify-center items-center">
      <div className="hero-content flex-col lg:flex-row w-full max-w-xl lg:max-w-2xl">
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-4xl font-bold uppercase text-black">Sign Up</h1>
        </div>
        <div className="card bg-white w-full shadow-2xl p-8 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered bg-white w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered bg-white w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered bg-white w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Display Firebase Authentication Errors */}
            {firebaseError && (
              <p className="text-red-500 text-sm">{firebaseError}</p>
            )}

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn bg-black text-white w-full hover:bg-gray-800 transition"
              >
                Sign Up
              </button>
            </div>
            <div>
              <span className="label-text-alt text-black">
                Already have an account?
              </span>
              <Link
                to={"/login"}
                className="label-text-alt link link-hover text-blue-700"
              >
                {" "}
                Login
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="divider text-gray-500">OR</div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleLogin}
            className="btn bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
