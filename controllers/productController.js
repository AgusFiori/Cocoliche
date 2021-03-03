const Product = require('../models/Product.js')
const path = require('path')


const productController = {
  getProducts: async (req, res) => {
    try {
      const data = await Product.find()
      res.json({
        success: true,
        response: data
      })
    } catch (error) {
      res.json({
        success: false,
        response: error
      })
    }
  },
  addProduct: (req, res) => {
    const { name, price, description, stock, picture, category } = req.body

    // const file = req.files.file
    // file.mv(path.join(__dirname, '../client/build/assets/productPictures/' + file.md5 + ".jpeg"), error => {
    //   if (error) {
    //     return res.json({ response: error })
    //   }
    // })

    // const productPicturesLocation = `/assets/productPictures/${file.md5}.jpeg`



    const newProduct = new Product({
      name, price, description, stock, picture, category
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
    const { name, price, description, stock, picture, category,
      productId } = req.body

    Product.findOneAndUpdate(
      { '_id': productId },
      {
        $set: {
          name: name,
          price: price,
          description: description,
          stock: stock,
          picture: picture,
          category: category
        }
      },
      { new: true }
    )
      .then(editedProduct => { return res.json({ success: true, response: editedProduct }) })
      .catch(error => { return res.json({ success: true, response: error }) })
  },
  deleteProduct: (req, res) => {

    console.log('paso')
    // console.log(req.params)
    const { productId } = req.params

    Product.deleteOne({ "_id": productId })
      .then(response => { return res.json({ success: true, response }) })
      .catch(error => { return res.json({ success: false, response: error }) })

  }
}

module.exports = productController