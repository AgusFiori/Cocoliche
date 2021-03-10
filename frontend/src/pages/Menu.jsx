import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/MenuItem";
import Preloader from "../components/Preloader";
import productActions from "../redux/actions/productActions";
import cartActions from "../redux/actions/cartActions";
import Navbar from "../components/Navbar";
import fondo1 from "../assets/fondos/fondo-1.jpg";

const Menu = (props) => {
  const { getProducts, getCart } = props;
  const [checked, setChecked] = useState("todos");
  const [preloader, setPreloader] = useState(false);

  let filteredMenu = [];

  console.log(filteredMenu);

  useEffect(() => {
    fetch();
  }, []);

  const handleChange = (e) => {
    setChecked(e.target.value);
  };

  async function fetch() {
    await getProducts();
    getProducts();
    setPreloader(true);
  }

  const applyFilter = (e) => {
    e.preventDefault();
    console.log(filteredMenu);
  };

  switch (checked) {
    case "todos":
      props.allProducts.map((product) => filteredMenu.push(product));
      break;
    case "entrada":
      props.allProducts.map(
        (product) =>
          product.category === "entrada" && filteredMenu.push(product)
      );
      break;
    case "principal":
      props.allProducts.map(
        (product) =>
          product.category === "principal" && filteredMenu.push(product)
      );
      break;
    case "bebidas":
      props.allProducts.map(
        (product) =>
          product.category === "bebidas" && filteredMenu.push(product)
      );
      break;
    case "postre":
      props.allProducts.map(
        (product) => product.category === "postre" && filteredMenu.push(product)
      );
      break;
    default:
      filteredMenu = props.allProducts;
  }

  return (
    <div
      className="container-fluid d-flex p-0 menu-responsive"
      
    >
      <Navbar />
      {preloader ? (
        <>
          
            <div className="container-fluid d-flex flex-column calendar-fondo"style={{ backgroundImage: `url(${fondo1})`, backgroundAttachment: "fixed",
      }}>
              <h2 className="text-center pt-4">Hoy Cocina Cocoliche</h2>
              <h4 className="text-center">Conocé nuestras especialidades</h4>
              <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center">
                    <h2 className="px-2 py-4">Filtros</h2>
                    {/* Entrada, principal, bebida s/alcohol, bebida c/alcohol, postre */}
                    <form className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="todos"
                          value="todos"
                          defaultChecked={true}
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" for="todos">
                          Todos
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="entrada"
                          value="entrada"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" for="entrada">
                          Entrada
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="principal"
                          value="principal"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" for="principal">
                          Plato principal
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="bebidas"
                          value="bebidas"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" for="bebidas">
                          Bebida sin alcohol
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="bebidas"
                          value="bebidas"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" for="bebidas">
                          Bebida con alcohol
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="postre"
                          value="postre"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" for="postre">
                          Postre
                        </label>
                      </div>
                    </form>
                  </div>
                  <h2 className="text-center mx-auto">Menu</h2>
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="row justify-content-center">
                      {/* {props.allProducts.map((product) =>
                        product.category ? (
                          <MenuItem key={product._id} product={product} />
                        ) : (
                          ""
                        )
                      )} */}
                      {filteredMenu.map((product) => (
                        <MenuItem key={product._id} product={product} />
                      ))}
                      {/* {props.allProducts.map((product) => (
                  <MenuItem key={product._id} product={product} />
                ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
      ) : (
        <Preloader />
      )}
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
