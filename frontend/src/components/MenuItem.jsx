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
    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 vh-100 align-self-center">
      <div class="card">
        <div className="card-body">
          {/* ACÁ ESTAN LAS ESTRELLAS {props.product.rating.length} */}
          <h4 className="card-link text-center">⭐⭐⭐⭐⭐</h4>
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
            <button className="btn btn-secondary dropdown-toggle w-100 rounded-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Seleccione subcategoría
            </button>
            <div className="dropdown-menu w-100 btnSubCategory m-0 p-0" aria-labelledby="dropdownMenuButton">
              {props.product.subcategories.map((sub)=>{
                return <SubCategoryName subData={sub} display={displayOneSubcategory}/>
              })}
            </div>
          </div>
        
        
        {filteredDisplaySubcategory.length !== 0 ? filteredDisplaySubcategory.map((sub) => (
          <>
            <SubCategory
              sub={sub}
              picture={props.product.picture}
              name={props.product.name}
            />
          </>
        )):
        <div classNAme="card-body">
          <h3>Seleccione una Subcategoria</h3>
        </div>
        }          
      </div>
    </div>    
  );
};

export default MenuItems;
