import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginAlert from "./Alert";

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    const Login = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3001/api/login', {
                email,
                password,
            }, {
                withCredentials: true
            });

            const token = res.data.accessToken;
            setEmail('');
            setPassword('');
            setShowAlert(true)
            setTimeout(() => {
                navigate('/');
                window.location.reload();
                localStorage.setItem('email', email);
                localStorage.setItem('token', token);
            }, 2000)
        } catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data.msg);
            }
            console.log(error)
        }
    };

    return <div>
        <section className="bg-white">
            {showAlert && <LoginAlert />}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-700">
                            Login to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={Login}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Your email</label>
                                <input type="email" id="email" className="bg-primary-50 outline-primary-700 border border-primary-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required=""
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Password</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 outline-primary-700 border border-primary-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="flex items-center">
                                <a href="/forgotpass" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            {errorMsg && (
                                <div className="alert alert-danger">
                                    {errorMsg}
                                </div>
                            )}
                            <p className="text-sm font-light text-gray-200 dark:text-gray-700">
                                Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:dark:bg-slate-50">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>;
}

export default Login;
