import { Link } from 'react-router-dom'
import fifa25 from '../assets/images/fifa251920.jpg';
import ps51920 from '../assets/images/ps51920.jpg';
import controlxboxs from '../assets/images/ControlXboxSeries.webp';

function Home() {
    return (
        <div>
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
            <div className='container'> 
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators"> 
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active ratio ratio-16x9">
                        <img src={fifa25} className="d-block w-100" alt="level up"/>
                        </div>
                        <div className="carousel-item ratio ratio-16x9" style={{maxHeight: '700px'}}>
                        <img src={ps51920} className="d-block w-100" alt="level"/>
                        </div>
                        <div className="carousel-item ratio ratio-16x9" style={{maxHeight: '700px'}}>
                        <img src={controlxboxs} className="d-block w-100" alt="metodos de pago"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home;
