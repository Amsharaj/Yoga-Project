import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import { AiFillLinkedin} from "react-icons/ai";
import { FaInstagramSquare ,FaFacebook} from "react-icons/fa";

import img from '../../../assets/homein/girl.jpg'
const PopularTeacher = () => {
    const [instructors, setInstructors] = useState([])
    const axiosFecth = useAxiosFetch()
    useEffect(() => {
        axiosFecth.get('/popular-instructors').then((data) => {
            setInstructors(data.data)
        }).catch((err) => { console.log(err) })
    }, [])

    // console.log(instructors)
    return (
        <div className='md:w-[80%] mx-auto my-36 '>
            <div>
                <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Best</span> Instructors</h1>
                <div className='w-[40%] text-center mx-auto my-4'>
                    <p className='text-gray-500 '>Explore our Popular Classes. Here is some popular classes based
                        on How many student enrolled</p>
                </div>
            </div>

            {
                instructors ? <>

                    <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-6 mx-auto'>
                        {
                            instructors ?.slice(0,4).map((instructor, i) => (
                                <div key={i} className='flex dark:text-white cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary'>
                                
                                    <div className='flex-col flex gap-6 md:gap-8'>
                                        <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' 
                                        src={instructor?.instructor?.photoUrl || `${img}`} alt="" />
                                        <div className='flex flex-col text-center'>
                                            <p className='font-medium text-lg dark:text-white text-gray-800'>{instructor?.instructor?.name}</p>
                                            <p className='text-gray-500 whitespace-nowrap'>Instructor</p>
                                            <p className='text-gray-500 mb-4 whitespace-nowrap'>Total Students: {instructor?.totalEnrolled}</p>
                                            <div className='grid grid-cols-3 w-[70%] gap-4 items-center mx-auto justify-items-center text-secondary '><AiFillLinkedin/><FaFacebook/><FaInstagramSquare/></div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </> : <><p>No Instructor Available</p></>
            }
             
        </div>

    )
}


export default PopularTeacher