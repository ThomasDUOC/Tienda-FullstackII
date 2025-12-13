import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { ToastProvider } from './context/ToastContext';
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
import Register from './components/Register';
import PurchaseLogs from './components/PurchaseLogs';
import Perfil from './components/Perfil';
import MisPedidos from './components/MisPedidos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';


function App() {

  const location = useLocation();
  const isAdminRoute = location.pathname === ('/vistaadmin');
  return (
    <ToastProvider>
      <CartProvider>
        <ProductProvider>
          <div className="app">
            {!isAdminRoute && <Header />}
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
                <Route path='/perfil' element={<Perfil />} />
                <Route path='/mispedidos' element={<MisPedidos />} />
                <Route path='/register' element={<Register />} />
                <Route path='/purchaselogs' element={<PurchaseLogs />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProductProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App
