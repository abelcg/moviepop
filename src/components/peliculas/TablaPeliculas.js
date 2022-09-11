import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { BiPlus } from "react-icons/bi";
import ItemPelicula from "./ItemPelicula";

const TablaPeliculas = (props) => {
  
  return (
    <>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">Películas</h1>
        <div>
          <Link
            to="agregarPelicula"
            className="text-uppercase btn btn-primary fs-5"
          >
            <BiPlus className="fs-5 fw-bold"></BiPlus>
            Agregar nueva
          </Link>
        </div>
      </div>
      <section className="mb-5">
        <Card className="card-table">
          <Table
            className=" mb-1 table-borderless table-hover table-light table-striped w-100"
            responsive
          >
            <thead className="table-dark text-light">
              <tr>
                <th>Título</th>
                <th>Lenguaje</th>
                <th>Genero</th>
                <th>Fecha de estreno</th>
                <th>Sinopsis</th>
                <th>Botones de acción</th>
              </tr>
            </thead>
            <tbody>
              {props.peliculas.movie.map((peliculas) => (
               <ItemPelicula key={peliculas.id} peliculas={peliculas} consultaAPI={props.consultaAPI}></ItemPelicula>
              ))}
            </tbody>
          </Table>
          <Card.Footer></Card.Footer>
        </Card>
      </section>
    </>
  );
};

export default TablaPeliculas;
