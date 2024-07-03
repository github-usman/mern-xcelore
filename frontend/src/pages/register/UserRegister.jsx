// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import {baseUrl} from '../../config/env.config.js';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { TiTick } from 'react-icons/ti';


const UserRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [backendError,setBackendError] = useState();

  const { first_name, last_name, email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/user/register`, formData);
      toast.success('Registration Completed Successfully!');
      const { token } = await response.data;
      if (token) {
         Cookies.set('token', token, { expires: 5 }); 
      }
      navigate('/user/profile');
    } catch (error) {
      const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Login failed. Please try again.';
        setBackendError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className='container card p-5'>
      <h2>Register</h2>
      {backendError && <div className="alert alert-danger">{backendError}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={first_name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={last_name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <p className='text-primary mt-3 d-flex align-items-center'><TiTick color={'green'} size={20}/> Accept terms and conditions</p>
        <button type="submit" className="btn btn-primary mt-5 px-5">Register</button>
        <Link to={"/user/login"} className="btn btn-outline-primary btn-block mt-5 ms-5 px-5">
                  Sign In
                </Link>
      </form>
    </div>
    </div>
  );
};

export default UserRegister;
