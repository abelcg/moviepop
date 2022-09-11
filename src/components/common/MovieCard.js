import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Card from "react-bootstrap/Card";

import FavContext from "../context/FavContext";

const MovieCard = (props) => {
  const { favoritas, setFavoritas } = useContext(FavContext);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const agregarFav = () => {
    if (user) {
      consultaFav();
    } else {
      setError(true);
    }
  };

  const eliminarFav = () => {
    if (user) {
      consultaDelFav();
    } else {
      setError(true);
    }
  };

  //Consulta a la api para agregar películas a favoritos
  const consultaFav = async () => {
    const userId = user.userId;
    const URL = process.env.REACT_APP_API_URL + "favorite/" + userId;
    const item = {
      movieId: props.peliculas.id,
    };
    setAdded(props.peliculas.id);
    try {
      const respuesta = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const datos = await respuesta.json();
      if (respuesta.status === 200) {
        const respuesta1 = await fetch(URL);
        const dato1 = await respuesta1.json();
        setFavoritas(dato1.user.movies);
        localStorage.setItem("favoritas", JSON.stringify(dato1.user.movies));
      } else {
        console.log(datos.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const consultaDelFav = async () => {
    const userId = user.userId;
    const URL = process.env.REACT_APP_API_URL + "favorite/" + userId;
    const movieId = {
      movieId: props.peliculas.id,
    };
    setAdded("");
    try {
      const respuesta = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieId),
      });
      const datos = await respuesta.json();
      if (respuesta.status === 200) {
        const respuesta1 = await fetch(URL);
        const dato1 = await respuesta1.json();
        setFavoritas(dato1.user.movies);
        localStorage.setItem("favoritas", JSON.stringify(dato1.user.movies));
      } else {
        console.log(datos.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
      <Card className="bg-principal shadow position-relative">
        <Card.Img
          className="w-100 cardImg"
          variant="top"
          src={props.peliculas.img}
          alt={props.peliculas.title}
        />
        {error === true ? (
          <Alert
            className="position-absolute zIndex top-50"
            variant="dark"
            onClick={() => setError(false)}
            dismissible
          >
            {<p>Inicie sesión para poder agregar a favoritos</p>}
          </Alert>
        ) : null}
        <Card.Body className="action-container">
          <Card.Title>
            {" "}
            <Link
              className="text-decoration-none"
              to={"/peliculas/" + props.peliculas.id}
            >
              <h4 className="text-light title text-end fs-6">
                {props.peliculas.title}
              </h4>
            </Link>
          </Card.Title>
          {typeof favoritas.length === "undefined" ||
          !favoritas ||
          favoritas.length === 0 ? (
            <ul className="action">
              <a className="text-dark" type="button" onClick={agregarFav}>
                <li>
                  <FaRegHeart></FaRegHeart>
                  <span>Añadir a favoritos</span>
                </li>
              </a>
            </ul>
          ) : added === props.peliculas.id ? (
            <ul className="action">
              <a className="text-dark" type="button" onClick={eliminarFav}>
                <li>
                  <FaHeart></FaHeart>
                  <span>Borrar de favoritos</span>
                </li>
              </a>
            </ul>
          ) : (
            <ul className="action">
              <a className="text-dark" type="button" onClick={agregarFav}>
                <li>
                  <FaRegHeart></FaRegHeart>
                  <span>Añadir a favoritos</span>
                </li>
              </a>
            </ul>
          )}

          <Card.Text className="mt-3 align-items-center text-end">
            <FaStar></FaStar>
            <FaStar></FaStar>
            <FaStar></FaStar>
            <FaStar></FaStar>
            <FaStarHalfAlt></FaStarHalfAlt>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
