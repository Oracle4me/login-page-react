import React from 'react'
import PropTypes from 'prop-types';
import { FaCheck } from "react-icons/fa6";
const Alert = ({ text1, text2 }) => {
  return (
    <div className=' overflow-hidden absolute top-6 right-7 rounded-l-[9px] bg-white py-3 pr-9 pl-6 shadow-md border-l-[6px] border-solid border-[#4070f4]'>
      <div className='flex items-center'>
        <div className='mr-4 h-8 w-8 bg-[#4070f4] text-white rounded-full text-xs flex items-center justify-center'>
          <FaCheck className='text-center flex text-lg' />
        </div>
        <div className='flex flex-col mr-5'>
          <span className='text-lg font-medium text-[#333]'>{text1}</span>
          <span>{text2}</span>
        </div>
      </div>
      <div className='animated-bar'></div>
    </div >
  )
}

Alert.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
};

Alert.defaultProps = {
  text1: 'Welcome Back!',
  text2: 'You have successfully logged in',
};

export default Alert
