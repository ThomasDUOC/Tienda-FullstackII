import { Link } from 'react-router-dom';
import Logo from '../assets/images/Level-Up-Logo.png'; 
import Carrito from '../assets/images/carrito.png';

function Header() {
    return (   
            <nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
                <div className='container-fluid'>
                    <img src={Logo} alt='Logo' style={{ width: '40px' }} />
                    <Link className='navbar-brand' to='/'>Level Up</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarColor01' aria-controls='navbarColor01' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarColor01'>
                        <ul className='navbar-nav me-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link active' to='/'>Inicio
                                    <span className='visually-hidden'>(current)</span>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link className='nav-link' to='/about'>Acerca</Link>
                            </li>
                            <li class="nav-item">
                                <Link className='nav-link' to='/contact'>Contacto</Link>
                            </li>
                            <li class="nav-item">
                                <Link className='nav-link' to='/navbar'>Navbar</Link>
                            </li>
                        </ul>
                        <form className="d-flex me-3">
                            <input className='form-control me-sm-2' type="search" placeholder='Buscar'/>
                            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>Buscar</button>
                        </form>
                        <Link className='position-relative' to='/navbar'>
                            <img src={Carrito} alt="Carrito" width={30} height={24} />
                            <span id='cartBadge' className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' style={{display: 'none' }}>0</span>
                        </Link>
                    </div>
                </div>
            </nav>
    );
}

export default Header;


