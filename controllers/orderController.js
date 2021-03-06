const Order = require('../models/Order')

const orderController = {
  newOrder: (req, res) => {
    console.log(req.body)
    console.log(req.user)

    const { _id } = req.user

    const newOrder = new Order({ customer: _id, cart: req.body })
    newOrder.save()
      .then(async (newOrder) => {
        const populateOrder = await newOrder.populate('customer').execPopulate()
        res.json({ success: true, response: populateOrder })
      })
      .catch(error => { return res.json({ success: false, response: error }) })
  }
}

module.exports = orderController