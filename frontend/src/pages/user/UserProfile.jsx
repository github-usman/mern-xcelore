import React, { useEffect } from "react";
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaEnvelope, FaUser, FaUserTag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConformationModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { logout } from "../../store/slices/authSlice";
import { openModal } from "../../store/slices/modalSlices";
import { deleteUserProfile, fetchProfile } from "../../store/thunks/authThunk";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        await dispatch(fetchProfile()).unwrap();
      } else {
        navigate('/login');
      }
    };

    fetchData().catch(console.error);
  }, [dispatch, isAuthenticated, navigate]);

  // logout handle
  const logOutButton = () => {
    dispatch(logout());
    navigate('/');
  };


  // delete handle
  const deleteProfile = async () => {
    try {
      await dispatch(deleteUserProfile()).unwrap();
      toast.success('Profile deleted Successfully!');
      navigate('/user/login');
    } catch (error) {
      const errorMessage = error || 'Delete profile failed. Please try again.';
      toast.error(errorMessage);
    }
  };


  if (!user) {
    return <div>No user data available.</div>;
  }
   
  
  const handleDeleteProfile = () => {
    dispatch(openModal({
      title: 'Confirm Deletion',
      body: `Are you sure you want to delete your Account?`,
      onConfirm: deleteProfile,
    }));
  };

  const handleLogOutButton = () => {
    dispatch(openModal({
      title: 'Confirm Logout',
      body: `Are you sure you want Log Out?`,
      onConfirm: logOutButton,
    }));
  };
  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className='container'>
        <div className="row justify-content-center ">
          <div className="card-body shadow rounded " style={{ backgroundColor: '#fff3d9', borderRadius: '5px', padding: '3rem 1rem', border: 'none' }}>
            <div className="card-title text-center shadow d-flex justify-content-between align-items-center rounded bg-warning  mb-3">
              <h3 className="ms-1 d-flex align-items-center gap-1">
                <FaUser /> Profile
              </h3>
              <button className="btn btn-danger ms-3 shadow" onClick={handleLogOutButton}>Log Out</button>
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
              <div className="row mb-3 shadow">
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
              <div className="row mb-3 shadow">
                <div className="col-md-3 text-center">
                  <FaUserTag size={30} className="text-success" />
                </div>
                <div className="col-md-9 text-center text-sm-start">
                  <p className="mb-0">
                    <strong>Your Role : </strong>{" "}
                    <span className="text-muted">{user.role && user.role.toUpperCase()}</span>
                  </p>
                </div>
              </div>
              <div className="row mb-3 shadow">
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
                <Link to="/update">
                  <button className="btn btn-primary mt-3 shadow">Update Your Profile</button>
                </Link>
                <button className="btn btn-danger ms-3 mt-3 shadow" onClick={handleDeleteProfile}>Delete Your Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingSpinner />;
      <ConfirmationModal/>
    </div>
  );
};

export default ProfilePage;
