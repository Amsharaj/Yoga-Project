import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { Auth } from '../../config/firebase.config'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import axios from 'axios'

export const AuthContext=createContext()

const AuthProviders = ({children}) => {
    const [user,setUser]=useState(null)
    const [loader,setLoader]=useState(true)
    const [error,setError]=useState('')
    
    //signup new user

    const signUp=async(email,password)=>{
        try{
            setLoader(true)
            return await createUserWithEmailAndPassword(Auth,email,password)
        }catch(error){
            setError(error.code)
            throw error
        }
    }

    //login user
    const login =async(email,password)=>{
        try{
            setLoader(true)
            return await signInWithEmailAndPassword(Auth,email,password)

        }catch(error){
            setError(error.code)
            throw error
        }
    }

    //logout user
    const logout=async()=>{
        try {
            return await signOut(Auth)
        } catch (error) {
            setError(error.code)
            throw error
        }
    }
    //update user profile

    const updateUser=async(name,photo)=>{
        try {
            await updateProfile(Auth.currentUser,{
                displayName: name, photoURL:photo
            })
            setUser(Auth.currentUser)
        } catch (error) {
            setError(error.code)
            throw error
        }
    } 

    //google Login
    const googleprovider=new GoogleAuthProvider()
    const googleLogin =async()=>{
        try {
            setLoader(true)
           return await signInWithPopup(Auth,googleprovider)
        } catch (error) {
            setError(error.code)
            throw error
        }
    }

    //observe for users

    useEffect(()=>{
        const unsubscribe=Auth.onAuthStateChanged((user)=>{
            setUser(user)
            if(user){
                axios.post('http://localhost:5000/api/set-token',{email:user.email,name:user.displayName})
                .then((data)=>{
                    if(data.data.token){
                        localStorage.setItem('token',data.data.token )
                        setLoader(false)
                    }
                })
            }else{
                localStorage.removeItem('token')
                setLoader(false)
            }
        })
        return()=>unsubscribe()
    },[])

    const contextvalue={user,signUp,login,logout,updateUser,googleLogin,error,setError,loader,setLoader}
  return (
    <AuthContext.Provider value={contextvalue}>
        {children}
    </AuthContext.Provider>
  )
} 

export default AuthProviders