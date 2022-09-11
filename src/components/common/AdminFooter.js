import React from "react";

const AdminFooter = () => {
  return (
    <footer className="footer bg-white shadow-lg align-self-end py-3 px-xl-5 w-100 fixed-bottom">
      <div className="container-fluid">
        <div className="row">
          <div className="text-center text-md-start fw-bold col-md-6">
            <p className="mb-2 mb-md-0">MoviePop © 2022</p>
          </div>
          <div className="text-center text-md-end text-gray-400 col-md-6">
            <p className="mb-0">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
