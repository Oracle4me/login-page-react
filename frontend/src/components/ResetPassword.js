import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginAlert from "./Alert";

function ResetPassword() {
  const [password, setPassword] = useState()
  const [errorMsg, setErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const { id, token } = useParams()
  const navigate = useNavigate()

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/reset_password/${id}/${token}`, { password })
        .then(() => {
          setShowAlert(true)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        })
    } catch (err) {
      console.log(err)
      setErrorMsg(err.res.data.Status)
    }
  }

  return <div>
    <section className="bg-white">
      {showAlert && <LoginAlert text1="Congratulations!" text2="Password change successful." />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-700">
              Reset your password?
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={ResetPassword}>
              <div>
                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">Your Password</label>
                <input type="Password" id="Password" className="bg-primary-50 outline-primary-700 border border-primary-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="......." required=""
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send</button>
              {errorMsg && (
                <div className="alert alert-success">
                  Your link password already send on your Password. Please check your Password
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>;
}

export default ResetPassword;
