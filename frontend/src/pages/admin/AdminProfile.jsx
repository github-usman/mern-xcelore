import React, { useEffect } from "react";
import { FaCalendarAlt, FaEnvelope, FaUser, FaUserTag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConformationModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { logout } from "../../store/slices/authSlice";
import { openModal } from "../../store/slices/modalSlices";
import { fetchAllProfiles } from "../../store/thunks/adminThunk";
import { fetchProfile } from "../../store/thunks/authThunk";


const AdminProfile = () => {
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


  if (!user) {
    return <div>No user data available.</div>;
  }


  const handleLogOutButton = () => {
    dispatch(openModal({
      title: 'Confirm Logout',
      body: `Are you sure you want log out?`,
      onConfirm: logOutButton,
    }));
  };
  const handleAllUserProfile = () => {
    dispatch(fetchAllProfiles('',0));
    navigate('/admin/all-user')
  };



  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className='container'>
        <div className="row justify-content-center ">
          <div className="card-body shadow rounded " style={{ backgroundColor: '#fff3d9', borderRadius: '5px', padding: '3rem 1rem', border: 'none' }}>
            <div className="card-title text-center shadow d-flex justify-content-between align-items-center rounded bg-warning  mb-3">
              <h3 className="ms-1 d-flex align-items-center gap-1">
                <FaUser /> Admin Profile
              </h3>
              <div className="text-center">
                <button className="btn btn-danger me-1 px-5 shadow" onClick={handleLogOutButton}>Log Out</button>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-3 ">
                <div className="col-md-3 text-center">
                  <FaUser size={30} className="text-black" />
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
                    <span className="text-muted">{user.role.toUpperCase()}</span>
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
                <div>

                </div>
              </div>
              <button className="border border-2 border-primary text-light btn btn-primary mt-5 repel-animation" style={{ fontWeight: '500', fontSize: "20px" }} onClick={handleAllUserProfile}>Check List Of Users</button>
            </div>
          </div>
        </div>
      </div>
      <LoadingSpinner />;
      <ConfirmationModal />
    </div>
  );
};

export default AdminProfile;
