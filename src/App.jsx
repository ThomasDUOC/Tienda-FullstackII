import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './components/Home';
import Login from './components/Login';
import Contact from './components/Contact';
import { Products } from './components/Products';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import VistaAdmin from './components/VistaAdmin';
import Footer from './components/Footer';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/vistaadmin' element={<VistaAdmin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App
