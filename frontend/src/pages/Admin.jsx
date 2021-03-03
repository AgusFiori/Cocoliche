import React, { useEffect, useState } from "react";
import productActions from "../redux/actions/productActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Product from "../components/Product.jsx";

const Admin = (props) => {
  const [product, setProduct] = useState({});
  const [pathImage, setPathImage] = useState("/assets/losago.png");
  const [file, setFile] = useState();
  const [products, setProducts] = useState([]);

  const { allProducts } = props;

  useEffect(() => {
    props.getProducts();
  }, []);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

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

  const remove = (e, id) => {
    e.preventDefault();
    props.deleteProduct(id);
  };

  const addProduct = (e) => {
    e.preventDefault();
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
        <img className="" src={pathImage} alt="Producto" />
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Delay</th>
            <th>Stock</th>
            <th>Picture</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Delete</th>
            <th>Delete</th>
            <th>Delete</th>
            <th>Delete</th>
            <th>Delete</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return <Product product={product} remove={remove} />;
            })}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.productR.allProducts,
  };
};

const mapDispatchToProps = {
  addProduct: productActions.addProduct,
  getProducts: productActions.getProducts,
  deleteProduct: productActions.deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
