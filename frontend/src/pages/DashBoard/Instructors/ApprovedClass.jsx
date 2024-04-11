import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUser from '../../../hooks/useUsers';
import { Fade, Slide } from "react-awesome-reveal";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ApprovedClass = () => {
    const [approvedClasses, setApprovedClasses] = useState([]);
    const { currentUser, isLoading } = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/classes/${currentUser?.email}`)
            .then(res => {
                const approved = res.data.filter(cls => cls.status === 'approved');
                setApprovedClasses(approved);
            })
            .catch(err => console.log(err))
    }, [isLoading]);

    return (
        <div>
            <div className="my-9">
                <h1 className='text-4xl font-bold text-center '>My <span className='text-secondary'>Approved Classes</span></h1>
                <div className="text-center">
                    <Fade duration={100} className='text-[12px]  text-center' cascade>Here you can see how many classes Approved by admin</Fade>
                </div>

                <div className="">
                    {
                        approvedClasses.length === 0 ? <div className='text-center text-2xl font-bold mt-10'>You have not Approved any class yet</div> :
                            <div className="mt-9">
                                {
                                    approvedClasses.map((cls, index) => (
                                        <Slide duration={1000} key={index} className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'>
                                            <div className="bg-white flex  rounded-lg gap-8  shadow p-4">
                                                <div className="">
                                                    <img className='max-h-[200px] max-w-[300px]' src={cls.image} alt="" />
                                                </div>
                                                <div className="w-full">
                                                    <h1 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h1>
                                                    <div className="flex gap-5">
                                                        <div className="w-full">
                                                            <h1 className='font-bold mb-3'>Some Info : </h1>
                                                            <h1 className='text-secondary my-2'><span className='text-black '>Total Student</span> : {cls.totalEnrolled ? cls.totalEnrolled : 0}</h1>
                                                            <h1 className='text-secondary'><span className='text-black '>Total Seats</span> : {cls.availableSeats}</h1>
                                                            <h1 className='text-secondary my-2'><span className='text-black '>Status</span> : <span className={`font-bold ${cls.status === 'pending' ? 'text-orange-400' : cls.status === 'checking' ? 'text-yellow-300' : cls.status === 'approved' ? 'text-green-500' : 'text-red-600'}`}>{cls.status}</span></h1>
                                                        </div>
                                                        <div className="">
                                                            <h1 className='font-bold mb-3'>{cls.description}</h1>
                                                            <h1 className='text-secondary my-2'><span className='text-black '>Price</span> : {cls.price} <span className='text-black'>₹</span></h1>
                                                            <h1 className='text-secondary my-2'><span className='text-black '>Submitted</span> : <span className=''>{cls.submitted ? moment(cls.submitted).format('MMMM Do YYYY') : 'Not Get Data'}</span></h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slide>
                                    ))}
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ApprovedClass;
