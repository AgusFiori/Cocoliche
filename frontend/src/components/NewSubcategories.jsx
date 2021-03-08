import React, { useState } from "react";

// ESTE COMPONENTE SE ENCARGA DE MODIFICAR LAS SUBCATEGORIAS EXISTENTES

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

  console.log(modSubcategory)

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
        <>
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
          <td>
            <button onClick={() => props.aceptarModif(modSubcategory, props.id)}>
              Aceptar
            </button>
          </td>
          <td>
            <button onClick={() => setVisible(!visible)}>Cancelar</button>
          </td>          
        </>
      )}
    </>
  );
};

export default NewSubcategories;
