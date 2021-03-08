import React, { useState, useEffect } from "react";
import SubCategory from "./SubCategory.jsx";
import SubCategoryName from "./SubCategoryName"

const MenuItems = (props) => {

  const [displaySubcategory, setDisplaySubcategory] = useState([])
  const [filteredDisplaySubcategory, setFilteredDisplaySubcategory] = useState([])

  useEffect(()=>{
    setDisplaySubcategory(props.product.subcategories)
  }, [])

  const displayOneSubcategory=(_id)=>{
    setFilteredDisplaySubcategory(displaySubcategory.filter(subcategory=>{return subcategory._id === _id}))
  }

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-2 vh-100 align-self-center">
      <div class="card">
        <div className="card-body">
          <h4 className="card-link">{props.product.rating.length}⭐</h4>
        </div>
        <img
          src={`${props.product.picture}`}
          alt="Comida"
          class="card-img-top"
        ></img>
        <div className="card-body">
          <h3 className="card-title">{props.product.name}</h3>
          <p className="card-text">{props.product.description}</p>
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Seleccione subcategoría
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {props.product.subcategories.map((sub)=>{
              return <SubCategoryName subData={sub} display={displayOneSubcategory}/>
            })}
          </div>
        </div>
        {filteredDisplaySubcategory !== 0 ? filteredDisplaySubcategory.map((sub) => (
          <>
            <SubCategory
              sub={sub}
              picture={props.product.picture}
              name={props.product.name}
            />
          </>
        )):
        <h1>Seleccione una categoria</h1>
        }          
      </div>
    </div>    
  );
};

export default MenuItems;
