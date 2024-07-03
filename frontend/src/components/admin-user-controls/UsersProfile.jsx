import React from "react";
import { FaCalendarAlt, FaEnvelope, FaUser, FaUserTag } from "react-icons/fa";

const UsersProfile = ({user}) => {
  return (
    <>
      <div key={user._id} className="mb-3">
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
      </div>
    </>
  );
};

export default UsersProfile;
