import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import FilaUsuarios from "./FilaUsuarios";
import Swal from "sweetalert2";

const TablaUsuarios = () => {
  const URL = process.env.REACT_APP_API_URL + "/usuarios/";
  const [usuarios, setUsuarios] = useState([]);
  //verifico si hay un usuario logueado
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    consultaAPI();
  }, []);

  const consultaAPI = async () => {
    const isAdmin = { isAdmin: user.isAdmin };
    try {
      const respuesta = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.accessToken,
        },
        body: JSON.stringify(isAdmin),
      });
      const datos = await respuesta.json();
      setUsuarios(datos);
    } catch (error) {
      console.log(error);
    }
  };

  const cambiarRol=  (id)=> {
       Swal.fire({
        title: '¿Esta seguro de asignar rol de adiministrador a este usuario?',
        text: "No podrá deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
       }).then(async (result) => {
         if (result.isConfirmed) {
             //aqui borro el producto
             const URL = process.env.REACT_APP_API_URL + "/isAdmin/"+ id;
    const isAdmin = { isAdmin: user.isAdmin,
     };
     try {
      const respuesta = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.accessToken,
        },
        body: JSON.stringify(isAdmin),
      });
      const datos = await respuesta.json();
      if (respuesta.status === 200) {
         // mostrar cartel al usuario
         Swal.fire(
            "Rol modificado",
            datos.mensaje,
            "success"
          );
      }
    } catch (error) {
      console.log(error);
    } 
         }
       })
     }

  return (
    <>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">Usuarios / clientes</h1>
      </div>
      <section className="mb-5">
        <Card className="card-table">
          <Table
            className="mb-1 table-borderless table-hover table-light table-striped w-100"
            responsive
          >
            <thead className="table-dark text-light">
              <tr>
                <th>Nombre de usuario</th>
                <th>email</th>
                <th>Asignar o quitar rol administrador</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuarios) => (
                <FilaUsuarios key={usuarios._id} usuarios={usuarios} cambiarRol={cambiarRol}></FilaUsuarios>
              ))}
            </tbody>
          </Table>
          <Card.Footer></Card.Footer>
        </Card>
      </section>
    </>
  );
      };

export default TablaUsuarios;
