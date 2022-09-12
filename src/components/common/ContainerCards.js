import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const ContainerCards = () => {
  const URL = process.env.REACT_APP_API_URL + "movies";

  const [peliculas, setPeliculas] = useState([]);

  const [error, setError] = useState(true);

  useEffect(() => {
    consultaAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const consultaAPI = async () => {
    try {
      const respuesta1 = await fetch(URL);
      const dato = await respuesta1.json();
      setPeliculas(dato);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className="container" /* id="grilla" */>
      <div className="row">
        {!error
          ? peliculas.movie.map((peliculas) => (
              <MovieCard key={peliculas.id} peliculas={peliculas}></MovieCard>
            ))
          : null}
      </div>
    </div>
  );
};

export default ContainerCards;
