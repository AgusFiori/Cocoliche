import React, { useState, useEffect } from "react";
import SubCategory from "./SubCategory.jsx";

const MenuItems = (props) => {
  return (
    <div>
      <div>
        <h3>{props.product.name}</h3>
        <img
          src={`${props.product.picture}`}
          alt="Comida"
          style={{ width: "200px" }}
        ></img>
        {props.product.subcategories.map((sub) => (
          <SubCategory
            sub={sub}
            picture={props.product.picture}
            name={props.product.name}
          />
        ))}

        <p>{props.product.description}</p>
        <h4>{props.product.rating.length}⭐</h4>
      </div>
    </div>
  );
};

export default MenuItems;
