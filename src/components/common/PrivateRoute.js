import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

const PrivateRoute = ({children }) => {
    const URL = process.env.REACT_APP_API_URL+"isUserAuth";

    //verifico si hay un usuario logueado
    const user = JSON.parse(localStorage.getItem('user'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        consultaAPI();
      }, []);
     
      const consultaAPI = async () => {
        const isAdmin = {isAdmin: user.isAdmin};
        try {
          const respuesta = await fetch(URL,  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer"+ user.accessToken,
            },
            body: JSON.stringify(isAdmin),
          });
          const datos = await respuesta.json();
          console.log(datos)
          setIsAuthenticated(datos.auth);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        isAuthenticated ? children : (
        <> <h2 className="text-center text-secondary my-5">Usted no está autorizado para acceder a esta página</h2>
            <p className="lead text-center  my-4">Si posee permisos de administrador, vuelva a iniciar sesión para renovar su permiso</p>
            <div className="text-center"> <Link className="btn btn-dark" to="/">
              Volver a Inicio
            </Link></div>
         </>)
    );
};

export default PrivateRoute;