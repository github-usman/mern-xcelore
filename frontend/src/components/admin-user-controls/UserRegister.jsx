// src/pages/RegisterPage.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';
import { axiosInstance } from '../../config/axios.config';


const UserRegister = ({closePopup}) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user', 
  });
  const [backendError,setBackendError] = useState();

  const { first_name, last_name, email, password,role } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };

      const token = getCookie('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      await axiosInstance.put(`admin/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Profile Updated Successfully!');
      closePopup();
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
    <div className="w-100 d-flex justify-content-center align-items-center">
      <div className='container card p-5'>
      <div className='d-flex justify-content-between'>
          <h2>Register New User</h2>
          <button className='btn btn-outline-danger' onClick={closePopup}>
            <RxCross1 size={25} />
          </button>
        </div>
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
        <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-control"
              id="role"
              name="role"
              value={role}
              onChange={onChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        <p className='text-primary mt-3 d-flex align-items-center'><TiTick color={'green'} size={20}/> Accept terms and conditions</p>
        <button className="btn btn-success d-flex align-items-center justify-content-between"  type='submit'>
          <p className="mb-0 me-2 flex-grow-1 text-start">Add New User</p>
          <FaPlusCircle size={20} />
        </button>
      </form>
    </div>
    </div>
  );
};

export default UserRegister;
