import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { FaRegImage, FaRegUser, FaPhoneSquareAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
//import { GoogleAuthProvider } from 'firebase/auth';
import { useTitle } from '../../hooks/useTitle';
import GoogleLogin from '../../components/Social/GoogleLogin';
import { AuthContext } from '../../utilities/Providers/AuthProviders';
import axios from 'axios';
const Register = () => {
    useTitle('Register | Yoga Website - Unleashed Your Inner Self');
    const navigate = useNavigate()
    const { signUp, error, updateUser, setError } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        signUp(data.email, data.password).then((result) => {
            const user = result.user
            if (user) {
                return updateUser(data.name, data.photoUrl).then(() => {
                    const userImp = {
                        name: user?.displayName,
                        email: user?.email,
                        photoUrl: user?.photoURL,
                        gender: data.gender,
                        address: data.address,
                        role: 'user',
                        phone: data.phone,
                    }
                    if (user.email && user.displayName) {
                        return axios
                            .post('http://localhost:5000/new-user', userImp)
                            .then(() => {
                                navigate('/');
                                return 'Registration successful!';
                            })
                            .catch((err) => {
                                throw new Error(err);
                            });
                    }
                }).catch((err) => {
                    setError(err.code);
                    throw new Error(err);
                })
            }
        })

    }
    // console.log(password)
    const password = watch('password', '')

    return (
        <div className='flex justify-center items-center pt-14 bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-3xl font-bold text-center mb-6 text-secondary'>Please Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                                <FaRegUser className='inline-block mr-2 mb-1 text-lg' />
                                Name
                            </label>
                            <input type='text' placeholder='Enter your Name' {...register("name", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                            </input>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                                <MdOutlineMailOutline className='inline-block mr-2 mb-1 text-lg' />
                                Email
                            </label>
                            <input type='email' placeholder='Enter your Email' {...register("email", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                            </input>
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
                                <RiLockPasswordLine className='inline-block mr-2 mb-1 text-lg' />
                                Password
                            </label>
                            <input type='password'
                                placeholder='Enter Password'
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                })}
                                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                            </input>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='confirmpassword' className='block text-gray-700 font-bold mb-2'>
                                <RiLockPasswordFill className='inline-block mr-2 mb-1 text-lg' />
                                Confirm Password
                            </label>
                            <input type='password' placeholder='Enter Confirm Password'
                                {...register("confirmpassword", {
                                    required: true,
                                    validate: (value) => value === password || "password not match"
                                })}

                                className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300'>
                            </input>
                            {errors.confirmPassword && (
                                <div className="text-red-500 text-sm w-full mt-1">
                                    <p>{errors.confirmPassword.message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor='phoneNumber' className='block text-gray-700 font-bold mb-2'>
                                <FaPhoneSquareAlt className='inline-block mr-2 mb-1 text-lg ' />
                                Phone Number
                            </label>
                            <input type='tel' placeholder='Enter PhoneNumber' {...register("phone", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                            </input>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='photoURL' className='block text-gray-700 font-bold mb-2'>
                                <FaRegImage className='inline-block mr-2 mb-1 text-lg' />
                                Photo URL
                            </label>
                            <input type='text' placeholder='Enter Photo URL' {...register("photoUrl")} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                            </input>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='gender' className='block text-gray-700 font-bold mb-2'>
                            <FaRegUser className='inline-block mr-2 mb-1 text-lg' />
                            Gender
                        </label>
                        <select {...register("gender", { required: true })} className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='address' className='block text-gray-700 font-bold mb-2'>
                            <IoLocationOutline className='inline-block mr-2 mb-1 text-lg' />
                            Address
                        </label>
                        <textarea {...register("address", { required: true })}
                            rows='3' placeholder='Enter Address' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>

                        </textarea>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='bg-secondary
                            hover:bg-red-500 text-white py-2 px-4 rounded-md'>Register</button>
                        {
                            errors.password && (
                                <div className="text-red-500 text-sm w-full mt-1">
                                    <p>Password must be at least 6 characters long, contain a <br /> capital letter, and a special character.</p>
                                </div>)
                        }

                    </div>
                </form>
                <p className='text-center mt-4 text-sm text-gray-500'>Already Have an account?<Link className='underline text-secondary' to='/login'>Login</Link></p>
                <GoogleLogin />
            </div>
        </div>
    )
}

export default Register