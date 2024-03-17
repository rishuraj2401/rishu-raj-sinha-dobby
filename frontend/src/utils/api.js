import axios from 'axios';
import { setToken } from './auth';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://rishu-raj-sinha-dobby.vercel.app/api';


export const auth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    console.log("initial", response.data);
    return response.data;
  } catch (error) {
    // alert("invalid input")

  }
};
export const signup = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
    setToken(response.data.token)
    return response.data;
  } catch (error) {
    alert("Already signed in! or invalid input !!!")
  }
};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, formData);
    setToken(response.data.token)
    console.log("response", response);
    return response.data;
  } catch (error) {
    // throw error.response.data;
    alert("User not found")

  }
};

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/images`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    });
    alert("uploaded")
    console.log("token", localStorage.getItem('token'));
  } catch (error) {
    console.log("token", localStorage.getItem('token'));

    console.log("error");
  }
};

export const getUserImages = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/images?name=${name}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    return error
  }
};
