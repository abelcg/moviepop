import React from "react";
import AdminFooter from "../common/AdminFooter";
import Sidebar from "../common/Sidebar";
import PageHolder from "../common/PageHolder";

const PageContainer = (props) => {
  return (
    <div className="d-flex align-items-stretch">
      <Sidebar clicked={props.clicked}></Sidebar>
      <PageHolder></PageHolder>
      <AdminFooter></AdminFooter>
    </div>
  );
};

export default PageContainer;
