import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="d-flex justify-content-end me-3 mt-2">
            <ul className="nav nav-underline">
            <li class="nav-item">
                <Link className='nav-link' to='/about'>Acerca</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to='/contact'>Contacto</Link>
            </li>
            </ul>
        </div>
    )
}

export default Home;
