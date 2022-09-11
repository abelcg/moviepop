import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContainerCards from "../../common/ContainerCards";

const PaginaPrincipal = () => {
  return (
    <>
      <section className="mt-4">
        <Container>
          <Row>
            <Col lg={12}>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2 bg-transparent mb-4 border-opacity-50 rounded text-light"
              aria-label="Buscar"
            />
            </Form>
              <h4 className="mb-4 ps-4 text-light">Películas</h4>
              <hr />
              <ContainerCards></ContainerCards>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PaginaPrincipal;
