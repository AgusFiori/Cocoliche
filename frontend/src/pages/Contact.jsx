import React from "react";
import Navbar from "../components/Navbar";
import fondo3 from '../assets/fondos/fondo-3.jpg'
import {Form, Button} from "react-bootstrap"

const Contact = () => {
  return (
    <div className="container-fluid d-flex p-0 menu-responsive " >
      <Navbar />
      <div className="container calendar-fondo " style={{backgroundImage: `url(${fondo3})`}} >
        <div className="row ">
          
            <div className="col-sm-12 col-md-8 col-lg-5 col-xl-5 trasparent text-center mx-auto my-auto">
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
                    <option>recursos humanos</option>
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
            <div className="col-sm-12 col-md-8 col-lg-5 col-xl-5 trasparent mx-auto my-auto">
              <iframe width="100%" height="315" src="https://www.youtube.com/embed/ghM0aBOvDVE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <h4 className="mt-3">Teléfonos</h4>
              <p>0223 481 8202 / 410 9133 / 410 9169 / 4644812</p>
              <p>contacto@cocoliche.com</p>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
