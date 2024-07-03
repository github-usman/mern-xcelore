import { TiTick } from "react-icons/ti";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/authActions';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const backendError = auth.error;

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const isAuthenticated = useSelector((state) => state.auth.user !== null);
  const deleteCookie = (name) => {
    return new Promise((resolve) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      resolve();
    });
  };
  useEffect(() => {
    // console.log(auth.user.role, 'user role')
    if (isAuthenticated === true && auth.user.role === 'admin') {
      navigate('/admin/profile');
    }
    else if(isAuthenticated === true && auth.user.role !== 'admin'){
      deleteCookie('token');
      auth.user = null;
      navigate('/admin/login');
      toast.success('You are not an ADMIN, Please Login with Valid Form');
    }
    else if (auth.error) {
      toast.error(auth.error);
    }
  }, [isAuthenticated,auth.error, navigate]);

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className='container p-5'>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>
                {backendError && <div className="alert alert-danger">{backendError}</div>}
                <form onSubmit={handleLogin}>
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
                  <p className='text-primary mt-3 d-flex align-items-center'><TiTick color={'green'} size={20} /> Accept terms and conditions</p>
                  <div className='d-flex justify-content-between flex-column gap-4 form-group'>
                    <button type="submit" className="btn btn-primary btn-block w-100">
                      Login
                    </button>
                    <h3 className="text-center">OR</h3>
                    <Link to={"/user/login"} className="btn btn-outline-warning btn-block px-3 ">
                      Login as User
                    </Link>
                    <Link to={"/user/register"} className="btn btn-outline-primary btn-block ">
                      Sign Up or Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
