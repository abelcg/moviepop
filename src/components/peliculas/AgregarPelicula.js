import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";
import { campoRequerido, validarURL } from "../helpers/helper";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { DateTime } from "luxon";

const AgregarPelicula = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [language, setLanguage] = useState("");
  const [genres, setGenres] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [synopsis, setSynopsis] = useState("");
 
  const [error, setError] = useState(false);

  const URL = process.env.REACT_APP_API_URL + "movie";
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los datos del form
    if (
      campoRequerido(title) &&
      validarURL(img) &&
      campoRequerido(language) &&
      campoRequerido(genres) &&
      campoRequerido(releaseDate) &&
      campoRequerido(synopsis)
    ) {
      // reset el state de error
      setError(false);
      const nuevoPelicula = {
        title: title,
        img: img,
        language: language,
        genres: genres,
        releaseDate: releaseDate,
        synopsis: synopsis,
      };

      try {
        const parametros = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoPelicula),
        };
        const respuesta = await fetch(URL, parametros);

        if (respuesta.status === 200) {
          // mostrar cartel al usuario
          Swal.fire(
            "Película Agregada!",
            "La película se agregó correctamente",
            "success"
          );
          // resetear el formulario
          e.target.reset();
          props.consultaAPI();
          // redireccion a la pagina de lista de peliculas
          navigation("/rn/admin/peliculas");
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

  const parseDate = (date) => {
    return DateTime.fromISO(date).setLocale('sp').toFormat('MMMM dd, yyyy');
   }

  return (
    <>
      <div className="page-header">
        <h1 className="page-heading">Agregar nueva película</h1>
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
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                  <Form.Label>URL de la img*</Form.Label>
                  <Form.Control
                    type="text"
                    id="Img"
                    className="mb-4 form-control"
                    maxLength="150"
                    required=""
                    onChange={(e) => setImg(e.target.value)}
                  ></Form.Control>
                  <Form.Label>Lenguaje*</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    required=""
                    placeholder="Español"
                    maxLength="10"
                    onChange={(e) => setLanguage(e.target.value)}
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
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                  <Form.Label>SInopsis*</Form.Label>
                  <Form.Control
                    as="textarea"
                    required=""
                    placeholder="Describa brevemente el argumento..."
                    maxLength="300"
                    onChange={(e) => setSynopsis(e.target.value)}
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
                <Card.Img variant="top" className="img-fluid w-25 mx-auto" src={img || null} />
                <Card.Body>
                  <Card.Title>
                    <h4 className="fw-bold">
                      {title || null}
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
                    <div className="fw-light d-flex ">
                      {releaseDate ? <span>{parseDate(releaseDate)}</span> : null}
                    </div>
                  </Card.Title>
                  <Card.Text>{language || null}</Card.Text>
                  {synopsis ? (
                    <>
                      <span className="text-center fw-bold">Sinopsis:</span>
                      <p className="fw-light">{synopsis}</p>
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

export default AgregarPelicula;
