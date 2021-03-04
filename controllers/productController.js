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
  addProduct: async (req, res) => {
    console.log(req.body, req.body.subcategories)

    const parsedSubcategories = JSON.parse(req.body.subcategories)

    const { name, description, stock, delay, category } = req.body
    const file = req.files.file

    await file.mv(path.join(__dirname, '../frontend/public/assets/productPictures/' + file.md5 + ".jpeg"), error => {
      if (error) {
        return res.json({ response: error })
      }
    })

    const productPicturesLocation = `/assets/productPictures/${file.md5}.jpeg`

    const newProduct = new Product({
      name, description, stock, picture: productPicturesLocation, subcategories: parsedSubcategories, delay, category
    })
    newProduct.save()
      .then(newProduct => { return res.json({ success: true, response: newProduct }) })
      .catch(error => { return res.json({ success: false, response: error }) })

  },
  editProduct: async (req, res) => {
    // productId tendría que llegar de la barra de navegacion
    try {
      const { name, price, description, stock, category, delay, id } = req.body

      if (req.files) {
        var file = req.files.file
        await file.mv(path.join(__dirname, '../frontend/public/assets/productPictures/' + file.md5 + ".jpeg"), error => {
          if (error) {
            return res.json({ response: error })
          }
        })
        var productPicturesLocation = `/assets/productPictures/${file.md5}.jpeg`
      }


      if (!req.files) {
        var modifiedProduct = await Product.findOneAndUpdate(
          { "_id": id },
          {
            "$set": {
              name,
              price,
              description,
              stock,
              category,
              delay
            }
          },
          { new: true }
        )
      } else {
        var modifiedProduct = await Product.findOneAndUpdate(
          { "_id": id },
          {
            "$set": {
              name: name,
              price: price,
              description: description,
              stock: stock,
              category: category,
              delay: delay,
              picture: productPicturesLocation
            }
          },
          { new: true }
        )
      }
      res.json({
        success: true,
        response: modifiedProduct
      })
    }
    catch (error) {
      console.log(error)
      return res.json({ success: false, response: error })
    }



  },
  deleteProduct: async (req, res) => {
    const { productId } = req.params
    try {
      await Product.findOneAndRemove({ "_id": productId })
      const response = await Product.find()
      return res.json({ success: true, response: response })
    } catch (error) {
      return res.json({
        success: false, response: error
      })
    }

  }
}

module.exports = productController