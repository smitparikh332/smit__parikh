import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([])

  function addToCart(item) {

    setCartItems((previousItems) => {

      const existingItem = previousItems.find(
        (cartItem) => cartItem.id === item.id
      )

      if (existingItem) {

        return previousItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }
            : cartItem
        )

      }

      return [
        ...previousItems,
        {
          ...item,
          quantity: 1
        }
      ]

    })

  }


  function increaseQuantity(itemId) {

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )

  }


  function decreaseQuantity(itemId) {

    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )

  }


  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity
      }}
    >

      {children}

    </CartContext.Provider>

  )

}


export function useCart() {
  return useContext(CartContext)
} 