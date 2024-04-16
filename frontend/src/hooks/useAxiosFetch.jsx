import React, { useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://yoga-project.onrender.com/',
  });

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {

      return config;
    }, function (error) {

      return Promise.reject(error);
    });

    const responseInterceptor = axios.interceptors.response.use((response) => {

      return response;
    }, function (error) {

      return Promise.reject(error);
    });

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.request.eject(responseInterceptor)
    }
  }, [axiosInstance])


  return (
    axiosInstance
  )
}

export default useAxiosFetch