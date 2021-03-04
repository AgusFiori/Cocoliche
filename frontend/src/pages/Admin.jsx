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
  const [subCategory, setSubCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const { allProducts } = props;
  const { getProducts, getCategories } = props;

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log(product);
  };

  const handleSubcategory = (e) => {
    // subcategory
    const { name, value } = e.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleChangeCategory = (e) => {
    const value = e.target.value;
    setNewCategory(value);
  };

  const submitCategory = (e) => {
    e.preventDefault();
    props.createCategory(newCategory);
  };

  const addSubcategory = () => {
    subCategories.push(subCategory);
    setProduct({ ...product, subcategories: subCategories });
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
    //   !product.category ||
    //   !product.delay
    // ) {
    //   alert("Debe completar todos los campos");
    // } else {
    props.addProduct(product, file);
    // }
  };

  console.log(props);

  return (
    <div>
      <div>
        <input
          type="text"
          name="category"
          placeholder="Crear categoria"
          onChange={handleChangeCategory}
        />
        <button onClick={submitCategory}>Enviar</button>
      </div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
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
        {props.allCategories.length && (
          <select
            type="select"
            defaultValue="default"
            onChange={handleChange}
            name="category"
          >
            <option value="default" disabled>
              Create category
            </option>
            {props.allCategories.map((category) => (
              <option
                key={category.category}
                value={category.category}
                name="category"
              >
                {category.category}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategorias"
          onChange={handleSubcategory}
        />
        <input
          type="text"
          name="subcategoryPrice"
          placeholder="Precio"
          onChange={handleSubcategory}
        />
        <button onClick={addSubcategory}>Agregar</button>
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
            <th>Category</th>
            <th>Subcategory</th>
            <th>Description</th>
            <th>Delay</th>
            <th>Stock</th>
            <th>Picture</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <Product key={product._id} product={product} remove={remove} />
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.productR.allProducts,
    allCategories: state.productR.allCategories,
  };
};

const mapDispatchToProps = {
  addProduct: productActions.addProduct,
  getProducts: productActions.getProducts,
  deleteProduct: productActions.deleteProduct,
  createCategory: productActions.createCategory,
  getCategories: productActions.getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
