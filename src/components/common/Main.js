import React from "react";
import { Route, Routes } from "react-router-dom";
import PaginaPrincipal from "./../pages/PaginaPrincipal/PaginaPrincipal";
import DetallePelicula from "../pages/DetallePelicula";

const Main = () => {
 
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<PaginaPrincipal></PaginaPrincipal>}
      ></Route>
      <Route
        exact
        path="/peliculas/:id"
        element={<DetallePelicula></DetallePelicula>}
      ></Route>
    </Routes>
  );
};

export default Main;
