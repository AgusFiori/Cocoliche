import React, { useState } from "react";

const NewSubcategories = (props) => {
  const [visible, setVisible] = useState(false);
  const [modSubcategory, setModSubcategory] = useState({
    subcategory: props.newSubCategory.subcategory,
    subcategoryPrice: props.newSubCategory.subcategoryPrice,
    subcategoryStock: props.newSubCategory.subcategoryStock,
  });

  const handleSubcategoryChange = (e) => {
    const { name, value } = e.target;
    setModSubcategory({ ...modSubcategory, [name]: value });
  };
  //   const aceptarModif = () => {
  //     setVisible(!visible);
  //   };

  const modificarSub = () => {
    setVisible(!visible);
  };

  console.log(props);

  return (
    <>
      {!visible ? (
        <>
          <tr>
            <td>{props.newSubCategory.subcategory}</td>
            <td>{props.newSubCategory.subcategoryPrice}</td>
            <td>{props.newSubCategory.subcategoryStock}</td>
          </tr>
          <button onClick={modificarSub}>Modificar</button>
        </>
      ) : (
        <button>
          <td>
            <input
              type="text"
              name="subcategory"
              onChange={handleSubcategoryChange}
              defaultValue={props.newSubCategory.subcategory}
            />
          </td>
          <td>
            <input
              type="number"
              name="subcategoryPrice"
              onChange={handleSubcategoryChange}
              defaultValue={props.newSubCategory.subcategoryPrice}
            />
          </td>
          <td>
            <input
              type="number"
              name="subcategoryStock"
              onChange={handleSubcategoryChange}
              defaultValue={props.newSubCategory.subcategoryStock}
            />
          </td>
          <button onClick={() => props.aceptarModif(modSubcategory, props.id)}>
            Aceptar
          </button>
          <button onClick={() => setVisible(!visible)}>Cancelar</button>
        </button>
      )}
    </>
  );
};

export default NewSubcategories;
