import React from "react";
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 bg-secondary position-sticky">
          <Navbar/>
        </div>
        <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10 bg-primary">
          <h1>Hola</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
