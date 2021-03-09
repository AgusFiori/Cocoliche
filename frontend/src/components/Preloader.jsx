import React from "react";

const Preloader = () => {
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col mx-auto text-center">
                <span className="preloader-title">Cooking in progress..</span>
                <div id="cooking">
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div id="area">
                        <div id="sides">
                            <div id="pan"></div>
                            <div id="handle"></div>
                        </div>
                        <div id="pancake">
                            <div id="pastry"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Preloader;
