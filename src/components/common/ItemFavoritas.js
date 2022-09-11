import React, { useContext } from "react";
import FavContext from "../context/FavContext";

const ItemFavoritas = (props) => {
  const { setFavoritas } = useContext(FavContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  const URL = process.env.REACT_APP_API_URL + "favorite/" + userId;

  const consultaAPI = async () => {

    const movieId = {
      movieId: props.peliculas.id,
    };
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
    <>
      <div className="py-2">
        <div className="mb-2 container">
          <div className="row">
            <div
              className="me-3 col-sm-6"
              style={{
                backgroundImage: `url(${props.peliculas.img})`,
                minHeight: "100%",
                width: "150px",
                backgroundPosition: "50%",
                backgroundSize: "cover",
                objectFit: "contain",
              }}
            ></div>
            <div className="col-sm-6 flex-grow-1 border-bottom border-secondary h-100">
              <div className="d-flex justify-content-between mb-2">
                <p className="fw-bolder">{props.peliculas.title}</p>
                <p className="text-end fw-light badge bg-principal">{props.peliculas.genres}</p>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <p className="text-muted fw-light">
                  {props.peliculas.synopsis}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-2">
                <button
                  className="bg-transparent border-0 text-end text-decoration-underline text-secondary"
                  onClick={consultaAPI}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemFavoritas;
