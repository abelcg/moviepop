import React, { useState } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

const ModalLoginSignup = (props) => {
    const [key, setKey] = useState("login");
      return (
          <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton className="text-gold bg-principal">Login/Signup</Modal.Header>
          <Tabs id="tab" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab
              eventKey="login"
              title="Iniciar sesión"
              className="bg-transparent fw-medium border-0"
            >
              <Modal.Body className="card-body py-4 text-gold">
              <Login></Login>
              </Modal.Body>
            </Tab>
            <Tab
              eventKey="signup"
              title="Regístrate"
              className="bg-transparent fw-medium border-0 text-gold"
            >
              <Modal.Body className="card-body py-4">
              <Signup></Signup>
              </Modal.Body>
            </Tab>
          </Tabs>
        </Modal>
      );
  };

export default ModalLoginSignup;
