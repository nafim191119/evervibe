import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
        setLoginError(""); // Clear previous errors
        try {
            await signIn(data.email, data.password);
            alert(`Welcome, ${data.email}!`);
            reset();
            navigate("/dashboard"); // Redirect to dashboard after login
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <div className="hero bg-white flex justify-center items-center min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-xl lg:max-w-2xl">
                <div className="text-center lg:text-left mb-6 lg:mb-0">
                    <h1 className="text-4xl font-bold uppercase text-black">Login Now!</h1>
                </div>
                <div className="card bg-white w-full shadow-2xl p-8 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                {...register("password", { required: "Password is required" })}
                                className="input input-bordered bg-white w-full"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Show Login Error */}
                        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

                        {/* Submit Button */}
                        <div className="form-control mt-4">
                            <button type="submit" className="btn bg-black text-white w-full hover:bg-gray-800 transition">
                                Login
                            </button>
                        </div>

                        {/* Signup Link */}
                        <div>
                            <span className="label-text-alt text-black">Don't have an account?</span>
                            <Link to={'/signup'} className="label-text-alt link link-hover text-blue-700"> SignUp</Link>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider text-gray-500">OR</div>

                    {/* Social Sign-In Buttons */}
                    <div className="flex flex-col space-y-3">
                        <button className="btn bg-red-500 text-white hover:bg-red-600 transition">
                            Sign in with Google
                        </button>
                        <button className="btn bg-gray-700 text-white hover:bg-gray-800 transition">
                            Sign in with GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
