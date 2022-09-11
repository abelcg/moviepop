import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { BiHome } from "react-icons/bi";
import { BiListUl } from "react-icons/bi";
import { BiArchive } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

const Sidebar = (props) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isActive, setActive] = useState("");
  const [activeLink, setActiveLink] = useState(null);
  const [activeLink2, setActiveLink2] = useState(null);
  const listOptions = [
    { text: "Peliculas", route: "admin/peliculas" },
    {
      text: "Agregar Película",
      route: "admin/peliculas/agregarPelicula",
    },
  ];
  const listOptions2 = [
    { text: "Administradores", route: "admin/usuarios/administradores" },
    { text: "Usuarios", route: "admin/usuarios/usuarios" },
  ];

  return (
    <div
      className={
        props.clicked ? "sidebar py-3 ms-0 show" : "sidebar py-3 ms-0 shrink"
      }
    >
      <div className="logo-details text-center">
        <div className="logo_name">MoviePop</div>
      </div>
      <ul className="nav-list ps-0">
        <li>
          <Link key="0" to="/" onClick={() => setActive("0")}>
            <BiHome
              className={
                isActive === "0" ? "icon text-muted active" : "icon text-muted"
              }
            ></BiHome>
            <span
              className={
                isActive === "0"
                  ? "links_name text-muted active"
                  : "links_name text-muted"
              }
            >
              Inicio
            </span>
          </Link>
        </li>
        <li id="sidebarMenu" onClick={() => setActive("1")}>
          <Link
            key="1"
            to="admin/peliculas"
            role="button"
            aria-controls="Dropdown"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <BiListUl
              className={
                isActive === "1" ? "icon text-muted active" : "icon text-muted"
              }
            ></BiListUl>
            <span
              className={
                isActive === "1"
                  ? "links_name text-muted active"
                  : "links_name text-muted"
              }
            >
              Películas
            </span>
          </Link>
          <Collapse in={open}>
            <ul className="sidebar-menu list-unstyled" id="Dropdown">
              {listOptions.map((option, index) => (
                <li key={index} onClick={() => setActiveLink(index)}>
                  <Link
                    className={`"sidebar-link text-muted" 
                           ${
                             activeLink === index
                               ? "sidebar-link text-muted active"
                               : ""
                           }`}
                    to={option.route}
                  >
                    {option.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>
        <li id="sidebarMenu" onClick={() => setActive("4")}>
          <Link
            key="4"
            to="admin/usuarios/administradores"
            role="button"
            aria-controls="usersDropdown"
            aria-expanded={open2}
            onClick={() => setOpen2(!open2)}
          >
            <BiUser
              className={
                isActive === "4" ? "icon text-muted active" : "icon text-muted"
              }
            ></BiUser>
            <span
              className={
                isActive === "4"
                  ? "links_name text-muted active"
                  : "links_name text-muted"
              }
            >
              Usuarios
            </span>
          </Link>
          <Collapse in={open2}>
            <ul className="sidebar-menu list-unstyled" id="usersDropdown">
              {listOptions2.map((option, index) => (
                <li key={index} onClick={() => setActiveLink2(index)}>
                  <Link
                    className={`"sidebar-link text-muted" 
                           ${
                             activeLink2 === index
                               ? "sidebar-link text-muted active"
                               : ""
                           }`}
                    to={option.route}
                  >
                    {option.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>
        <li>
          <Link key="8" to="admin/error404" onClick={() => setActive("8")}>
            <BiHeart
              className={
                isActive === "8" ? "icon text-muted active" : "icon text-muted"
              }
            ></BiHeart>
            <span
              className={
                isActive === "8"
                  ? "links_name text-muted active"
                  : "links_name text-muted"
              }
            >
              Guardados
            </span>
          </Link>
        </li>
        <li>
          <Link key="9" to="admin/error404" onClick={() => setActive("9")}>
            <BsGear
              className={
                isActive === "9" ? "icon text-muted active" : "icon text-muted"
              }
            ></BsGear>
            <span
              className={
                isActive === "9"
                  ? "links_name text-muted active"
                  : "links_name text-muted"
              }
            >
              Configuración
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
