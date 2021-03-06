const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const reservationController = {
    reservation : async (req, res) => {
        try{
            const {username, firstname} = req.user
            const {dia, cantidad} = req.body
            const transporter = nodemailer.createTransport(smtpTransport({
               service: "gmail",
                auth: {
                  user: "cocolichemh@gmail.com", // generated ethereal user
                  pass: "cocoliche2021", // generated ethereal password
                },
            }))
                const data = transporter.sendMail({
                    from: username, // sender address
                    to: "cocolichemh@gmail.com", // list of receivers
                    subject: "RESERVAS", // Subject line
                    text: `Reserva recibida para el día: ${dia}. La cantidad de personas que asistirán es ${cantidad}. El correo electrónico es ${username} y quien hizo el pedido se llama ${firstname} `, // plain text body
                  })
                 res.json({
                     success: true,
                     data
                 })
           
        }catch(error){
            res.json({success: false, error})
        }
    }
}

module.exports = reservationController