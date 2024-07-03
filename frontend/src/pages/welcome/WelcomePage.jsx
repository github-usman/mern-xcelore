import React from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import styles from "./welcomePage.module.css";


const WelcomePage = () => {
  return (
    <div className='bg-primary vh-100 w-100 border border-black d-flex justify-content-center align-items-center'>
       <div className="container text-center">
        <p className="fs-2">Hi there!</p>
        <h2 className={styles.welcome}>Welcome! to xcelore portal</h2>
        <h3 >
          <ReactTyped
            strings={[
              "You will Directly Connect to Admin Login",
              "Once Login",
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
          <Link to="/login" className={styles.btnGetStarted}>
            Get started
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default WelcomePage;
