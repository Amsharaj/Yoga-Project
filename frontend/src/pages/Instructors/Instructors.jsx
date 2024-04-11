import React, { useEffect, useState } from 'react'


import img from '../../assets/homein/girl.jpg'
import useAxiosFetch from '../../hooks/useAxiosFetch'
const Instructors = () => {
  const [instructors, setInstructors] = useState([])
    const axiosFecth = useAxiosFetch()
    useEffect(() => {
        axiosFecth.get('/instructors').then((data) => {
            setInstructors(data.data)
        }).catch((err) => { console.log(err) })
    }, [])

    console.log(instructors)
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
                    <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-9 mx-auto mt-20'>
                        {
                            instructors ?.map((instructor, i) => (
                                <div className='flex dark:text-white hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary
                                cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md'>
                                    <div className='flex-col flex gap-8 md:gap-8'>
                                        <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' 
                                        src={instructor?.photoUrl || `${img}`} alt="" />
                                        <div className='flex flex-col text-center'>
                                            <p className='font-medium text-lg dark:text-white text-gray-800'>{instructor?.name}</p>
                                            <p className='text-gray-500 mb-4'>Instructor</p>
                                            <p className='text-gray-500 mb-2'>Address: {instructor?.address}</p>
                                            <p className='text-gray-500 mb-2'>Phone: {instructor?.phone}</p>
                                            <p className='text-gray-500 mb-2'>Email: {instructor?.email}</p>
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

export default Instructors