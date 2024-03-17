
import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react'
import { auth } from '../../utils/api';
import { removeToken } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user,setUser]=useState('')
// const navigate=useNavigate()
useEffect(()=>{
    auth().then((res)=>{setUser(res?.userId)})
  },[user])
 
  return (
    <AuthContext.Provider
      value={
        {
          user,setUser,
          
        }
      }
    >
      {children}
    </AuthContext.Provider>
  )
}