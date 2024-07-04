import React from "react";
import "./../index.css";

const LoadingSpinner = () => {
  return (
    <div className="w-100 vh-100 bg-warning d-flex justify-content-center align-items-center">
      <button className="loading__button" >
        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </div>
  );
};

export default LoadingSpinner;
