import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'


function Checkout() {

  const {
    cartItems
  } = useCart()


  const navigate = useNavigate()


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [payment, setPayment] =
    useState('Cash on Delivery')


  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )


  const placeOrder = () => {

    // Check if all details are filled
    if (
      name.trim() === '' ||
      phone.trim() === '' ||
      address.trim() === ''
    ) {

      alert(
        'Please fill all the details'
      )

      return

    }


    // Check phone number length
    if (phone.length !== 10) {

      alert(
        'Please enter a valid 10 digit phone number'
      )

      return

    }


    const orderId =
      'FF' +
      Date.now()
        .toString()
        .slice(-8)


    const orderData = {

      orderId,

      name,

      phone,

      address,

      payment,

      cartItems: [...cartItems],

      total

    }


    // Save order
    localStorage.setItem(
      'foodflowOrder',
      JSON.stringify(orderData)
    )


    // Open confirmation page
    navigate(
      '/order-confirmation',
      {
        state: orderData
      }
    )

  }


  return (

    <div
      className="checkout-page"
      style={{
        padding: '40px'
      }}
    >

      <h1>
        🛍️ Checkout
      </h1>


      <div
        className="checkout-container"
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1fr 1fr',
          gap: '30px',
          maxWidth: '1000px',
          margin: '30px auto'
        }}
      >

        {/* Delivery Details */}

        <div
          className="checkout-details"
          style={{
            border: '1px solid #ddd',
            padding: '25px',
            borderRadius: '15px'
          }}
        >

          <h2>
            Delivery Details
          </h2>


          {/* Name */}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              boxSizing: 'border-box'
            }}
          />


          {/* Phone Number */}

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            maxLength="10"
            onChange={(e) =>
              setPhone(
                e.target.value.replace(/\D/g, '')
              )
            }
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              boxSizing: 'border-box'
            }}
          />


          {/* Address */}

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            style={{
              width: '100%',
              height: '100px',
              padding: '12px',
              marginBottom: '20px',
              boxSizing: 'border-box'
            }}
          />


          {/* Payment */}

          <h2>
            Payment Method
          </h2>


          <label
            style={{
              display: 'block',
              marginBottom: '12px'
            }}
          >

            <input
              type="radio"
              value="Cash on Delivery"
              checked={
                payment ===
                'Cash on Delivery'
              }
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            />

            {' '}Cash on Delivery

          </label>


          <label
            style={{
              display: 'block',
              marginBottom: '12px'
            }}
          >

            <input
              type="radio"
              value="UPI"
              checked={
                payment === 'UPI'
              }
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            />

            {' '}UPI

          </label>


          <label>

            <input
              type="radio"
              value="Card"
              checked={
                payment === 'Card'
              }
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            />

            {' '}Card

          </label>

        </div>


        {/* Order Summary */}

        <div
          className="order-summary"
          style={{
            border: '1px solid #ddd',
            padding: '25px',
            borderRadius: '15px'
          }}
        >

          <h2>
            Order Summary
          </h2>


          {cartItems.length === 0 ? (

            <p>
              Your cart is empty.
            </p>

          ) : (

            cartItems.map((item) => (

              <div
                className="checkout-item"
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0'
                }}
              >

                <span>
                  {item.name} × {item.quantity}
                </span>


                <span>
                  ₹{item.price *
                    item.quantity}
                </span>

              </div>

            ))

          )}


          <hr />


          <div
            className="checkout-total"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
              fontSize: '20px'
            }}
          >

            <strong>
              Total
            </strong>


            <strong>
              ₹{total}
            </strong>

          </div>


          <button
            onClick={placeOrder}
            disabled={
              cartItems.length === 0
            }
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '25px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: '#ff5a1f',
              color: 'white'
            }}
          >

            ✅ Place Order

          </button>

        </div>

      </div>

    </div>

  )

}


export default Checkout 