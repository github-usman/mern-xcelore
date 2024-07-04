import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmationModal from '../../components/ConformationModal';
import { openModal } from '../../store/slices/modalSlices';
import { fetchProfile, updateUserProfile } from '../../store/thunks/authThunk';

const UserProfileUpdate = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  const updateProfile = async () => {
    try {
      await dispatch(updateUserProfile({
        first_name: formData.first_name || user.first_name,
        last_name: formData.last_name || user.last_name,
        email: formData.email || user.email,
      }));
      toast.success('Profile Updated Successfully!');
      navigate('/user/profile');
    } catch (error) {
      const errorMessage = error.message || 'Update profile failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user && !isLoading) {
    return <div>No user data available.</div>;
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(openModal({
      title: 'Confirm Update',
      body: `Are you sure you want to update the user information?`,
      onConfirm: updateProfile,
    }));
  };

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className='container'>
        <div className="row justify-content-center">
          <div className="card-body shadow p-3 rounded">
            <h3 className="card-title text-center shadow rounded bg-warning py-1 mb-3 d-flex justify-content-between px-1">
              Update Profile <Link to={"/user/profile"} className='rounded bg-danger text-light px-1 shadow tada'><RxCross2 className=' mb-1 ' /></Link>
            </h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name || (user && user.first_name) || ''}
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
                  value={formData.last_name || (user && user.last_name) || ''}
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
                  value={formData.email || (user && user.email) || ''}
                  onChange={onChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary px-5 mt-5">Update</button>
            </form>
          </div>
        </div>
      </div>
      <ConfirmationModal />
    </div>
  );
};

export default UserProfileUpdate;
