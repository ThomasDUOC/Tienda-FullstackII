import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Logo from '../assets/images/Level-Up-Logo.png';
import Carrito from '../assets/images/carrito.png';

function Header() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const { products } = useProducts();

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredProducts = products.filter(product =>
        (product.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
            setShowDropdown(false);
        }
    };

    const handleResultClick = () => {
        setSearchTerm("");
        setShowDropdown(false);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        setIsLoggedIn(!!token);
    }, []);

    return (
        <nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
            <div className='container-fluid'>
                <img src={Logo} alt='Logo' style={{ width: '40px' }} />
                <Link className='navbar-brand ms-3 fw-bold' to='/'>Level Up</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarColor01' aria-controls='navbarColor01' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarColor01'>
                    <ul className='navbar-nav me-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link active fw-bold' to='/'>Inicio
                                <span className='visually-hidden'>(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link fw-bold' to='/products'>Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link fw-bold' to='/contact'>Contacto</Link>
                        </li>
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <Link className='nav-link fw-bold' to='/perfil'>Mi Perfil</Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                    <Link className='nav-link fw-bold' to='/login'>Iniciar Sesion</Link>
                            </li>
                        )}
                    </ul>
                    <form className="d-flex me-5 position-relative" role="search" onSubmit={handleSearch}>
                        <div className='position-relative me-sm-2'>
                            <input className='form-control rounded-pill' type="search" placeholder='Buscar' value={searchTerm} 
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowDropdown(true);
                                }}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                onFocus={() => searchTerm && setShowDropdown(true)} 
                                />

                                {showDropdown && searchTerm && (
                                    <div className='list-group position-absolute start-0 mt-1 w-100 shadow' style={{ zIndex: 1000, maxHeight: '300px', overflowY: 'auto'}}>
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.slice(0, 5).map(product => (
                                                <Link key={product.id} to={`/product/${product.id}`} className='list-group-item list-group-item-action d-flex align-items-center bg-dark text-light border-secondary' onClick={handleResultClick}>
                                                    <img src={product.image} alt={product.name} style={{width: '30px', height: '30px', objectFit: 'contain', marginRight: '10px'}}/>
                                                    <div>
                                                        <div className='fw-bold' style={{fontSize: '0.9rem'}}>{product.name}</div>
                                                        <small className='text-info'>${product.price}</small>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className='list-group-item bg-dark text-danger border-secondary'>
                                                Sin resultados
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        <button className='btn btn-secondary rounded-4 my-2 my-sm-0' type='submit'>Buscar</button>
                    </form>
                    <Link className='position-relative me-3' to='/cart'>
                        <img src={Carrito} alt="Carrito" width={30} height={24} />
                        {cartCount > 0 && (
                            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;


