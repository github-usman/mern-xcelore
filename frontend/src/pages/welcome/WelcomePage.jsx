import React from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import styles from "./welcomePage.module.css";


const WelcomePage = () => {
  return (
    <div className='bg-warning vh-100 w-100 d-flex justify-content-center align-items-center'>
       <div className="container text-center">
        <p className="fs-2">Hi there!</p>
        <h2 className={styles.welcome}>Welcome! to <span className="text-dark">xcelore admin</span> portal</h2>
        <h3 >
          <ReactTyped
            strings={[
              "You will be Directly Connect to Admin Dashboard",
              "You will be a protected User",
              "Once Logged In",
            ]}
            typeSpeed={40}
            backSpeed={50}
            attr="placeholder"
            loop
          >
            <input type="text" className={styles.reactTypedInner} disabled />
          </ReactTyped>
        </h3>
        <div>
          <Link to="user/login" className='btn btn-dark px-5'>
            Get started
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default WelcomePage;
