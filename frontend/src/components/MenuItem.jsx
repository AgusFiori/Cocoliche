import React, { useState, useEffect } from "react";
import SubCategory from "./SubCategory.jsx";
import SubCategoryName from "./SubCategoryName";
import Rating from "react-rating";
import productActions from "../redux/actions/productActions.js";
import { connect } from "react-redux";

const MenuItems = (props) => {
  const [displaySubcategory, setDisplaySubcategory] = useState([]);
  const [filteredDisplaySubcategory, setFilteredDisplaySubcategory] = useState(
    []
  );

  useEffect(() => {
    setDisplaySubcategory(props.product.subcategories);
  }, []);

  const displayOneSubcategory = (_id) => {
    setFilteredDisplaySubcategory(
      displaySubcategory.filter((subcategory) => {
        return subcategory._id === _id;
      })
    );
  };

  const handleChange = (e) => {
    props.rateProduct(e, props.product._id, props.loggedUser.token);
  };

  let arr = [];

  props.product.rating.map((rating) => arr.push(rating.value));

  // console.log(arr.reduce(reducer));

  console.log(arr);

  if (arr.length) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var avgRating = arr.reduce(reducer) / arr.length;
  }

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 align-self-center">
      <div class="card">
        <div className="card-body">
          {/* ACÁ ESTAN LAS ESTRELLAS {props.product.rating.length} */}
          <Rating
            fractions={2}
            onChange={handleChange}
            initialRating={avgRating}
          />
          {/* <h4 className="card-link text-center">⭐⭐⭐⭐⭐</h4> */}
        </div>
        <img
          src={`${props.product.picture}`}
          alt="Comida"
          class="card-img-top rounded-0"
        ></img>
        <div className="card-body">
          {/* <h3 className="card-title">{props.product.name}</h3> */}
          <h3 className="card-text text-center">{props.product.description}</h3>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle w-100 rounded-0"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Seleccione subcategoría
          </button>
          <div
            className="dropdown-menu w-100 btnSubCategory m-0 p-0"
            aria-labelledby="dropdownMenuButton"
          >
            {props.product.subcategories.map((sub) => {
              return (
                <SubCategoryName
                  subData={sub}
                  display={displayOneSubcategory}
                />
              );
            })}
          </div>
        </div>

        {filteredDisplaySubcategory.length !== 0
          ? filteredDisplaySubcategory.map((sub) => (
              <>
                <SubCategory
                  sub={sub}
                  picture={props.product.picture}
                  name={props.product.name}
                />
              </>
            ))
          : ""}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authReducer.loggedUser,
  };
};

const mapDispatchToProps = {
  rateProduct: productActions.rateProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
