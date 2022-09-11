import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";
import { campoRequerido, validarURL } from "../helpers/helper";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const EditarPelicula = (props) => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [pelicula, setPelicula] = useState("");
  const [genres, setGenres] = useState("");

  const [error, setError] = useState(false);

  const URL = process.env.REACT_APP_API_URL + "movie/" + id;
  const navigation = useNavigate();

  // crear variables ref
  const titleRef = useRef("");
  const imgRef = useRef("");
  const languageRef = useRef("");
  const releaseDateRef = useRef("");
  const synopsisRef = useRef("");

  useEffect(() => {
    consultaAPI();
  }, []);

  const consultaAPI = async () => {
    // consultar a la API la pelicula por su id
    try {
      // realizar una consulta GET
      const respuesta = await fetch(URL);
      if (respuesta.status === 200) {
        const dato = await respuesta.json();
        setPelicula(dato.movie);
        setGenres(dato.movie.genres);
      }
    } catch (error) {
      console.log(error);
      //mostrar cartel error al usuario
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los datos del form
    if (
      campoRequerido(titleRef.current.value) &&
      validarURL(imgRef.current.value) &&
      campoRequerido(languageRef.current.value) &&
      campoRequerido(genres) &&
      campoRequerido(releaseDateRef.current.value) &&
      campoRequerido(synopsisRef.current.value)
    ) {
      // reset el state de error
      setError(false);
      // crear el objeto para enviar a la API
      const peliculaModificada = {
        title: titleRef.current.value,
        img: imgRef.current.value,
        language: languageRef.current.value,
        genres: genres,
        releaseDate: releaseDateRef.current.value,
        synopsis: synopsisRef.current.value,
      };

      try {
        //consulta PUT para modificar valores en la API
        const parametros = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(peliculaModificada),
        };
        const respuesta = await fetch(URL, parametros);

        if (respuesta.status === 200) {
          // mostrar cartel al usuario
          Swal.fire(
            "pelicula modificada!",
            "La pelicula se actualizo correctamente",
            "success"
          );
          // resetear el formulario
          e.target.reset(); //el e.target en este caso por el submitt es el form
          // volver a pedir a la API
          props.consultaAPI();
          // redireccion a la pagina de lista de peliculas
          navigation("/rn/admin/peliculas");
          // volver a pedir a la API
          props.consultaAPI();
        } else {
          console.log("mostrar cartel de error");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //mostral cartel de error
      setError(true);
    }
  };
 // console.log(pelicula)
  return (
    <>
      <div className="page-header">
        <h1 className="page-heading">Editar película</h1>
      </div>
      <section>
        <div className="mb-5 row">
          <div className="mb-4 mb-lg-0 col-xxl-9 col-lg-8">
            <Card>
              <Card.Body>
                <Form id="formMovies" onSubmit={handleSubmit}>
                  <Form.Label>Título*</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    className="mb-4"
                    required=""
                    maxLength="70"
                    defaultValue={pelicula.title}
                    ref={titleRef}
                  ></Form.Control>
                  <Form.Label>URL de la imagen*</Form.Label>
                  <Form.Control
                    type="text"
                    id="Img"
                    className="mb-4 form-control"
                    maxLength="150"
                    required=""
                    defaultValue={pelicula.img}
                    ref={imgRef}
                  ></Form.Control>
                  <Form.Label>Lenguaje*</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    required=""
                    placeholder="Español"
                    maxLength="10"
                    defaultValue={pelicula.language}
                    ref={languageRef}
                  />
                  <Form.Label>Géneros*</Form.Label>
                  <Form.Select
                    className="mb-3"
                    required=""
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                  >
                    <option value="">Seleccione un género</option>
                    <option value="drama">Drama</option>
                    <option value="terror">Terror</option>
                    <option value="comedia">Comedia</option>
                    <option value="acción">Acción</option>
                    <option value="suspenso">Suspenso</option>
                    <option value="romantica">Románticas</option>
                    <option value="ciencia ficcion">Ciencia Ficción</option>
                  </Form.Select>
                  <Form.Label>Fecha de estreno*</Form.Label>
                  <Form.Control
                    type="date"
                    required=""
                    maxLength="10"
                    defaultValue={pelicula.releaseDate}
                    ref={releaseDateRef}
                  />
                  <Form.Label>stock*</Form.Label>
                  <Form.Control
                    as="textarea"
                    required=""
                    placeholder="Describa brevemente el argumento..."
                    maxLength="300"
                    defaultValue={pelicula.synopsis}
                    ref={synopsisRef}
                  />
                </Form>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xxl-3 col-lg-4">
            <Card className="shadow-sm mb-4">
              <Card.Header className="py-4 bg-white">
                <h4 className="card-heading">Confirmar</h4>
              </Card.Header>
              <Card.Body className="text-grey-700">
                <div className="d-flex flex-lg-column mb-4 justify-content-center">
                  <button
                    type="button"
                    className="mb-2 btn btn-outline-secondary btn-sm"
                    onClick={() => setOpen(!open)}
                    aria-controls="vistaPrevia"
                    aria-expanded={open}
                  >
                    Vista Previa de la película
                  </button>
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <button
                  form="formMovies"
                  type="submit"
                  className="btn btn-primary"
                >
                  Confirmar
                </button>
                {error === true ? (
                  <Alert
                    variant="danger"
                    onClick={() => setError(false)}
                    dismissible
                  >
                    Debe cargar todos los datos requeridos (*)
                  </Alert>
                ) : null}
              </Card.Footer>
            </Card>
          </div>
          <div className="my-3 mb-lg-0 col-xxl-7 col-lg-8">
          <Collapse in={open}>
              <Card className="shadow-sm mb-4 text-dark" id="vistaPrevia">
                <Card.Header className="py-4 bg-white">
                  <h4 className="card-heading">Vista Previa de la película</h4>
                </Card.Header>
                <Card.Img variant="top" className="img-fluid w-25 mx-auto" src={pelicula.img || null} />
                <Card.Body>
                  <Card.Title>
                    <h4 className="fw-bold">
                      {pelicula.title || null}
                      <span className="fw-bold badge bg-principal ms-4">
                        {genres || null}
                      </span>
                    </h4>
                    {genres ? (
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
                      {pelicula.releaseDate ? <span>{pelicula.releaseDate}</span> : null}
                    </p>
                  <Card.Text>{pelicula.language || null}</Card.Text>
                  {pelicula.synopsis ? (
                    <>
                      <span className="text-center fw-bold">Sinopsis:</span>
                      <p className="fw-light">{pelicula.synopsis}</p>
                    </>
                  ) : null}
                </Card.Body>
              </Card>
            </Collapse>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditarPelicula;
