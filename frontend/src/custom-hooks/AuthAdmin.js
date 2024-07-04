import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthAdmin = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  if (!isAuthenticated) {
    return <Navigate to="/user/login" />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/user/profile" />;
  }

  return children;
};

export default AuthAdmin;


// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { fetchUserProfile } from '../store/actions/authActions';

// const useAuth = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchUserProfile());
//   }, [dispatch]);

//   const isAuthenticated = useSelector((state) => state.auth.user !== null);
//   console.log(isAuthenticated, 'isAuthenticated')
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/user/login');
//     }
//   }, [isAuthenticated, navigate]);

//   return isAuthenticated;
// };

// export default useAuth;


