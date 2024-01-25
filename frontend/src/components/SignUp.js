import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginAlert from "./Alert";


function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const Register = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/api/register', {
      email,
      password,
      confirmPassword
    }, {
      withCredentials: true
    })
      .then(() => {
        setShowAlert(true)
        setEmail('')
        setPassword('')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMsg(error.response.data.msg);
        }
      })
  }

  return <div>
    <section className="bg-white">
      {showAlert && <LoginAlert text1="Congratulations!" text2="Your account has been successfully created" />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-grauu-700">
              Sign Up to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={Register}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Password</label>
                <input type="password" name="password" id="password" s placeholder="••••••••" className="bg-gray-50 outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
              {errorMsg && (
                <div className="alert alert-danger">
                  {errorMsg}
                </div>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-700">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:dark:bg-slate-50">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>;
}

export default Signup;
