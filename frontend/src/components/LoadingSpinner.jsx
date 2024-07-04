import React from "react";
import { useSelector } from "react-redux";
import "./../index.css";

const LoadingSpinner = () => {
  
  const { isLoading } = useSelector((state) => state.auth);

  return ( isLoading ?<div className="w-100 vh-100  d-flex justify-content-center align-items-center" style={{ position: 'absolute', backgroundColor: '#00000068' }}>
            <button className="loading__button"  >
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          </div>
          :<></>
  )
};

export default LoadingSpinner;
