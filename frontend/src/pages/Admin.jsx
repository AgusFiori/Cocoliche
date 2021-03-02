import React, { useState } from "react";
import productActions from "../redux/actions/productActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { connect } from "react-redux";

const Admin = (props) => {
  const [product, setProduct] = useState({});
  const [pathImage, setPathImage] = useState("/assets/losago.png");
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
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

  const addProduct = () => {
    // if (
    //   !product.name ||
    //   !product.price ||
    //   !product.description ||
    //   !product.picture ||
    //   !product.category ||
    //   !product.delay
    // ) {
    //   alert("Debe completar todos los campos");
    // } else {
    props.addProduct(product, file);
    // }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Precio"
          onChange={handleChange}
        />

        <input
          type="text"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        />
        <input
          type="file"
          id="productPicture"
          name="file"
          onChange={onFileChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          onChange={handleChange}
        />
        <input
          type="text"
          name="delay"
          placeholder="Demora estimada"
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Descripcion"
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={addProduct}>Enviar</button>
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     loggedUser: state.authR.loggedUser
//   }
// }

const mapDispatchToProps = {
  addProduct: productActions.addProduct,
};

export default connect(null, mapDispatchToProps)(Admin);
