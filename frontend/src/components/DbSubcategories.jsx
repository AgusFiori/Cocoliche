import { useState } from "react"
import { connect } from "react-redux"
import productActions from "../redux/actions/productActions"

// ESTE COMPONENTE SE ENCARGA DE MODIFICAR LAS SUBCATEGORIAS QUE ESTA INGRESANDO EL USUARIO


const DbSubcategories = (props) =>{

   const [visible, setVisible]=useState(false)
   const [newDbSubcategory, setNewDbSubcategory]=useState(
      {
         idSubcategory:props.subcategoryDb._id,
         subcategory:props.subcategoryDb.subcategory,
         subcategoryPrice:props.subcategoryDb.subcategoryPrice,
         subcategoryStock:props.subcategoryDb.subcategoryStock,
         idProduct:props.idProduct
   })   

   const handleChange =(e)=>{
      const {name, value, type} = e.target
      setNewDbSubcategory(
         {
            ...newDbSubcategory,
            [name]: type === "number" ? parseInt(value) : value
         })
   }

   const acceptChange=()=>{
      setVisible(!visible)
      props.modifySubcategories(newDbSubcategory)
   }

   const deleteSubcategory=()=>{
      props.delSubcategory(props.idProduct, props.subcategoryDb._id)
   }

   return (
      <>
         {!visible ?<>
            <td colspan="2">{props.subcategoryDb.subcategory}</td>
            <td>{props.subcategoryDb.subcategoryPrice}</td>
            <td>{props.subcategoryDb.subcategoryStock}</td>
            <td><button onClick={()=>setVisible(!visible)}>Editar</button></td>
            <td><button onClick={deleteSubcategory}>Eliminar</button></td>
         </>:
         <>
            <td colspan="2">
               <input 
                  type="text"
                  name="subcategory"
                  defaultValue={props.subcategoryDb.subcategory}
                  onChange={handleChange}
               />
            </td>
            <td>
               <input
                  type="number"
                  name="subcategoryPrice"
                  defaultValue={props.subcategoryDb.subcategoryPrice}
                  onChange={handleChange}
               />
            </td>
            <td>
               <input
                  type="number"
                  name="subcategoryStock"
                  defaultValue={props.subcategoryDb.subcategoryStock}
                  onChange={handleChange}
               />
            </td>
            <td>
               <button onClick={acceptChange}>Aceptar</button>
            </td>
            <td >
               <button onClick={()=>setVisible(!visible)}>Cancelar</button>
            </td>
         </>
         }
      </>
   )
}

const mapDispatchToProps={
   modifySubcategories:productActions.modifySubcategories,
   delSubcategory:productActions.delSubcategory
}

export default connect(null, mapDispatchToProps)(DbSubcategories)