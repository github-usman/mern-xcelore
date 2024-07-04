import React, { useState } from 'react';
import { SiTicktick } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../../store/thunks/authThunk';


const UserRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ first_name: formData.first_name, last_name: formData.last_name, email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        navigate('/admin/profile');
        toast.success('Your profile is now Register Successfully');
      })
      .catch(() => { });
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
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center ">
      <div className='container'>
        <div className="row justify-content-center ">
          <div className="card-body shadow p-3 rounded">
            <h3 className="card-title text-center shadow rounded bg-warning py-1 mb-3">Register</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.cPasswordpassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
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
              <p className='text-primary mt-3 d-flex align-items-center gap-1'><SiTicktick  className='shadow text-success' size={18} /> By Signing Up, you agree to our&nbsp;<span className='text-success'> Terms of Service & Privacy Policy</span></p>
              <button type="submit" className="btn btn-primary mt-5 px-5 shadow">Register</button>
              <Link to={"/user/login"} className="btn btn-outline-warning btn-block mt-5 ms-5 px-5 shadow">
                Sign In
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
