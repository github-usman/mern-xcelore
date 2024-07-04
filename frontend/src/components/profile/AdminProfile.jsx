import axios from "axios";
import React, { useEffect } from "react";
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaEnvelope, FaUser, FaUserTag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/env.config";
import { fetchUserProfile } from "../../store/actions/authActions";

const AdminProfile   = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const  auth = useSelector((state) => state.auth);

  useEffect(() => {

    dispatch(fetchUserProfile());
  }, [dispatch]);

  // delete cookie function
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

  if (loading) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="container card">
        <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
          <h1 className="mb-0">
            <FaUser /> Profile
          </h1>
          <div className="text-center">
            <button className="btn btn-danger ms-3 px-5 " onClick={logOutButton}>Log Out</button>
          </div>
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
            <div>
      
            </div>
          </div>
        
          <Link to="/admin/all-user">
              <button className="border border-2 border-success btn btn-outline-success w-100 mt-5" style={{fontWeight:'900',fontSize:"22px"}}>Check List Of Users</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
