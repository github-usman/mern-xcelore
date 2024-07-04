import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, fetchAllProfiles } from '../../store/thunks/adminThunk';


const AddNewUser = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cPassword: '',
    role: 'user'
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addNewUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })).unwrap();
      dispatch(fetchAllProfiles({ keyword: '', page: 1 }));
      toast.success(`New user : ${formData.first_name} has been Added successfully`)
      closePopup();
    } catch (err) {
      toast.error(err)
    }
  };

  const [checkConfirmPass, setCheckConfirmPass] = useState('');

  const handlePasswordConfirm = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      cPassword: value,
    });
    if (formData.password !== value) {
      setCheckConfirmPass('Passwords do not match');
    } else {
      setCheckConfirmPass('');
    }
  };



  return (
    <div className="w-100 d-flex justify-content-center align-items-center mt-5">
      <div className='container card p-4 shadow'>
        <div className="card-title text-center shadow rounded bg-warning py-1 mb-3 d-flex justify-content-between px-1">
          <h4>Register New User </h4><button className='rounded bg-danger border border-danger  text-light px-2 shadow ' onClick={closePopup}><RxCross2 className='mb-1' size={20} /></button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="c-password" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="c-password"
              name="c-password"
              value={formData.cPassword}
              onChange={handlePasswordConfirm}
              required
            />
          </div>
          {checkConfirmPass.length > 0 && (
            <p className="alert alert-danger">{checkConfirmPass}</p>
          )}
          <div className="mb-2">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-control"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <p className='text-primary mt-3 d-flex align-items-center'><TiTick color={'green'} size={20} /> Accept terms and conditions</p>
          <button className="btn btn-success d-flex align-items-center justify-content-between shadow" type='submit'>
            <p className="mb-0 me-2 flex-grow-1 text-start">Add New User</p>
            <FaPlusCircle size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
