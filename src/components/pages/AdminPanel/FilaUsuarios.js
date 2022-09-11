import React from 'react';
import Form from "react-bootstrap/Form";

const FilaUsuarios = (props) => {
    return (
        <tr key={props.usuarios.id}>
                  <td>{props.usuarios.name}</td>
                  <td>{props.usuarios.email}</td>
                  <td>
                   { props.usuarios.isAdmin? (<Form>
                       <p>¿Es admin?</p>
                       {props.usuarios.isAdmin ? 
                      (<Form.Check
                        type="switch"
                        id="custom-switch"
                        label="SI"
                        checked
                        onChange={()=> props.cambiarRol(props.usuarios.id)}
                      />) : (<Form.Check
                      type="switch"
                      id="custom-switch"
                      label="SI"
                      onChange={()=> props.cambiarRol(props.usuarios.id)}
                    />) }
                    </Form>) : (<Form>
                       <p>¿Es admin?</p>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="SI"
                        onChange={()=> props.cambiarRol(props.usuarios.id)}
                      />
                    </Form>)}
                  </td>
                </tr>
    );
};

export default FilaUsuarios;