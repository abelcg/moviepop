import React from "react";
import moviepop from "../../img/moviepop.png";

const Dashboard = () => {
  return (
    <>
      <div className="page-header d-flex justify-content-center align-items-center">
        <h1 className="page-heading">Bienvenidos</h1>
      </div>
      <section className="container mb-5">
        <div className="row">
          <div className="col-12 text-center">
            <img className="w-50" src={moviepop} alt="moviepop logo" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
