import React from "react";
import Navbar from "../components/Navbar";
import blackboard from '../assets/blackboard.jpg'
import banner_1 from '../assets/Img/banner_1.jpg'

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 position-sticky nav-coco" style={{backgroundImage: `url(${blackboard})`}}>
          <Navbar />
        </div>
        <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10 bg-primary">
            <div className="row">
              <div className="col-sm-12 col-lg-5 banner" style={{backgroundImage: `url(${banner_1})`}}>

              </div>
              <div className="col-7">
                <div className="container-fluid">
                  <div className="row"></div>
                  <div className="row"></div>
                  <div className="row"></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
