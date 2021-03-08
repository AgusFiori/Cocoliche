import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import SubCategory from "./SubCategory.jsx";

const MenuItems = (props) => {
  return (    
         
      
      <div className="col-3 align-self-center">
        <div class="card">
          <img
            src={`${props.product.picture}`}
            alt="Comida"
            class="card-img-top"
          ></img>
          <div className="card-body">
            <h3 className="card-title">{props.product.name}</h3>
            <p className="card-text">{props.product.description}</p>
          </div>          
          {props.product.subcategories.map((sub) => (
            <SubCategory
              sub={sub}
              picture={props.product.picture}
              name={props.product.name}
            />
          ))}
          <div className="card-body">
            <h4 className="card-link">{props.product.rating.length}⭐</h4>
          </div>
          
        </div>
      </div>
              
    
  );
};

export default MenuItems;
