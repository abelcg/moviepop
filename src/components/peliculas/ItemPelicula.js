import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

const ItemPelicula = (props) => {
  const URL = process.env.REACT_APP_API_URL + "movie/" + props.peliculas.id;

  const eliminarPelicula = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar esta pelicula?",
      text: "No podrá recuperar la pelicula una vez eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //aqui borro la pelicula
        try {
          const respuesta = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(respuesta);
          if (respuesta.status === 200) {
            console.log("La película se eliminó correctamente");
            // mostrar cartel al usuario
            Swal.fire(
              "Película Eliminada!",
              "Su película se eliminó correctamente",
              "success"
            );
            // volver a pedir a la API para recargar la tabla de peliculas
            props.consultaAPI();
          } else {
            console.log("mostrar cartel de error");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <tr key={props.peliculas.id}>
        <td>
          <div
            className="d-block me-3"
            style={{ width: "150px", height: "180px" }}
          >
            <div
              style={{
                display: "block",
                overflow: "hidden",
                position: "relative",
                boxSizing: "border-box",
                margin: "0",
                width: "150px",
                height: "170px",
              }}
            >
              <div
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  paddingTop: "66%",
                }}
              ></div>
              <img
                alt={props.peliculas.title}
                sizes="200px"
                srcSet={props.peliculas.img}
                decoding="async"
                data-nimg="true"
                className="img-fluid rounded"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  boxSizing: "border-box",
                  padding: 0,
                  border: "none",
                  margin: "auto",
                  display: "block",
                  width: 0,
                  height: 0,
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                }}
              ></img>
            </div>
          </div>
          <strong className="d-block-inline text-wrap">
            {props.peliculas.title}
          </strong>
        </td>
        <td>{props.peliculas.language}</td>
        <td>{props.peliculas.genres}</td>
        <td>{props.peliculas.releaseDate}</td>
        <td>{props.peliculas.synopsis}</td>
        <td>
          <ButtonGroup>
            <Link
              className="btn btn-warning ms-2"
              to={`/rn/admin/peliculas/editarPelicula/${props.peliculas.id}`}
            >
              <BiPencil className="mb-2"></BiPencil>
            </Link>
            <Button
              className="ms-2"
              variant="danger"
              onClick={() => eliminarPelicula()}
            >
              <BiTrash></BiTrash>
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    </>
  );
};

export default ItemPelicula;
