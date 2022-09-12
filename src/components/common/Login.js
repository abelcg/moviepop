import React, { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validarEmail } from "../helpers/helper";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [error, setError] = useState(false);
  const [errorMje, setErrorMje] = useState("");

  const URL = process.env.REACT_APP_API_URL + "login";
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los datos del form
    if (validarEmail(email)) {
      // reset el state de error
      setError(false);
      // crear el objeto con los datos del usario a verificar
      const usuario = {
        email: email,
        password: password,
      };

      try {
        const parametros = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        };
        const respuesta = await fetch(URL, parametros);
        const dato = await respuesta.json();
        if (dato.status === 200) {
          // mostrar cartel al usuario
          Swal.fire("Usuario logueado!", "Autentificación exitosa", "success");
          // resetear el formulario
          e.target.reset();
          //Guardo el token de acceso del usuario en localStorage
          const user = {
            accessToken: dato.accessToken,
            userId: dato.user.id,
            userName: dato.user.name,
            userEmail: dato.user.email,
            isAdmin: dato.user.isAdmin,
          };
          localStorage.setItem("user", JSON.stringify(user));
          // redireccion a la pagina admin de lista de productos o a la pagina de inicio

          user.isAdmin ? navigation("/rn/admin") : window.location.reload();
        } else {
          setError(true);
          const msg = Object.values(dato.message).map((value) => {
            return value.toString();
          });
          dato.message && setErrorMje(msg);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //mostral cartel de error
      setError(true);
      setErrorMje("Debe ingresar un email valido");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="juanperez@ejemplo.com"
          maxLength="30"
          required=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="invalid-feedback">
          Por favor ingrese un email valido.
        </div>
      </div>
      <div className="mb-3">
        <Form.Label>Password</Form.Label>
        <div className="password-toggle">
          <Form.Control
            type={passwordShown ? "text" : "password"}
            maxLength="70"
            required=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="password-toggle-btn text-dark btn"
            type="button"
            onClick={togglePassword}
          >
            {passwordShown ? (
              <BsEyeSlashFill></BsEyeSlashFill>
            ) : (
              <BsEyeFill></BsEyeFill>
            )}
          </button>
        </div>
      </div>
      <div className="mb-3 d-flex justify-content-end">
        <button
          className="fs-sm text-secondary text-decoration-none btn"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Presione para el envio del email de recuperacion"
        >
          ¿Olvidó su password?
        </button>
      </div>
      <button
        className="btn btn-dark bg-principal btn-shadow d-block w-100"
        type="submit"
      >
        Iniciar Sesión
      </button>
      {error === true ? (
        <Alert variant="danger" onClick={() => setError(false)} dismissible>
          <p>
            {" "}
            {typeof errorMje === "object" ? errorMje.toString() : errorMje}
          </p>
        </Alert>
      ) : null}
    </Form>
  );
};

export default Login;
