import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/MenuItem";
import productActions from "../redux/actions/productActions";
import cartActions from "../redux/actions/cartActions";
import Navbar from "../components/Navbar";

const Menu = (props) => {
  const { getProducts, getCart } = props;
  const [checked, setChecked] = useState("entrada");

  console.log(props);

  useEffect(() => {
    getProducts();
    getCart();
  }, [getProducts, getCart]);

  const handleChange = (e) => {
    console.log(e.target.value);
    // setChecked(e.target.value)
  };

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2 p-0">
          <Navbar />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center">
              <h2 className="px-2 py-4">Filtros</h2>
              {/* Entrada, principal, bebida s/alcohol, bebida c/alcohol, postre */}
              <form>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="entrada"
                    value="entrada"
                    onChange={handleChange}
                  ></input>
                  <label className="form-check-label" for="entrada">
                    Entrada
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    id="principal"
                    value="principal"
                    onChange={handleChange}
                  ></input>
                  <label className="form-check-label" for="principal">
                    Plato principal
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    id="sinAlcohol"
                    value="sinAlcohol"
                    onChange={handleChange}
                  ></input>
                  <label className="form-check-label" for="beb">
                    Bebida sin alcohol
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    id="conAlcohol"
                    value="conAlcohol"
                    onChange={handleChange}
                  ></input>
                  <label className="form-check-label" for="conAlcohol">
                    Bebida con alcohol
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    id="postre"
                    value="postre"
                    onChange={handleChange}
                  ></input>
                  <label className="form-check-label" for="postre">
                    Postre
                  </label>
                  <button type="submit" className="btn btn-primary">
                    Aplicar
                  </button>
                </div>
              </form>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
              <h2 className="text-center py-4">Menu</h2>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="row justify-content-center">
                {props.allProducts.map((product) =>
                  product.category ? (
                    <MenuItem key={product._id} product={product} />
                  ) : (
                    ""
                  )
                )}
                {/* {props.allProducts.map((product) => (
                  <MenuItem key={product._id} product={product} />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.productR.allProducts,
  };
};

const mapDispatchToProps = {
  getCart: cartActions.getCart,
  getProducts: productActions.getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
