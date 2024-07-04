import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../components/ConformationModal.jsx';
import { openModal } from '../../store/slices/modalSlices.js';
import { updateProfileById } from '../../store/thunks/adminThunk.js';

const UpdateUserProfile = ({ propUser, closePopup }) => {
  const [formData, setFormData] = useState({
    first_name: propUser.first_name,
    last_name: propUser.last_name,
    email: propUser.email,
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const updateProfile = async () => {
    try {
      await dispatch(updateProfileById({
        id: propUser._id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email
      })).unwrap();

      toast.success('Profile Updated Successfully!');
      closePopup();
    } catch (error) {
      const errorMessage = error || 'Update profile failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(openModal({
      title: 'Confirm Update',
      body: `Are you sure you want to update the user information?`,
      onConfirm: updateProfile,
    }));
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center mt-5">
      <div className='container card p-5 shadow'>
        <div className="card-title text-center shadow rounded bg-warning py-1 mb-3 d-flex justify-content-between px-1">
          <h4>Update Profile </h4>
          <button className='rounded bg-danger border border-danger text-light px-2 shadow' onClick={closePopup}>
            <RxCross2 className='mb-1' size={20} />
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleUpdateProfile}>
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
          <button type='submit' className="btn btn-warning d-flex align-items-center gap-3">
            <FaEdit /> Update User
          </button>
        </form>
      </div>
      <ConfirmationModal />
    </div>
  );
};

export default UpdateUserProfile;
