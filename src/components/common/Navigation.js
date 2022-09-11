import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { IoHome, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalLoginSignup from "../common/ModalLoginSignup";
import ItemFavoritas from "./ItemFavoritas";

import FavContext from "../context/FavContext";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [mostrar, setMostrar] = useState(false);
  const handleCerrar = () => setMostrar(false);
  const handleMostrar = () => setMostrar(true);
  const navigation = useNavigate();
  //verifico si el usuario esta logueado
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  //Si hay usuaraio loggeado guardo el estado de su id para usarlo de parametro de ruta checkout
  const [usuarioIdParam, setUsuarioIdParam] = useState("");

  //obtengo los items del favoritas
  const { favoritas, setFavoritas } = useContext(FavContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState(true);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.isAdmin);
      consultaAPI();
    }
  }, [error, FavContext]);

  const consultaAPI = async () => {
    const userId = user.userId;
    setUsuarioIdParam(userId);
    const URL = process.env.REACT_APP_API_URL + "favorite/" + userId;
    try {
      const respuesta = await fetch(URL);
      const dato = await respuesta.json();
      if (respuesta.status === 200) {
        setFavoritas(dato.user.movies);
        localStorage.setItem("favoritas", JSON.stringify(dato.user.movies));
        setError(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigation("/");
    window.location.reload();
  };

  return (
    <>
      <header className="mb-5">
        <Navbar className="bg-principal border border-0" bg="light" expand="lg">
          <Container>
            <Nav className="ms-auto flex-row justify-content-around align-items-center">
              <Link className="ms-auto fw-bold fs-3" to="/">
                <IoHome className="text-light fs-2"></IoHome>
              </Link>
              <Link className="ms-3 fw-bold fs-3" to="/">
                <IoSearch className="text-gold fs-2"></IoSearch>
              </Link>
            </Nav>
          </Container>
        </Navbar>
        <Navbar className="shadows bg-principal" bg="light" expand="lg">
          <Container>
            <Nav className="ms-auto flex-row justify-content-around align-items-center">
              {isAdmin ? (
                <Link
                  className="nav-link text-gold px-2 fs-6 fw-bold"
                  aria-current="page"
                  to="rn/admin"
                >
                  Admin
                </Link>
              ) : null}
              {currentUser ? (
                <a
                  className="nav-link text-gold btn-sm px-2 fs-6 fw-bold"
                  type="button"
                  id="login-btn"
                  onClick={logout}
                >
                  Logout <MdLogout className="mx-1 fs-5" />
                </a>
              ) : (
                <a
                  className="nav-link text-gold btn-sm px-2 fs-6 fw-bold"
                  type="button"
                  onClick={handleShow}
                >
                  <MdLogin className="mx-1 fs-5" />
                  Login
                </a>
              )}
              <Nav.Link
                className="px-2 fs-4 text-gold fw-bolder"
                onClick={handleMostrar}
              >
                {typeof favoritas.length === "undefined" || !favoritas || favoritas.length === 0 ? <AiOutlineHeart /> : <AiFillHeart></AiFillHeart>} 
                {typeof favoritas.length === "undefined" || !favoritas || favoritas.length === 0 ? null : (
                  <span className="fav-items-count">{favoritas.length}</span>
                )}
              </Nav.Link>
              <Offcanvas
                className="fav bg-principal text-gold"
                show={mostrar}
                onHide={handleCerrar}
                placement="end"
                name="end"
              >
                <Offcanvas.Header
                  className="border-bottom border-dark"
                  closeButton
                >
                  <Offcanvas.Title className="fs-4">Favoritas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bg-light d-flex flex-column px-2">
                  {typeof favoritas.length === "undefined" || !favoritas || favoritas.length === 0 ? (
                    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                      <div className="mb-4">
                        <AiOutlineHeart className="fs-3" />{" "}
                        <span className="text-dark fw-bold">0</span>
                      </div>
                      <p className="text-center text-dark fw-bold fs-3">
                        Tu lista de películas favoritas esta vacía
                      </p>
                    </div>
                  ) : (
                    favoritas.map((peliculas) => (
                      <ItemFavoritas
                        key={peliculas.id}
                        peliculas={peliculas}
                      ></ItemFavoritas>
                    ))
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <ModalLoginSignup
        show={show}
        setShow={setShow}
        handleClose={handleClose}
      ></ModalLoginSignup>
    </>
  );
};

export default Navigation;
