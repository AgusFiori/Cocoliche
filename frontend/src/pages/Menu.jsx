import React, { useEffect } from "react";
import { connect } from "react-redux";
import productActions from "../redux/actions/productActions";

const Menu = (props) => {
  const { getProducts } = props;

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <div>
        <h2>Filtros</h2>
        <select>
          <option>Precio ascendente</option>
          <option>Precio descendente</option>
          <option>Popularidad</option>
        </select>
      </div>
      <div>
        <h2>Menu</h2>
        {props.allProducts.map((product) => (
          <div>
            <h3>{product.name}</h3>
            <img
              src={`${product.picture}`}
              alt="Comida"
              style={{ width: "200px" }}
            ></img>
            <select defaultValue="default">
              <option value="default">Elegi una opcion</option>
              {product.subcategories.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.subcategory} --- {category.subcategoryPrice}
                </option>
              ))}
            </select>
            <p>{product.description}</p>
            <h4>{product.rating.length}⭐</h4>
          </div>
        ))}
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
  getProducts: productActions.getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
