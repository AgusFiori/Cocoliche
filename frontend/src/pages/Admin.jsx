import React, { useEffect, useState } from "react";
import productActions from "../redux/actions/productActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Product from "../components/Product.jsx";
import CreateEvent from '../components/CreateEvent'
import agregarProducto from '../assets/agregar-producto.jpg'
import Navbar from "../components/Navbar";

const Admin = (props) => {
  const [product, setProduct] = useState({});
  const [pathImage, setPathImage] = useState(agregarProducto);
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
    e.stopPropagation();
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
    e.stopPropagation();
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


  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 p-0" >
          <Navbar />
        </div>
        <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10 mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-8 d-flex flex-column mx-auto">
            <span className="h3">Crear una nueva Categoría de Productos</span>
              <input
                className="my-3 h5 pl-3"
                type="text"
                name="category"
                placeholder="Crear categoria"
                onChange={handleChangeCategory}
              />
              <button onClick={submitCategory} className="h4">Enviar</button>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-8 d-flex flex-column mx-auto">
              <span className="h3">Cargar un nuevo Producto</span>
              <input
                className="h5 pl-3"
                type="text"
                name="name"
                placeholder="Nombre del producto"
                onChange={handleChange}/>
              <input
                className="my-2 h5 pl-3"
                type="text"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
              />
              <input
              className="d-none"
                type="file"
                id="productPicture"
                name="file"
                onChange={onFileChange}
              />
              <label htmlFor="productPicture" className="text-center d-flex flex-column align-items-center">
                <span className="h4">Cargar imagen del Producto</span>
                <span className="h6">Tamaño recomendado 200px * 200px</span>
                <img className="img-prev" src={pathImage} alt="Producto" />
              </label>
              {props.allCategories.length && (
                <select
                  className="my-2 h5 p-1"
                  defaultValue="default"
                  onChange={handleChange}
                  name="category"
                >
                  <option value="default" disabled>
                    Seleccione la Categoria del Producto
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
                  className="h5 pl-3"
                  type="number"
                  name="delay"
                  placeholder="Demora estimada"
                  onChange={handleChange}
                />
                <textarea
                  className="my-2 h5 p-3"
                  minLength='25'
                  maxlength='140'
                  type="text"
                  name="description"
                  placeholder="Descripcion del producto"
                  onChange={handleChange}
                />
                <button onClick={addProduct} className="h4">Enviar</button>
                <span className="h5">Agregar SubCategoria del producto</span>
                <input
                  className="h5 pl-3"
                  type="text"
                  name="subcategory"
                  placeholder="Subcategorias"
                  onChange={handleSubcategory}
                />
                <input
                  className="h5 pl-3"
                  type="text"
                  name="subcategoryPrice"
                  placeholder="Precio"
                  onChange={handleSubcategory}
                />
                <button onClick={addSubcategory} className="h4">Agregar</button>
            </div>
          </div>
          
          <div className="row mt-3">
            <div className="col-sm-12 col-md-8 col-lg-10 d-flex flex-column mx-auto">
              <span className="h1">Listado de Productos</span>
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
          </div>
          
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-8 mx-auto">
              <CreateEvent/>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </>
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
