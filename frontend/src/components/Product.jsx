import React, { useState } from "react";
import { connect } from "react-redux";
import productActions from "../redux/actions/productActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import NewSubcategories from "./NewSubcategories";
import DbSubcategories from "./DbSubcategories"

const Product = (props) => {
  const [visible, setVisible] = useState(false);
  const [visibleSub, setVisibleSub] = useState(false);
  const [editProduct, setEditProduct] = useState({
    name: props.product.name,
    price: props.product.price,
    category: props.product.category,
    delay: props.product.delay,
    stock: props.product.stock,
    description: props.product.description,
    picture: props.product.picture,
    id: props.product._id,
  });
  const [pathImage, setPathImage] = useState("/assets/losago.png");
  const [file, setFile] = useState();
  const [subCategory, setSubCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);

  // VARIABLE CONTADOR

  let contador = 0;

  // *****************************************
  // EDICION DE PRODUCTOS
  // CAPTURA INPUTS DE EDICION DE PRODUCTO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  // SHORTCUT PARA ALERTAS DE ERROR
  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
  };

  // ENVIA CAMBIOS A BASE DE DATOS
  const sendEdit = () => {
    let newFile = file ? file : props.product.picture;
    props.editProduct(editProduct, newFile);
    setVisible(!visible);
  };

  // FUNCION PARA CAPTURAR FILES (FOTOS)
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const compressedFile = new Compressor(file, {
          quality: 0.5,
          success(result) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = function load() {
              setPathImage(reader.result);
            };
          },
        });
        setFile(compressedFile);
      } else {
        errorAlert(
          "error",
          "Something went wrong!",
          "Files must be of an image type"
        );
      }
    }
  };
  // *****************************************
  // FIN EDICION DE PRODUCTOS

  // *****************************************
  // EDICION DE SUBCATEGORIAS LOCALES

  const addSubcategory = () => {
    setVisibleSub(!visibleSub);
    subCategories.push(subCategory);
  };

  const handleSubcategory = (e) => {
    // subcategory
    const { name, value } = e.target;
    setSubCategory({ ...subCategory, [name]: value});
  };

  const agregarSubcategoria = () => {
    setVisibleSub(!visibleSub);
  };

  const aceptarModif = (subCat, id) => {
    // ESTO NO FUNCIONA, TENDRIA QUE ESTAR EN UNA VARIABLE PROBABLEMENTE?
    subCategories.map((subcategory) => {
      if (subcategory.id === id) {
        return (subcategory = subCat);
      }
      return subcategory;
    });
  };

  const confirmChanges = () => {
    props.addSubcategories(subCategories, props.product._id);
  };

  console.log(props)

  // ******************************************
  // FIN EDICION DE SUBCATEGORIAS LOCALES

  return (
    <>
      {!visible ? (
        <>
          <tr>
            <td>{props.product.name}</td>
            <td>{props.product.category}</td>
            <td>{props.product.description}</td>
            <td>{props.product.delay}</td>
            <td>
              <img
                src={`${props.product.picture}`}
                style={{ width: "100px", height: "100px" }}
                alt="a"
              ></img>
            </td>
            <td>
              <button onClick={() => setVisible(!visible)}>Editar</button>
            </td>
            <td>
              <button onClick={(e) => props.remove(e, props.product._id)}>
                Borrar
              </button>
            </td>
          </tr>
        </>
      ) : (
        <>
          {" "}
          <td>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              defaultValue={props.product.name}
            />
          </td>
          <td>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              defaultValue={props.product.category}
            />
          </td>
          <td>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              defaultValue={props.product.description}
            />
          </td>
          <td>
            <input
              type="number"
              name="delay"
              onChange={handleChange}
              defaultValue={props.product.delay}
            />
          </td>
          <td>
            <img
              src={`${editProduct.file}`}
              style={{ width: "100px", height: "100px" }}
              alt="a"
            ></img>
            <img
              src={`${pathImage}`}
              style={{ width: "100px", height: "100px" }}
              alt="a"
            ></img>
            <input type="file" name="picture" onChange={onFileChange} />
          </td>
          <button onClick={() => sendEdit()}>ENVIAR</button>
          <button onClick={() => setVisible(!visible)}>CANCELAR</button>
        </>
      )}
      {!visibleSub ? (
        <>
          <>
            {props.product.subcategories.map((subcategory) => (
              <>
              <tr>
                <th colspan="2">Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                {/* <th>Editar</th>
                <th>Eliminar</th> */}
              </tr>
              <tr>
                <DbSubcategories idProduct={props.product._id} subcategoryDb={subcategory} />
              </tr>
              </>
            ))}
          </>
          <tr>
            <td>subcategorias del producto</td>
            {subCategories.map((newSubCategory) => {
              return (
                <NewSubcategories
                  newSubCategory={newSubCategory}
                  productId={props.product._id}
                  aceptarModif={aceptarModif}
                />
              );
            })}
          </tr>
          <button onClick={agregarSubcategoria}>Agregar Subcategoria</button>
          <button onClick={confirmChanges}>Confirmar cambios</button>
        </>
      ) : (
        <>
          <td>
            <input
              type="text"
              name="subcategory"
              onChange={handleSubcategory}
              placeholder="Nombre de subcategoria"
            />
          </td>
          <td>
            <input
              type="number"
              name="subcategoryPrice"
              onChange={handleSubcategory}
              placeholder="Precio"
            />
          </td>
          <td>
            <input
              type="number"
              name="subcategoryStock"
              onChange={handleSubcategory}
              placeholder="Stock"
            />
          </td>
          <td>
            <button onClick={addSubcategory}>Añadir subcategoría</button>
            <button onClick={() => setVisibleSub(!visibleSub)}>Cancelar</button>
          </td>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = {
  deleteProduct: productActions.deleteProduct,
  editProduct: productActions.editProduct,
  addSubcategories: productActions.addSubcategories,
};

export default connect(null, mapDispatchToProps)(Product);
