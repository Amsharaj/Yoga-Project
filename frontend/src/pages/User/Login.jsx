import React, { useState } from 'react'
import { AiTwotoneMail } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { FadeLoader } from 'react-spinners';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import { useTitle } from '../../hooks/useTitle';
const Login = () => {
  useTitle('Login | Yoga Website - Unleashed Your Inner Self')
  const [showpassword, setshowPassword] = useState(false)
  const location = useLocation()
  const { login, error, setError, loader, setLoader } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    setError('')
    e.preventDefault()

    const data = new FormData(e.target)
    const formData = Object.fromEntries(data)
    // console.log(formData)
    login(formData.email, formData.password).then(() => {
      // alert("login successfully")
      navigate(location.state?.from || '/dashboard')
    }).catch((err) => {
      setError(err.code);
      setLoader(false);
    })
  }
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Get Started Today</h1>
      <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>Explore pur comprehensive library of courses,meticulously crafted to cater to all levels of expertise.</p>
      <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <p className='text-center text-red-400 text-lg font-medium'>Sign in to your Account</p>
          {error && <p className="text-center text-red-400 text-sm font-medium">{error}</p>}
          {loader && <div className='flex justify-center'><FadeLoader color="#FF1949" /></div>}
          <div>
            <label htmlFor='email' className='sr-only'>Email</label>
            <div className='relative'>
              <input type='email' name='email' placeholder='Enter Email' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12ctext-sm shadow-sm'></input>
              <span className='absolute inset-y-0 end-0 grid place-content-center px-4 '><AiTwotoneMail className='h-6 w-6 text-gray-400' /></span>
            </div>
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>Password </label>
            <div className='relative'>
              <input type={showpassword ? 'text' : 'password'} name='password' placeholder='Enter Password' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12ctext-sm shadow-sm'></input>
              <span onClick={() => setshowPassword(!showpassword)} className='absolute inset-y-0 end-0 grid place-content-center px-4 '><FaRegEye className='h-6 w-6 text-gray-400' /></span>
            </div>
          </div>
          <button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white'>Sign in</button>
          <p className='text-center text-sm text-gray-500'>No account ? <Link className='underline text-secondary' to='/register'>Sign Up</Link></p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  )
}

export default Login