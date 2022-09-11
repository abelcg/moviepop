import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import FilaUsuarios from "./FilaUsuarios";
import Swal from "sweetalert2";

const TablaUsuarios = () => {
  const URL = process.env.REACT_APP_API_URL + "users";
  const [usuarios, setUsuarios] = useState([]);
  const [isAdminToggle, setIsAdminToggle] = useState(0);
  //verifico si hay un usuario logueado
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    consultaAPI();
  }, []);

  const consultaAPI = async () => {
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      setUsuarios(datos.user);
      localStorage.setItem("usuarios", JSON.stringify(datos.user));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isAdminToggle)
  const cambiarRol = (id) => {
    Swal.fire({
      title: "¿Esta seguro de asignar rol de adiministrador a este usuario?",
      text: "No podrá deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {

        const URL = process.env.REACT_APP_API_URL + "isAdmin/" + id;
        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        const user = usuarios.find((u)=> {return u.id === id;});
        user.isAdmin === 1 ? setIsAdminToggle(0) : setIsAdminToggle(1);
        try {
          const respuesta = await fetch(URL, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isAdmin: isAdminToggle }),
          });
          const datos = await respuesta.json();
          if (respuesta.status === 200) {
            // mostrar cartel al usuario
            Swal.fire("Rol modificado", datos.message, "success");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };
 
  return (
    <>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">Usuarios</h1>
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
                <FilaUsuarios
                  key={usuarios.id}
                  usuarios={usuarios}
                  cambiarRol={cambiarRol}
                ></FilaUsuarios>
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
