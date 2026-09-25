import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function OrderTracking() {

  const location = useLocation()
  const navigate = useNavigate()

  const [order, setOrder] = useState(
    location.state || null
  )

  const [statusIndex, setStatusIndex] = useState(0)


  const statuses = [
    {
      icon: '✅',
      title: 'Order Confirmed',
      message: 'Your order has been confirmed.'
    },
    {
      icon: '👨‍🍳',
      title: 'Preparing Food',
      message: 'The restaurant is preparing your food.'
    },
    {
      icon: '🛵',
      title: 'Out for Delivery',
      message: 'Your food is on the way!'
    },
    {
      icon: '🏠',
      title: 'Delivered',
      message: 'Your order has been delivered.'
    }
  ]


  // Get order from localStorage if needed
  useEffect(() => {

    if (!order) {

      const savedOrder =
        localStorage.getItem('foodflowOrder')

      if (savedOrder) {

        setOrder(
          JSON.parse(savedOrder)
        )

      }

    }

  }, [order])


  // Automatically update order status
  useEffect(() => {

    if (!order) {
      return
    }


    if (statusIndex >= statuses.length - 1) {
      return
    }


    const timer = setTimeout(() => {

      setStatusIndex(
        (previous) => previous + 1
      )

    }, 10000) 


    return () => clearTimeout(timer)

  }, [statusIndex, order])


  // No order found
  if (!order) {

    return (

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
          background: '#fff8f3'
        }}
      >

        <div
          style={{
            textAlign: 'center',
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}
        >

          <div
            style={{
              fontSize: '60px'
            }}
          >
            📦
          </div>


          <h1>
            No Order Found
          </h1>


          <p>
            Please place an order first.
          </p>


          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '20px',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              background: '#ff5a1f',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🏠 Go to Home
          </button>

        </div>

      </div>

    )

  }


  const currentStatus =
    statuses[statusIndex]


  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#fff8f3',
        padding: '40px 20px'
      }}
    >

      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto'
        }}
      >

        {/* Header */}
        <div
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.07)'
          }}
        >

          <div
            style={{
              fontSize: '60px'
            }}
          >
            {currentStatus.icon}
          </div>


          <h1>
            {currentStatus.title}
          </h1>


          <p>
            {currentStatus.message}
          </p>


          <p
            style={{
              color: '#777',
              marginTop: '15px'
            }}
          >
            Order ID:
            <strong>
              {' '}{order.orderId}
            </strong>
          </p>

        </div>


        {/* Tracking */}
        <div
          style={{
            background: 'white',
            marginTop: '25px',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.07)'
          }}
        >

          <h2>
            Track Your Order
          </h2>


          <div
            style={{
              marginTop: '30px'
            }}
          >

            {statuses.map(
              (status, index) => (

                <div
                  key={status.title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    position: 'relative',
                    paddingBottom:
                      index === statuses.length - 1
                        ? '0'
                        : '30px'
                  }}
                >

                  {/* Circle */}
                  <div
                    style={{
                      width: '45px',
                      height: '45px',
                      minWidth: '45px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      background:
                        index <= statusIndex
                          ? '#ff5a1f'
                          : '#eeeeee',
                      color:
                        index <= statusIndex
                          ? 'white'
                          : '#999'
                    }}
                  >
                    {status.icon}
                  </div>


                  {/* Vertical line */}
                  {index !== statuses.length - 1 && (

                    <div
                      style={{
                        position: 'absolute',
                        left: '22px',
                        top: '45px',
                        width: '2px',
                        height: '30px',
                        background:
                          index < statusIndex
                            ? '#ff5a1f'
                            : '#dddddd'
                      }}
                    />

                  )}


                  {/* Text */}
                  <div>

                    <h3
                      style={{
                        margin:
                          '0 0 5px',
                        color:
                          index <= statusIndex
                            ? '#222'
                            : '#999'
                      }}
                    >
                      {status.title}
                    </h3>


                    <p
                      style={{
                        margin: 0,
                        color: '#777'
                      }}
                    >
                      {status.message}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        {/* Order Information */}
        <div
          style={{
            background: 'white',
            marginTop: '25px',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.07)'
          }}
        >

          <h2>
            Order Details
          </h2>


          {order.cartItems.map(
            (item) => (

              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom:
                    '1px solid #eeeeee'
                }}
              >

                <span>
                  {item.name} × {item.quantity}
                </span>


                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            )
          )}


          <div
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
              ₹{order.total}
            </strong>

          </div>

        </div>


        {/* Buttons */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '30px'
          }}
        >

          <button
            onClick={() => navigate('/')}
            style={{
              padding: '13px 25px',
              border: 'none',
              borderRadius: '8px',
              background: '#ff5a1f',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🏠 Back to Home
          </button>

        </div>

      </div>

    </div>

  )
}


export default OrderTracking 