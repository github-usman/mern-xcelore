import React, { useState } from "react";
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaEdit, FaEnvelope, FaTrash, FaUser, FaUserTag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import UpdateUserProfile from "./UpdateUserProfile";

import { deleteUserById, fetchAllUserProfile } from "../../store/actions/authActions";

const UsersProfile = ({user}) => {

  const dispatch = useDispatch()
  
  const handleDelete = () => {
    try {
      dispatch(deleteUserById(user._id));
      toast.success(`User ${user.first_name} Deleted Successfully`);
      dispatch(fetchAllUserProfile('', 1));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  // Modal
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div key={user._id} className="mb-3 p-2 shadow" style={{backgroundColor:'#fff3d9',borderRadius:'5px',border:'none'}}>
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
              <strong>Email Address: </strong>{" "}
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
              <strong>Your Role: </strong>{" "}
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
              <strong>Created At: </strong>{" "}
              <span className="text-muted">
                {new Date(user.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
        <hr />
        <div className="d-flex gap-5 justify-content-center">
        {!isOpen && <button className="btn btn-danger d-flex align-items-center gap-3" onClick={handleDelete} disabled={user.email ==='admin@gmail.com'}><FaTrash /> Delete User</button>}
       {!isOpen && <button className="btn btn-warning d-flex align-items-center gap-3" onClick={openPopup}><FaEdit /> Update User</button>}
        {isOpen && <UpdateUserProfile propUser={user} closePopup={closePopup} />}

        </div>
      </div>
    </>
  );
};

export default UsersProfile;
