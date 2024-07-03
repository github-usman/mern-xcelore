import axios from "axios";
import React, { useEffect } from "react";
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaEnvelope, FaUser, FaUserTag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axios.config";
import { baseUrl } from "../../config/env.config";
import { fetchUserProfile } from "../../store/actions/authActions";

const AdminProile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const  auth = useSelector((state) => state.auth);

  useEffect(() => {

    dispatch(fetchUserProfile());
  }, [dispatch]);

  const deleteCookie = (name) => {
    return new Promise((resolve) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      resolve();
    });
  };
  
  const logOutButton = async () => {
    try {
      await axios.post(`${baseUrl}/user/logout`);
      await deleteCookie('token');
      toast.success('Logged Out Successfully!');
      auth.user = null;
      navigate('/user/login');
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Logout failed. Please try again.';
            toast.error(errorMessage);
    }
  };
  const deleteProfileHandle = async () => {
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
  
      await axiosInstance.delete('/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile deleted Successfully!');
      auth.user = null;
      navigate('/user/login');
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Logout failed. Please try again.';
            toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="container card">
        <div className="card-header bg-primary text-white">
          <h1 className="mb-0">
            <FaUser /> Profile
          </h1>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3 text-center">
              <FaUser size={30} className="text-primary" />
            </div>
            <div className="col-md-9 text-center text-sm-start">
              <h2 className="text-primary">
                {user.first_name} {user.last_name}
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 text-center">
              <FaEnvelope size={30} className="text-danger" />
            </div>
            <div className="col-md-9 text-center text-sm-start">
              <p className="mb-0">
                <strong>Email Address : </strong>{" "}
                <span className="text-muted">{user.email}</span>
              </p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 text-center">
              <FaUserTag size={30} className="text-success" />
            </div>
            <div className="col-md-9 text-center text-sm-start">
              <p className="mb-0">
                <strong>Your Role : </strong>{" "}
                <span className="text-muted">{user.role.toUpperCase()}</span>
              </p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 text-center">
              <FaCalendarAlt size={30} className="text-warning" />
            </div>
            <div className="col-md-9 text-center text-sm-start">
              <p className="mb-0">
                <strong>Created At:</strong>{" "}
                <span className="text-muted">
                  {new Date(user.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/user/update">
              <button className="btn btn-primary mt-3">Update Your Profile</button>
            </Link>
            <button className="btn btn-danger ms-3 mt-3" onClick={logOutButton}>Log Out</button>
            <button className="btn btn-danger ms-3 mt-3" onClick={deleteProfileHandle}>Delete Your Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProile;
