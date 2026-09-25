import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'


function Restaurant() {

  const { restaurantId } = useParams()
  const navigate = useNavigate()

  const { addToCart } = useCart()


  const restaurants = {

    // ================= PIZZA =================

    'pizza-house': {

      name: 'Pizza House',
      category: 'Italian • Pizza',
      rating: '⭐ 4.5',
      delivery: '25-30 min',
      image: '🍕',

      menu: [

        {
          id: 'pizza-1',
          name: 'Margherita Pizza',
          description:
            'Classic cheese pizza with tomato and basil',
          price: 249
        },

        {
          id: 'pizza-2',
          name: 'Farmhouse Pizza',
          description:
            'Loaded with fresh vegetables and cheese',
          price: 299
        },

        {
          id: 'pizza-3',
          name: 'Paneer Tikka Pizza',
          description:
            'Spicy paneer tikka with mozzarella cheese',
          price: 329
        },

        {
          id: 'pizza-4',
          name: 'Cheese Burst Pizza',
          description:
            'Extra cheesy pizza with delicious cheese burst',
          price: 349
        }

      ]

    },


    // ================= BURGER =================

    'burger-point': {

      name: 'Burger Point',
      category: 'Fast Food • Burgers',
      rating: '⭐ 4.3',
      delivery: '20-25 min',
      image: '🍔',

      menu: [

        {
          id: 'burger-1',
          name: 'Classic Chicken Burger',
          description:
            'Juicy chicken patty with lettuce and special sauce',
          price: 179
        },

        {
          id: 'burger-2',
          name: 'Cheese Burger',
          description:
            'Crispy patty with melted cheese and vegetables',
          price: 199
        },

        {
          id: 'burger-3',
          name: 'Veg Supreme Burger',
          description:
            'Crispy veg patty with cheese and sauces',
          price: 159
        },

        {
          id: 'burger-4',
          name: 'Double Patty Burger',
          description:
            'Double patty burger with cheese and special sauce',
          price: 249
        }

      ]

    },


    // ================= INDIAN =================

    'spice-kitchen': {

      name: 'Spice Kitchen',
      category: 'Indian • North Indian',
      rating: '⭐ 4.7',
      delivery: '30-35 min',
      image: '🍛',

      menu: [

        {
          id: 'indian-1',
          name: 'Paneer Butter Masala',
          description:
            'Soft paneer cooked in rich buttery tomato gravy',
          price: 249
        },

        {
          id: 'indian-2',
          name: 'Dal Tadka',
          description:
            'Yellow dal tempered with spices and herbs',
          price: 179
        },

        {
          id: 'indian-3',
          name: 'Butter Naan',
          description:
            'Soft naan topped with butter',
          price: 69
        },

        {
          id: 'indian-4',
          name: 'Veg Biryani',
          description:
            'Aromatic basmati rice with vegetables and spices',
          price: 229
        }

      ]

    },


    // ================= CHINESE =================

    'dragon-bowl': {

      name: 'Dragon Bowl',
      category: 'Chinese • Asian',
      rating: '⭐ 4.4',
      delivery: '25-30 min',
      image: '🍜',

      menu: [

        {
          id: 'chinese-1',
          name: 'Hakka Noodles',
          description:
            'Stir-fried noodles with fresh vegetables',
          price: 179
        },

        {
          id: 'chinese-2',
          name: 'Veg Manchurian',
          description:
            'Crispy vegetable balls in spicy Manchurian sauce',
          price: 199
        },

        {
          id: 'chinese-3',
          name: 'Fried Rice',
          description:
            'Chinese-style fried rice with vegetables',
          price: 169
        },

        {
          id: 'chinese-4',
          name: 'Veg Momos',
          description:
            'Steamed dumplings served with spicy chutney',
          price: 149
        }

      ]

    },


    // ================= DESSERT =================

    'sweet-treats': {

      name: 'Sweet Treats',
      category: 'Desserts • Bakery',
      rating: '⭐ 4.6',
      delivery: '15-20 min',
      image: '🍰',

      menu: [

        {
          id: 'dessert-1',
          name: 'Chocolate Cake',
          description:
            'Rich and creamy chocolate cake',
          price: 199
        },

        {
          id: 'dessert-2',
          name: 'Brownie',
          description:
            'Soft chocolate brownie with chocolate drizzle',
          price: 129
        },

        {
          id: 'dessert-3',
          name: 'Vanilla Pastry',
          description:
            'Soft vanilla pastry with creamy frosting',
          price: 99
        },

        {
          id: 'dessert-4',
          name: 'Ice Cream',
          description:
            'Creamy ice cream with your choice of flavor',
          price: 119
        }

      ]

    },


    // ================= HEALTHY =================

    'green-bite': {

      name: 'Green Bite',
      category: 'Healthy • Vegetarian',
      rating: '⭐ 4.8',
      delivery: '20-25 min',
      image: '🥗',

      menu: [

        {
          id: 'healthy-1',
          name: 'Fresh Garden Salad',
          description:
            'Fresh vegetables with healthy dressing',
          price: 179
        },

        {
          id: 'healthy-2',
          name: 'Healthy Bowl',
          description:
            'Nutritious bowl with vegetables and grains',
          price: 229
        },

        {
          id: 'healthy-3',
          name: 'Fruit Smoothie',
          description:
            'Fresh fruit smoothie without added sugar',
          price: 149
        },

        {
          id: 'healthy-4',
          name: 'Veg Sandwich',
          description:
            'Fresh vegetable sandwich with healthy ingredients',
          price: 159
        }

      ]

    }

  }


  const restaurant =
    restaurants[restaurantId]


  // ================= NOT FOUND =================

  if (!restaurant) {

    return (

      <div
        style={{
          padding: '50px',
          textAlign: 'center'
        }}
      >

        <h1>
          Restaurant Not Found
        </h1>

        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 25px',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          🏠 Go to Home
        </button>

      </div>

    )

  }


  // ================= RESTAURANT PAGE =================

  return (

    <div
      style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >


      {/* BACK BUTTON */}

      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 18px',
          marginBottom: '25px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '1px solid #ccc',
          background: 'white'
        }}
      >
        ← Back to Home
      </button>


      {/* RESTAURANT HEADER */}

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '35px',
          background: 'white'
        }}
      >

        <div
          style={{
            fontSize: '70px'
          }}
        >
          {restaurant.image}
        </div>


        <h1>
          {restaurant.name}
        </h1>


        <p>
          {restaurant.category}
        </p>


        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginTop: '15px',
            fontWeight: 'bold'
          }}
        >

          <span>
            {restaurant.rating}
          </span>


          <span>
            🕒 {restaurant.delivery}
          </span>

        </div>

      </div>


      {/* MENU */}

      <h2>
        Menu
      </h2>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}
      >

        {restaurant.menu.map((item) => (

          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '15px',
              padding: '20px',
              background: 'white'
            }}
          >

            <h3>
              {item.name}
            </h3>


            <p
              style={{
                color: '#666',
                minHeight: '45px'
              }}
            >
              {item.description}
            </p>


            <h3>
              ₹{item.price}
            </h3>


            <button
              onClick={() => {

                addToCart({
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  quantity: 1
                })

                alert(
                  `${item.name} added to cart! 🛒`
                )

              }}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '10px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                background: '#ff5a1f',
                color: 'white'
              }}
            >
              🛒 Add to Cart
            </button>

          </div>

        ))}

      </div>


      {/* CART BUTTON */}

      <div
        style={{
          textAlign: 'center',
          marginTop: '40px'
        }}
      >

        <button
          onClick={() => navigate('/cart')}
          style={{
            padding: '14px 30px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            background: '#ff5a1f',
            color: 'white'
          }}
        >
          🛒 View Cart
        </button>

      </div>

    </div>

  )

}


export default Restaurant 