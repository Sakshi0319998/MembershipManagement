// eslint-disable-next-line no-unused-vars
import React from "react";
 
import { useNavigate } from "react-router-dom";

const start = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate=useNavigate()
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-4 rounded w-25 border loginForm">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex justify-contend-between mt-5 mb-2">
          <button type="button" className="btn btn-primary" onClick={()=> {navigate("/membership_login")}}>
            Membership
          </button>
          <button type="button" className="btn btn-success" onClick={()=> {navigate("/adminlogin")}}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default start;
