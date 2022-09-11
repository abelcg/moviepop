import React, { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validarEmail } from "../helpers/helper";

const Signup = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [error, setError] = useState(false);
  const [errorMje, setErrorMje] = useState({});

  const URL = process.env.REACT_APP_API_URL + "register";
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los datos del form
    if (validarEmail(email)) {
      // reset el state de error
      setError(false);
      // crear un nuevo usuario
      const nuevoUsuario = {
        name: name,
        email: email,
        password: password,
        passwordCheck: passwordCheck,
      };

      try {
        const parametros = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoUsuario),
        };
        const respuesta = await fetch(URL, parametros);
        const dato = await respuesta.json();
        
        if (dato.status === 201) {
          // mostrar cartel al usuario
          Swal.fire(
            "Usuario registrado!",
            "Usuario creado correctamente",
            "success"
          );
          // resetear el formulario
          e.target.reset(); 
          // redireccion a la pagina principal
          navigation("/");
        } else {
          setError(true);
          const msg =   Object.values(dato.message)
          .map((value) => {
            return value.toString();
          })
          dato.message && setErrorMje(msg);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //mostral cartel de error
      setError(true);
      setError(true);
      setErrorMje("Debe ingresar un email valido");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-3">
        <Form.Label>Nombre Completo*</Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Juan Perez"
          maxLength="30"
          required=""
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Form.Label>Email*</Form.Label>
        <Form.Control
          type="email"
          placeholder="juanperez@ejemplo.com"
          maxLength="30"
          required=""
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Form.Label>Password*</Form.Label>
        <div className="password-toggle">
          <Form.Control
            type={passwordShown ? "text" : "password"}
            id="su-password"
            maxLength="70"
            required=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            className="password-toggle-btn text-dark btn"
            type="button"
            onClick={togglePassword}
          >
            {passwordShown ? (
              <BsEyeSlashFill></BsEyeSlashFill>
            ) : (
              <BsEyeFill></BsEyeFill>
            )}
          </a>
        </div>
      </div>
      <div className="mb-3">
        <Form.Label>Confirmar password*</Form.Label>
        <div className="password-toggle">
          <Form.Control
            type={passwordShown ? "text" : "password"}
            maxLength="70"
            required=""
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <a
            className="password-toggle-btn text-dark btn"
            type="button"
            onClick={togglePassword}
          >
            {passwordShown ? (
              <BsEyeSlashFill></BsEyeSlashFill>
            ) : (
              <BsEyeFill></BsEyeFill>
            )}
          </a>
        </div>
      </div>
      <button className="btn btn-dark bg-principal btn-shadow d-block w-100" type="submit">
        Regístrate
      </button>
      {error === true ? (
        <Alert variant="danger" onClick={() => setError(false)} dismissible>
          <p> {typeof errorMje==="Object"? errorMje.toString(): errorMje}</p>
        </Alert>
      ) : null}
      
    </Form>
  );
};

export default Signup;
