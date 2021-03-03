import React, { useState } from "react";
import { connect } from "react-redux";
import productActions from "../redux/actions/productActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";

const Product = (props) => {
  const [visible, setVisible] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
  };

  const sendEdit = () => {
    let newFile = file ? file : props.product.picture;
    props.editProduct(editProduct, newFile);
    setVisible(!visible);
  };

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

  console.log(editProduct);

  return (
    <>
      {!visible ? (
        <tr>
          <td>{props.product.name}</td>
          <td>{props.product.price}</td>
          <td>{props.product.category}</td>
          <td>{props.product.delay}</td>
          <td>{props.product.stock}</td>
          <td>{props.product.description}</td>
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
              name="price"
              onChange={handleChange}
              defaultValue={props.product.price}
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
              name="delay"
              onChange={handleChange}
              defaultValue={props.product.delay}
            />
          </td>
          <td>
            <input
              type="text"
              name="stock"
              onChange={handleChange}
              defaultValue={props.product.stock}
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
    </>
  );
};

const mapDispatchToProps = {
  deleteProduct: productActions.deleteProduct,
  editProduct: productActions.editProduct,
};

export default connect(null, mapDispatchToProps)(Product);
