import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Alert from "./Alert";

const Navbar = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    getUser()
  }, []);

  const getUser = () => {
    const email = localStorage.getItem('email');
    if (email) {
      setEmail(email);
    }
  }

  const LogOut = async () => {
    try {
      if (email) {
        setShowAlert(true)
        setTimeout(() => {
          localStorage.removeItem('email')
          localStorage.removeItem('token')
          window.location.reload()
        }, 2000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {showAlert && <Alert text1="Logout!" text2="You have successfully logged out!" />}
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-6 border">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">ProjectKevin</span>
          </a>
          {email && (
            <div className="flex items-center pr-12 ">
              <span className="text-black mr-3">{email}</span>
              <button onClick={LogOut} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Logout</button>
            </div>
          )}
          {!email && (
            <div className="flex items-center pr-12 ">
              <Link to="/login" className="mr-4 text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
              <button onClick={LogOut} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Logout</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar