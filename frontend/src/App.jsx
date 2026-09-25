import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'

import { useState } from 'react'

import './App.css'


// Pages
import Restaurant from './pages/Restaurant'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderTracking from './pages/OrderTracking'
import Login from './pages/Login'
import Signup from './pages/Signup'


// Authentication
import {
  AuthProvider,
  useAuth
} from './context/AuthContext'


// =====================================================
// RESTAURANT DATA
// =====================================================

const restaurantData = [

  {
    id: 'pizza-house',
    name: 'Pizza House',
    category: 'Italian • Pizza',
    rating: '4.5',
    delivery: '25-30 min',
    image: '🍕',

    keywords: [
      'pizza',
      'italian',
      'margherita',
      'farmhouse',
      'paneer',
      'cheese',
      'cheese burst'
    ]
  },


  {
    id: 'burger-point',
    name: 'Burger Point',
    category: 'Fast Food • Burgers',
    rating: '4.3',
    delivery: '20-25 min',
    image: '🍔',

    keywords: [
      'burger',
      'burgers',
      'fast food',
      'chicken',
      'chicken burger',
      'cheese burger',
      'veg burger',
      'double patty'
    ]
  },


  {
    id: 'spice-kitchen',
    name: 'Spice Kitchen',
    category: 'Indian • North Indian',
    rating: '4.7',
    delivery: '30-35 min',
    image: '🍛',

    keywords: [
      'indian',
      'north indian',
      'paneer',
      'paneer butter masala',
      'dal',
      'dal tadka',
      'naan',
      'butter naan',
      'biryani',
      'veg biryani'
    ]
  },


  {
    id: 'dragon-bowl',
    name: 'Dragon Bowl',
    category: 'Chinese • Asian',
    rating: '4.4',
    delivery: '25-30 min',
    image: '🍜',

    keywords: [
      'chinese',
      'asian',
      'noodles',
      'hakka noodles',
      'manchurian',
      'fried rice',
      'momos'
    ]
  },


  {
    id: 'sweet-treats',
    name: 'Sweet Treats',
    category: 'Desserts • Bakery',
    rating: '4.6',
    delivery: '15-20 min',
    image: '🍰',

    keywords: [
      'dessert',
      'desserts',
      'cake',
      'chocolate cake',
      'pastry',
      'brownie',
      'ice cream'
    ]
  },


  {
    id: 'green-bite',
    name: 'Green Bite',
    category: 'Healthy • Vegetarian',
    rating: '4.8',
    delivery: '20-25 min',
    image: '🥗',

    keywords: [
      'healthy',
      'vegetarian',
      'salad',
      'smoothie',
      'healthy bowl',
      'vegan',
      'sandwich'
    ]
  }

]


// =====================================================
// HOME PAGE
// =====================================================

function Home() {

  const navigate = useNavigate()

  const {
    user,
    logout
  } = useAuth()


  const [searchText, setSearchText] =
    useState('')

  const [searchQuery, setSearchQuery] =
    useState('')

  const [selectedCategory, setSelectedCategory] =
    useState('')


  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = () => {

    setSearchQuery(
      searchText.trim().toLowerCase()
    )

    setSelectedCategory('')

  }


  // ===================================================
  // CATEGORY FILTER
  // ===================================================

  const handleCategory = (category) => {

    setSelectedCategory(category)

    setSearchText('')
    setSearchQuery('')

  }


  // ===================================================
  // SHOW ALL
  // ===================================================

  const showAllRestaurants = () => {

    setSearchText('')
    setSearchQuery('')
    setSelectedCategory('')

  }


  // ===================================================
  // FILTER RESTAURANTS
  // ===================================================

  const filteredRestaurants =
    restaurantData.filter(
      (restaurant) => {

        // Category filter

        if (selectedCategory !== '') {

          const categoryText =
            restaurant.category.toLowerCase()


          if (
            !categoryText.includes(
              selectedCategory.toLowerCase()
            )
          ) {

            return false

          }

        }


        // Search filter

        if (searchQuery !== '') {

          const restaurantName =
            restaurant.name.toLowerCase()

          const category =
            restaurant.category.toLowerCase()


          const keywordMatch =
            restaurant.keywords.some(
              (keyword) =>
                keyword
                  .toLowerCase()
                  .includes(searchQuery)
            )


          return (
            restaurantName.includes(searchQuery) ||
            category.includes(searchQuery) ||
            keywordMatch
          )

        }


        return true

      }
    )


  // ===================================================
  // HOME UI
  // ===================================================

  return (

    <div className="app">


      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="navbar">


        {/* LOGO */}

        <Link
          to="/"
          className="logo"
          style={{
            textDecoration: 'none'
          }}
        >
          🍔 FoodFlow
        </Link>


        {/* NAVIGATION */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>


          <Link to="/">
            Restaurants
          </Link>


          <Link to="/">
            Offers
          </Link>


          <Link to="/">
            About
          </Link>


          <Link to="/cart">
            🛒 Cart
          </Link>

        </div>


        {/* AUTH SECTION */}

        <div className="nav-buttons">

          {user ? (

            <>

              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#333',
                  fontWeight: 'bold'
                }}
              >
                👋 Hi, {user.name}
              </span>


              <button
                className="login-btn"
                onClick={logout}
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <button
                className="login-btn"
                onClick={() =>
                  navigate('/login')
                }
              >
                Login
              </button>


              <button
                className="signup-btn"
                onClick={() =>
                  navigate('/signup')
                }
              >
                Sign Up
              </button>

            </>

          )}

        </div>

      </nav>


      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="hero-section">


        <h1>

          Delicious food,
          <br />

          delivered to your door. 🍕

        </h1>


        <p>

          Discover the best restaurants
          and delicious food around you.

        </p>


        {/* SEARCH */}

        <div className="search-box">


          <input
            type="text"

            value={searchText}

            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }

            onKeyDown={(e) => {

              if (e.key === 'Enter') {
                handleSearch()
              }

            }}

            placeholder="Search for food or restaurant..."
          />


          <button
            onClick={handleSearch}
          >
            🔍 Search
          </button>

        </div>


        {/* SEARCH RESULT */}

        {searchQuery !== '' && (

          <p
            style={{
              marginTop: '20px',
              fontWeight: 'bold',
              color: '#ff5a1f'
            }}
          >

            Showing results for "
            {searchQuery}
            "

          </p>

        )}


        {/* CATEGORY RESULT */}

        {selectedCategory !== '' && (

          <p
            style={{
              marginTop: '20px',
              fontWeight: 'bold',
              color: '#ff5a1f'
            }}
          >

            Showing{' '}
            {selectedCategory}
            {' '}restaurants

          </p>

        )}

      </section>


      {/* ================================================= */}
      {/* CATEGORIES */}
      {/* ================================================= */}

      <section className="section">


        <h2>
          Explore Categories
        </h2>


        <div className="categories">


          {/* Pizza */}

          <div
            className="category"
            onClick={() =>
              handleCategory('pizza')
            }
          >

            <div className="category-icon">
              🍕
            </div>

            <p>
              Pizza
            </p>

          </div>


          {/* Burgers */}

          <div
            className="category"
            onClick={() =>
              handleCategory('burger')
            }
          >

            <div className="category-icon">
              🍔
            </div>

            <p>
              Burgers
            </p>

          </div>


          {/* Chinese */}

          <div
            className="category"
            onClick={() =>
              handleCategory('chinese')
            }
          >

            <div className="category-icon">
              🍜
            </div>

            <p>
              Chinese
            </p>

          </div>


          {/* Indian */}

          <div
            className="category"
            onClick={() =>
              handleCategory('indian')
            }
          >

            <div className="category-icon">
              🍛
            </div>

            <p>
              Indian
            </p>

          </div>


          {/* Desserts */}

          <div
            className="category"
            onClick={() =>
              handleCategory('dessert')
            }
          >

            <div className="category-icon">
              🍰
            </div>

            <p>
              Desserts
            </p>

          </div>


          {/* Healthy */}

          <div
            className="category"
            onClick={() =>
              handleCategory('healthy')
            }
          >

            <div className="category-icon">
              🥗
            </div>

            <p>
              Healthy
            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* RESTAURANTS */}
      {/* ================================================= */}

      <section className="section">


        <h2>

          {searchQuery
            ? 'Search Results'
            : selectedCategory
              ? `${selectedCategory} Restaurants`
              : 'Popular Restaurants'}

        </h2>


        {/* NO RESULTS */}

        {filteredRestaurants.length === 0 ? (

          <div
            style={{
              textAlign: 'center',
              padding: '50px 20px',
              background: 'white',
              borderRadius: '15px',
              border: '1px solid #eee'
            }}
          >

            <div
              style={{
                fontSize: '60px'
              }}
            >
              😕
            </div>


            <h3>
              No restaurants found
            </h3>


            <p>
              Try another search or category.
            </p>


            <button
              onClick={showAllRestaurants}
              style={{
                padding: '12px 25px',
                border: 'none',
                borderRadius: '8px',
                background: '#ff5a1f',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Show All Restaurants
            </button>

          </div>

        ) : (


          /* RESTAURANT CARDS */

          <div className="restaurants">

            {filteredRestaurants.map(
              (restaurant) => (

                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  className="restaurant-link"
                >

                  <div className="restaurant-card">


                    {/* IMAGE */}

                    <div className="restaurant-image">
                      {restaurant.image}
                    </div>


                    {/* NAME */}

                    <h3>
                      {restaurant.name}
                    </h3>


                    {/* CATEGORY */}

                    <p>
                      {restaurant.category}
                    </p>


                    {/* DETAILS */}

                    <div className="restaurant-info">

                      <span>
                        ⭐ {restaurant.rating}
                      </span>


                      <span>
                        {restaurant.delivery}
                      </span>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        )}

      </section>


      {/* ================================================= */}
      {/* WHY FOODFLOW */}
      {/* ================================================= */}

      <section className="section">


        <h2>
          Why Choose FoodFlow?
        </h2>


        <div className="categories">


          {/* Fast Delivery */}

          <div className="category">

            <div className="category-icon">
              🚀
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your favorite food
              delivered quickly.
            </p>

          </div>


          {/* Variety */}

          <div className="category">

            <div className="category-icon">
              🍴
            </div>

            <h3>
              Great Variety
            </h3>

            <p>
              Choose from different
              cuisines and restaurants.
            </p>

          </div>


          {/* Payment */}

          <div className="category">

            <div className="category-icon">
              💳
            </div>

            <h3>
              Easy Payment
            </h3>

            <p>
              Simple and convenient
              payment options.
            </p>

          </div>


          {/* Quality */}

          <div className="category">

            <div className="category-icon">
              ⭐
            </div>

            <h3>
              Quality Food
            </h3>

            <p>
              Enjoy delicious meals
              from trusted restaurants.
            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer>

        <h2>
          🍔 FoodFlow
        </h2>


        <p>
          Your food, delivered with love.
        </p>


        <p>
          © 2026 FoodFlow. All rights reserved.
        </p>

      </footer>

    </div>

  )

}


// =====================================================
// APP ROUTES
// =====================================================

function App() {

  return (

    <BrowserRouter>

      <AuthProvider>

        <Routes>


          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* RESTAURANT */}

          <Route
            path="/restaurant/:restaurantId"
            element={<Restaurant />}
          />


          {/* CART */}

          <Route
            path="/cart"
            element={<Cart />}
          />


          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={<Checkout />}
          />


          {/* ORDER CONFIRMATION */}

          <Route
            path="/order-confirmation"
            element={<OrderConfirmation />}
          />


          {/* ORDER TRACKING */}

          <Route
            path="/track-order"
            element={<OrderTracking />}
          />


          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* SIGN UP */}

          <Route
            path="/signup"
            element={<Signup />}
          />


          {/* 404 */}

          <Route
            path="*"
            element={

              <div
                style={{
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '30px',
                  background: '#fff8f3'
                }}
              >

                <div
                  style={{
                    fontSize: '80px'
                  }}
                >
                  😕
                </div>


                <h1>
                  404
                </h1>


                <h2>
                  Page Not Found
                </h2>


                <p>
                  Sorry, the page you are looking
                  for does not exist.
                </p>


                <Link to="/">

                  <button
                    style={{
                      padding: '12px 25px',
                      marginTop: '15px',
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

                </Link>

              </div>

            }
          />

        </Routes>

      </AuthProvider>

    </BrowserRouter>

  )

}


export default App 