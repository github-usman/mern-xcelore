import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { SiTicktick } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/thunks/authThunk';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/admin/profile');
        toast.success('Welcome! Successfully logged in.')
      })
      .catch(() => { });
  };

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center ">
      <div className='container'>
        <div className="row justify-content-center ">
          <div className="card-body shadow p-3 rounded">
            <h3 className="card-title text-center shadow rounded bg-warning py-1 mb-3">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} >
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className='text-primary mt-3 d-flex align-items-center mb-5 gap-1'><SiTicktick className='shadow text-success' size={18} />By Signing In, you agree to our<span className='text-success'> Terms of Service & Privacy Policy</span></p>
              <button type="submit" className="btn btn-primary me-5 px-5 shadow">Sign In</button>
              <Link to={"/user/register"} className="btn btn-outline-warning btn-block shadow">
                Sign Up or Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
