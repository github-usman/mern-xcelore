import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axios.config.js';

const UpdateUserProfile = ({ propUser, closePopup }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      first_name: propUser.first_name,
      last_name: propUser.last_name,
      email: propUser.email,
    });
  }, [propUser]);

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

      await axiosInstance.put(`admin/user/${propUser._id}`, formData, {
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
          : 'Update failed. Please try again.';
      setBackendError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center mt-5">
      <div className='container card p-5'>
        <div className='d-flex justify-content-between'>
          <h2>Update Profile</h2>
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
              value={formData.first_name}
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
              value={formData.last_name}
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
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
          <button type='submit' className="btn btn-warning d-flex align-items-center gap-3"><FaEdit /> Update User</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
