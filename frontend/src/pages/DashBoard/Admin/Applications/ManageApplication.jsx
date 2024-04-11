import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { FcDeleteDatabase } from 'react-icons/fc';
import { GrUpdate } from 'react-icons/gr';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';

const ManageApplications = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / 5);


  useEffect(() => {
    axiosFetch.get('/manage-applications')
      .then(res => setClasses(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    if (lastIndex > classes.length) {
      lastIndex = classes.length;
    }
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, totalPage])


  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0000', // Set the primary color
      },
      secondary: {
        main: '#00ff00', // Set the secondary color
      },
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reject it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/delete-application/${id}`)
            .then(res => { 
                console.log(res.data)
                
            })
            .catch(err => console.log(err))


        }
    })
}





  const handleChange = (event, value) => setPage(value);
  return (
    <div>
      <h1 className='text-4xl text-secondary font-bold text-center my-10'>Manage <span className='text-black'>Application</span></h1>


      <div className="">

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">USER NAME</th>
                      <th scope="col" className="px-6 py-4">EMAIL</th>
                      <th scope="col" className="px-6 py-4">EXPREIENCE</th>
                      <th scope="col" className="px-6 py-4">STATUS</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      classes.length == 0 ? <tr><td colSpan='6' className='text-center text-2xl font-bold'>No Application Found</td></tr> :
                        paginatedData.map((cls, idx) => <tr
                          key={cls._id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                          <td className="whitespace-pre-wrap px-6 py-4">{cls.name}</td>
                          <td className="whitespace-pre-wrap px-6 py-4">{cls.email}</td>
                          <td className="whitespace-nowrap px-6 py-4">{cls.experience}</td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">

                              <span onClick={() => navigate(`/dashboard/manage-users`)} className='inline-flex items-center gap-2 cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white'>Update </span>


                              <span onClick={() => handleDelete(cls._id)} className='inline-flex items-center gap-2 cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white'>Reject</span>

                            </div>
                          </td>

                        </tr>)
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <div className="w-full h-full flex justify-center items-center my-10">
            <Pagination onChange={handleChange} count={totalPage} color="primary" />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ManageApplications;