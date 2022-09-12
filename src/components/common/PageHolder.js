import React, { useState, useEffect } from "react";
import AdminError404 from "../pages/AdminPanel/AdminError404";
import { Routes, Route } from "react-router-dom";
import AgregarPelicula from "../peliculas/AgregarPelicula";
import TablaPeliculas from "../peliculas/TablaPeliculas";
import EditarPelicula from "../peliculas/EditarPelicula";
import TablaAdmins from "../pages/AdminPanel/TablaAdmins";
import TablaUsuarios from "../pages/AdminPanel/TablaUsuarios";
import Dashboard from "../pages/AdminPanel/Dashboard";

const PageHolder = () => {
  const URL = process.env.REACT_APP_API_URL + "movies";
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    consultaAPI();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const consultaAPI = async () => {
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      setPeliculas(datos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-holder bg-gray-100">
      <div className="px-lg-4 px-xl-5 container-fluid" id="page-container">
        <Routes>
          <Route
            exact
            path="admin/peliculas"
            element={
              <TablaPeliculas
                peliculas={peliculas}
                consultaAPI={consultaAPI}
              ></TablaPeliculas>
            }
          ></Route>
          <Route
            exact
            path="/admin/error404"
            element={<AdminError404></AdminError404>}
          ></Route>
          <Route
            exact
            path="/admin/"
            element={<Dashboard></Dashboard>}
          ></Route>
          <Route
            exact
            path="admin/peliculas/agregarPelicula"
            element={
              <AgregarPelicula consultaAPI={consultaAPI}></AgregarPelicula>
            }
          ></Route>
          <Route
            exact
            path="admin/peliculas/editarPelicula/:id"
            element={
              <EditarPelicula consultaAPI={consultaAPI}></EditarPelicula>
            }
          ></Route>
          <Route
            exact
            path="admin/usuarios/administradores"
            element={<TablaAdmins></TablaAdmins>}
          ></Route>
          <Route
            exact
            path="admin/usuarios/usuarios"
            element={<TablaUsuarios></TablaUsuarios>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default PageHolder;
