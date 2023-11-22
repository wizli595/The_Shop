import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import HomeScreen from './screens/homeScreen.jsx'
import ProductScreen from './screens/productScreen.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css' // old version
import './assets/styles/bootsrap.costom.css'
import './assets/styles/index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<App />}>
          <Route exact path='/' element={<HomeScreen />} />
          <Route exact path='/product/:id' element={<ProductScreen />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
