import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'


function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity
  } = useCart()


  const navigate = useNavigate()


  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )


  return (

    <div style={{ padding: '40px' }}>

      <h1>
        🛒 Your Cart
      </h1>


      {cartItems.length === 0 ? (

        <div>

          <p>
            Your cart is currently empty.
          </p>

          <button
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>

        </div>

      ) : (

        <div>

          {cartItems.map((item) => (

            <div
              key={item.id}
              style={{
                border: '1px solid #ddd',
                padding: '20px',
                marginBottom: '15px',
                borderRadius: '10px'
              }}
            >

              <h2>
                {item.name}
              </h2>


              <p>
                {item.description}
              </p>


              <strong>
                ₹{item.price}
              </strong>


              <div
                style={{
                  marginTop: '15px'
                }}
              >

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  −
                </button>


                <span
                  style={{
                    margin: '0 15px',
                    fontWeight: 'bold'
                  }}
                >
                  {item.quantity}
                </span>


                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

              </div>


              <p>

                Subtotal:

                <strong>
                  {' '}₹{item.price * item.quantity}
                </strong>

              </p>

            </div>

          ))}


          <hr />


          <h2>
            Total: ₹{totalPrice}
          </h2>


          <button
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>


        </div>

      )}

    </div>

  )
}


export default Cart 