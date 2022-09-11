import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

import FavContext from "../context/FavContext";

const DetallePelicula = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState({});
  const [error, setError] = useState(true);

  const URL = process.env.REACT_APP_API_URL + "movie/" + id;

  const { setFavoritas } = useContext(FavContext);

  const [error2, setError2] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const agregarFav = () => {
    if (user) {
      consultaFav();
    } else {
      setError2(true);
    }
  };
  //Consulta a la api para agregar películas a favoritos
  const consultaFav = async () => {
    const userId = user.userId;
    const URL = process.env.REACT_APP_API_URL + "favorite/" + userId;
    const item = {
      movieId: pelicula.id,
    };

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

  //Consultar por la pelicula buscada
  useEffect(() => {
    consultaAPI();
  }, [id, error]);

  const consultaAPI = async () => {
    try {
      const respuesta = await fetch(URL);
      const dato = await respuesta.json();

      setPelicula(dato.movie);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <section className="mt-4">
      {error2 === true ? (
        <Alert
          className="text-center text-dark"
          variant="dark"
          onClick={() => setError2(false)}
          dismissible
        >
          {<p>Inicie sesión para poder guardar en favoritos</p>}
        </Alert>
      ) : null}
      <Container>
        <Row>
          <Col sm={12}>
            <Card className="border-0 mb-5">
              <Card.Img
                variant="top"
                className="img-fluid w-50 mx-auto mt-2"
                src={!error ? pelicula.img : null}
              />
              <Card.Body>
                <Card.Title>
                  <h4 className="fw-bold">
                    {!error ? pelicula.title : null}
                    <span className="fw-bold badge bg-principal ms-4">
                      {!error ? pelicula.genres : null}
                    </span>
                  </h4>
                  {pelicula.genres ? (
                    <div className="my-3 fs-6">
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStarHalfAlt></FaStarHalfAlt>
                      <span className="ms-3 fs-6">4/5</span>
                    </div>
                  ) : null}
                </Card.Title>
                <p className="fw-light d-flex ">
                  {!error && pelicula.releaseDate ? (
                    <span>{pelicula.releaseDate}</span>
                  ) : null}
                </p>
                <Card.Text>{!error ? pelicula.language : null}</Card.Text>
                {!error && pelicula.synopsis ? (
                  <>
                    <span className="text-center fw-bold">Sinopsis:</span>
                    <p className="fw-light">{pelicula.synopsis}</p>
                  </>
                ) : null}
                <div className="d-flex">
                  <Button
                    className="fs-6 px-1 py-3 mt-3 d-flex flex-grow-1 align-items-center btn-primary"
                    size="lg"
                    variant="dark"
                    onClick={agregarFav}
                  >
                    <span className="me-3 flex-grow-1 text-center">
                      Agregar a favoritos
                    </span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h2 className="mb-4">Comentarios</h2>
            <hr />
            <h4 className="mb-2">Califica esta película</h4>
            <Form>
              <FloatingLabel controlId="floatingTextarea2" label="Tu cometario">
                <Form.Control
                  as="textarea"
                  placeholder="Deja tu cometario aquí"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <button className="btn btn-primary my-2">Enviar</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DetallePelicula;
