const mercadopago = require('mercadopago')

 mercadopago.configure({
        access_token: 'TEST-790714994156585-031012-d549a564030162df78ca09d2ec05a84c-137296685'
        });

const mercadoPagoController = {
    mercadopago: async (req, res) => {               
        const preference = {
            items : [
                {
                    title: req.body.description,
                    unit_price: req.body.price,
                    quantity: req.body.quantity
                }
            ]
        }
        mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
    },
    payment: (req, res) => {
        res.json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        })
    }
}


module.exports = mercadoPagoController