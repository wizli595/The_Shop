import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import HomeScreen from './screens/homeScreen.jsx'
import ProductScreen from './screens/productScreen.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css' // old version
import './assets/styles/bootsrap.costom.css'
import './assets/styles/index.css'
import { Provider } from 'react-redux';
import store from './app/store.js';
import CartScreen from './screens/cartScreen.jsx';
import LoginScreen from './screens/loginScreen.jsx';
import RegisterScreen from './screens/registerScreen.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<App />}>
            <Route exact path='/' element={<HomeScreen />} />
            <Route exact path='/product/:id' element={<ProductScreen />} />
            <Route exact path='/cart' element={<CartScreen />} />
            <Route exact path='/login' element={<LoginScreen />} />
            <Route exact path='/register' element={<RegisterScreen />} />
          </Route>
        </Routes>
      </Router>
    </Provider>

  </React.StrictMode>,
)
