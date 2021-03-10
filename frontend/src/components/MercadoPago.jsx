import React, { useState } from 'react'
import { connect } from 'react-redux';
import '../index.css'

const MercadoPago = (props) => {
    console.log(props.cart[0].subcategory)

    const [visible, setVisible] = useState(false)
    var orderData = {
            quantity: props.cart[0].subcategory.qty,
            description: props.cart[0].name,
            price: props.cart[0].subcategory.price,
          };

    const sendData = e => {
        document.querySelector('#checkout').setAttribute("disabled", true);
             
        fetch("http://localhost:4000/api/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
      })
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(preference) {
            createCheckoutButton(preference.id);
            console.log(preference)
            
        })
        .catch(function() {
            alert("Unexpected error");     
        })
        setVisible(!visible)
    }

    function createCheckoutButton(preference) {
        var script = document.createElement("script");       
        // The source domain must be completed according to the site for which you are integrating.
        // For example: for Argentina ".com.ar" or for Brazil ".com.br".
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference;
        document.getElementById("button-checkout").innerHTML = "";
        document.querySelector("#button-checkout").appendChild(script);
      }

     return (
        <div>
            <button id="checkout" onClick={ sendData}>Comprar</button>  
            <section class="payment-form dark">
                {visible && 
                <div class="container_payment">
                    <div class="block-heading">
                        <h2>Checkout Payment</h2>
                        <p>This is an example of a Mercado Pago integration</p>
                    </div>
                    <div class="form-payment">
                        <div class="products">
                            <h2 class="title">Summary</h2>
                            <div class="item">
                            <span class="price" id="summary-price"></span>
                            <p class="item-name">Book x <span id="summary-quantity"></span></p>
                            </div>
                            <div class="total">Total<span class="price" id="summary-total"></span></div>
                        </div>
                        <div class="payment-details">
                            <div class="form-group col-sm-12">
                                <br />      
                                <div id="button-checkout">
                                </div>                 
                                <br />
                                <button id="go-back">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" class="chevron-left">
                                    <path fill="#009EE3" fill-rule="nonzero"id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                                    </svg>
                                    Go back to Shopping Cart
                                </button>
                            </div>
                        </div>
                    </div>
              </div>
                
                }
        
      </section>      
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(MercadoPago)

