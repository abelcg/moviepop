import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";


const TablaAdmins = () => {
    const URL = process.env.REACT_APP_API_URL+"/usuarios/";
    const [usuarios, setUsuarios] = useState([]);
    //verifico si hay un usuario logueado
    const user = JSON.parse(localStorage.getItem('user'));
  
    useEffect(() => {
      consultaAPI();
    }, []);
  
    const consultaAPI = async () => {
        const isAdmin = {isAdmin: user.isAdmin};
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
    return (
        <>
        <div className="page-header d-flex justify-content-between align-items-center">
          <h1 className="page-heading">Administradores</h1>
        </div>
        <section className="mb-5">
          <Card className="card-table">
            <Table
              className=" mb-1 table-borderless table-hover table-light table-striped w-100"
              responsive
            >
              <thead className="table-dark text-light">
                <tr>
                  <th>Nombre de usuario</th>
                  <th>email</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuarios) => (
                 
                 usuarios.isAdmin ?  (<tr key={usuarios._id}>
                 <td>{usuarios.userName}</td>
                 <td>{usuarios.userEmail}</td>
                 {usuarios.isAdmin ? <td>Administrador</td> : null}
               </tr>) : null
                ))}
              </tbody>
            </Table>
            <Card.Footer></Card.Footer>
          </Card>
        </section>
      </>
    );
};

export default TablaAdmins;

