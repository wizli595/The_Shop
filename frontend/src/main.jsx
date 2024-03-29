import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from './utils/i18n.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import HomeScreen from './screens/homeScreen.jsx';
import ProductScreen from './screens/productScreen.jsx';
// import 'bootstrap/scss/bootstrap.scss'; // old version
import './assets/styles/bootstrap.costom.css';
import './assets/styles/index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './app/store.js';
import CartScreen from './screens/cartScreen.jsx';
import LoginScreen from './screens/loginScreen.jsx';
import RegisterScreen from './screens/registerScreen.jsx';
import ShippingScreen from './screens/shippingScreen.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import PaymentScreen from './screens/paymentScreen.jsx';
import { HelmetProvider } from 'react-helmet-async';
import PlaceOrderScreen from './screens/placeorderScreen.jsx';
import OrderScreen from './screens/orderScreen.jsx';
import ProfileScreen from './screens/profileScreen.jsx';
import AdminRoute from './components/adminRoute.jsx';
import OrderListScreen from './screens/admin/orderListScreen.jsx';
import ProductListScreen from './screens/admin/productListScreen.jsx';
import ProductEditScreen from './screens/admin/productEditScreen.jsx';
import UserListScreen from './screens/admin/userListScreen.jsx';
import UserEditScreen from './screens/admin/userEditScreen.jsx';
import NotFoundScreen from './screens/notFoundScreen.jsx';
import ContactUsScreen from './screens/ContactUsScreen.jsx';
import OnOrderScreen from './screens/onOrderScreen.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <Router>
            <Routes>
              <Route exact path='/' element={<App />}>
                <Route exact path='/' element={<HomeScreen />} />
                <Route exact path='/search/:keyword' element={<HomeScreen />} />
                <Route exact path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
                <Route exact path='/category/:category' element={<HomeScreen />} />
                <Route exact path='/category/:category/page/:pageNumber' element={<HomeScreen />} />
                <Route exact path='/page/:pageNumber' element={<HomeScreen />} />
                <Route exact path='/product/:id' element={<ProductScreen />} />
                <Route exact path='/cart' element={<CartScreen />} />
                <Route exact path='/login' element={<LoginScreen />} />
                <Route exact path='/register' element={<RegisterScreen />} />
                <Route exact path='/contact' element={<ContactUsScreen />} />
                <Route exact path='' element={<PrivateRoute />}>
                  <Route exact path='/shipping' element={<ShippingScreen />} />
                  <Route exact path='/payment' element={<PaymentScreen />} />
                  <Route exact path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route exact path='/order/:id' element={<OrderScreen />} />
                  <Route exact path='/profile' element={<ProfileScreen />} />
                  <Route exact path='/onorder/:id' element={<OnOrderScreen />} />

                </Route>
                <Route exact path='' element={<AdminRoute />}>
                  <Route exact path='/admin/orderlist' element={<OrderListScreen />} />
                  <Route exact path='/admin/productlist' element={<ProductListScreen />} />
                  <Route exact path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
                  <Route exact path='/admin/product/:id/edit' element={<ProductEditScreen />} />
                  <Route exact path='/admin/userlist' element={<UserListScreen />} />
                  <Route exact path='/admin/user/:id/edit' element={<UserEditScreen />} />

                </Route>
                <Route exact path='*' element={<NotFoundScreen />} />
              </Route>
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>

  </React.StrictMode>,
);
