import React, { useState, useEffect } from "react";
import "../css/admin.css";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import AdminMain from "./AdminMain";

const AdminNav = () => {
  const [clicked, setClicked] = useState(false);
  //verifico si el usuario esta logueado
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigation = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigation("/");
  };

  const handleToggle = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <header>
        <Nav
          className="
          px-4
          py-2
          shadow
          navbar navbar-expand-lg
          bg-white
          overflow-hidden
         
        "
        >
          <Container className="d-flex justify-content-between aling-items-center">
            <button className="btn p-0 " onClick={() => handleToggle()}>
              {clicked ? (
                <BiMenuAltLeft id="btn"></BiMenuAltLeft>
              ) : (
                <BiMenu id="btn"></BiMenu>
              )}
            </button>
            <Link to="admin/" className="navbar-brand fs-5 fw-bold text-gold">
              ADMIN PANEL
            </Link>
            <button className="btn" id="btn" type="button" onClick={logout}>
              <BiLogOut></BiLogOut>
            </button>
          </Container>
        </Nav>
      </header>
      <AdminMain clicked={clicked}></AdminMain>
    </>
  );
};
export default AdminNav;
