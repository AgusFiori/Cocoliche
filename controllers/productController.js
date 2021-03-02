const Product = require('../models/Product.js')
const path = require('path')


const productController = {
  addProduct: (req, res) => {
    const { name, price, description, stock, picture, category } = req.body

    const file = req.files.file
    file.mv(path.join(__dirname, '../client/build/assets/productPictures/' + file.md5 + ".jpeg"), error => {
      if (error) {
        return res.json({ response: error })
      }
    })

    const productPicturesLocation = `/assets/productPictures/${file.md5}.jpeg`



    const newProduct = new Product({
      name, price, description, stock, picture: productPicturesLocation, category
    })
    // GUARDA, PERO DA UN ERROR DE MENSAJE EN LOS HEADERS QUE SE ENVIAN
    newProduct.save()
      .then(newProduct => { return res.json({ success: true, response: newProduct }) })
      .catch(error => { return res.json({ success: true, response: error }) })
    console.log(newProduct)
    // newProduct.save()
    //   .then(newProduct => { return res.json({ success: true, response: newProduct }) })
    //   .catch(error => { return res.json({ success: true, response: error }) })
  },
  editProduct: (req, res) => {
    console.log('conectado')
  }
}

module.exports = productController