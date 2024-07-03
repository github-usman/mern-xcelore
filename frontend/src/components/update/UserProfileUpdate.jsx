import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axios.config.js';
import { fetchUserProfile } from '../../store/actions/authActions.js';

const UserProfileUpdate = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

  const { first_name, last_name, email } = formData;
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

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
  
      await axiosInstance.put('/user/me',formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success('Profile Updated Successfully!');
      navigate('/user/profile');
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
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center mt-5">
      <div className='container card p-5'>
      <h2>Update Profile</h2>
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
        <button type="submit" className="btn btn-primary px-5 mt-5">Update</button>
      </form>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
