import React from "react";
import Navbar from "../components/Navbar";
import blackboard from '../assets/blackboard.jpg'
import {Form, Button} from "react-bootstrap"

const Contact = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 position-sticky nav-coco" style={{backgroundImage: `url(${blackboard})`}}>
          <Navbar/>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-10  mx-auto my-auto d-flex justify-content-around text-center">
          <div className="formulario col-xl-5 col-lg-10 col-md-10 col-sm-12 mr-1 trasparent">
            <Form>
              <Form.Group className="mt-3" md="6" controlId="validationCustom03">
                <Form.Label>Nombre y Apellido</Form.Label>
                <Form.Control type="text" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>telefono</Form.Label>
                <Form.Control type="number" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Motivo de consulta</Form.Label>
                <Form.Control as="select" placeholder="Selecionar">
                  <option>ventas</option>
                  <option>recusos humanos</option>
                  <option>atencion al cliente</option>
                  <option>reclamos de calidad</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={3} style={{resize: 'none'}}/>
              </Form.Group>
              <Button className="mb-3" variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </div>
          <div className="datos trasparent col-xl-5 col-lg-10 col-md-8 col-sm-12" style={{height: '50%'}}>
            <h4 className="mt-3">Administracion</h4>
            <p>12 de Octubre 7749. Mar del Plata.
              Provincia de Buenos Aires. Argentina.</p>
            <h4 className="mt-3">Teléfonos</h4>
            <p>0223 481 8202 / 410 9133 / 410 9169 / 4644812</p>
            <h4 className="mt-3">E-mail</h4>
            <p>contactos@cocoliche.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
