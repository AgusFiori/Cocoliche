import React, { useState, useEffect } from "react";
import SubCategory from "./SubCategory.jsx";
//import SubCategoryName from "./SubCategoryName";
import Rating from "react-rating";
import productActions from "../redux/actions/productActions.js";
import { connect } from "react-redux";
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

const MenuItems = (props) => {
  const [displaySubcategory, setDisplaySubcategory] = useState([

  ]);
  const [filteredDisplaySubcategory, setFilteredDisplaySubcategory] = useState(
    [props.product.subcategories[0]]
  );
  useEffect(() => {
    setDisplaySubcategory(props.product.subcategories);
  }, []);
 
  const display = (_id) => {
    setFilteredDisplaySubcategory(
      displaySubcategory.filter((subcategory) => {
        return subcategory._id === _id;
      })
    );
  };

  const handleChange = (e) => {
    props.loggedUser? 
    props.rateProduct(e, props.product._id, props.loggedUser.token):
    alert("logueate")
  };

  let arr = [];

  props.product.rating.map((rating) => arr.push(rating.value));

  if (arr.length) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var avgRating = arr.reduce(reducer) / arr.length;
  }
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
      <div className="d-flex flex-column menuCard">
        <div className="menuCardImg" style={{backgroundImage: `url(${props.product.picture})`}}>
          <Rating
                fractions={2}
                onChange={handleChange}
                placeholderRating={avgRating}
                emptySymbol={<AiOutlineStar className="icon emptyStar" />}
                placeholderSymbol={<AiFillStar  className="icon placeholderStar" />}
                fullSymbol={<AiFillStar className="icon fullStar" />}
                className="p-0 m-0"
              />
          </div>
          <div className="menuCardBody">
            {props.product.subcategories.length ===1?
              <span className="menuCardBodyText">{props.product.subcategories[0].subcategory}</span>
              :
              <select className="menuCardBodyTextSelect" onChange={(e)=> display(e.target.value)} on>
                {props.product.subcategories.map((sub) => {
                  return (
                    <option className="menuCardBodyTextSelect" value={sub._id}>{sub.subcategory}</option>
                  );
                })}
              </select>
            }
          
            {filteredDisplaySubcategory.length !== 0
              && filteredDisplaySubcategory.map((sub) => (
                  <>
                    <SubCategory
                      sub={sub}
                      picture={props.product.picture}
                      name={props.product.name}
                    />
                </>
              ))
            }
          </div>
         
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
