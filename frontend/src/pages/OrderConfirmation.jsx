import { useLocation, useNavigate } from 'react-router-dom'


function OrderConfirmation() {

  const location = useLocation()
  const navigate = useNavigate()


  const order =
    location.state ||
    JSON.parse(
      localStorage.getItem(
        'foodflowOrder'
      ) || 'null'
    )


  if (!order) {

    return (

      <div
        style={{
          padding: '50px',
          textAlign: 'center'
        }}
      >

        <h1>
          No Order Found
        </h1>


        <button
          onClick={() =>
            navigate('/')
          }
          style={{
            padding: '12px 25px',
            cursor: 'pointer'
          }}
        >
          🏠 Go to Home
        </button>

      </div>

    )

  }


  return (

    <div
      style={{
        minHeight: '100vh',
        padding: '40px',
        background: '#fff8f3'
      }}
    >

      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          background: 'white',
          padding: '35px',
          borderRadius: '15px',
          boxShadow:
            '0 5px 20px rgba(0,0,0,0.08)'
        }}
      >

        {/* Success */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >

          <div
            style={{
              fontSize: '65px'
            }}
          >
            ✅
          </div>


          <h1>
            Order Placed Successfully!
          </h1>


          <p>
            Thank you for ordering from FoodFlow 🎉
          </p>

        </div>


        {/* Order ID */}

        <div
          style={{
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '25px',
            textAlign: 'center',
            background: '#fff1ea'
          }}
        >

          <p>
            Order ID
          </p>


          <h2>
            {order.orderId}
          </h2>

        </div>


        {/* Delivery Details */}

        <h2>
          Delivery Details
        </h2>


        <div
          style={{
            border: '1px solid #ddd',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '25px'
          }}
        >

          <p>
            <strong>
              Name:
            </strong>{' '}
            {order.name}
          </p>


          <p>
            <strong>
              Phone:
            </strong>{' '}
            {order.phone}
          </p>


          <p>
            <strong>
              Address:
            </strong>{' '}
            {order.address}
          </p>


          <p>
            <strong>
              Payment:
            </strong>{' '}
            {order.payment}
          </p>

        </div>


        {/* Ordered Items */}

        <h2>
          Ordered Items
        </h2>


        {order.cartItems.map(
          (item) => (

            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                padding: '15px 0',
                borderBottom:
                  '1px solid #eee'
              }}
            >

              <span>
                {item.name} × {item.quantity}
              </span>


              <strong>
                ₹{item.price *
                  item.quantity}
              </strong>

            </div>

          )
        )}


        {/* Total */}

        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            padding: '20px 0',
            fontSize: '20px'
          }}
        >

          <strong>
            Total
          </strong>


          <strong>
            ₹{order.total}
          </strong>

        </div>


        {/* Track Button */}

        <button
          onClick={() =>
            navigate(
              '/track-order',
              {
                state: order
              }
            )
          }
          style={{
            width: '100%',
            padding: '15px',
            marginTop: '15px',
            border: 'none',
            borderRadius: '8px',
            background: '#ff5a1f',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          🛵 Track Your Order
        </button>


        <button
          onClick={() =>
            navigate('/')
          }
          style={{
            width: '100%',
            padding: '15px',
            marginTop: '12px',
            border: '1px solid #ff5a1f',
            borderRadius: '8px',
            background: 'white',
            color: '#ff5a1f',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🏠 Back to Home
        </button>

      </div>

    </div>

  )

}


export default OrderConfirmation 