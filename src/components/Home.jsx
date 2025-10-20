import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../data/products';
import { ProductCard } from './ProductCard';
import ps51920 from '../assets/images/ps51920.jpg'
import god from '../assets/images/godwall.jpg';
import tlou from '../assets/images/tlouwall.png';
import '../assets/css/home.css';

function Home() {
    const featuredProducts = getFeaturedProducts();

    return (
        <div className="home-page">
            {/* carrusel */}
            <div className='container mt-4'>
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active ratio ratio-16x9">
                            <img src={tlou} className="d-block w-100" alt="FIFA 25" />
                        </div>
                        <div className="carousel-item ratio ratio-16x9">
                            <img src={ps51920} className="d-block w-100" alt="PlayStation 5" />
                        </div>
                        <div className="carousel-item ratio ratio-16x9">
                            <img src={god} className="d-block w-100" alt="Xbox Controller" />
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

            {/* cats */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Explora por Categoría</h2>
                    <div className="categories-grid">
                        <Link to="/products?category=consolas" className="category-card">
                            <i className="bi bi-controller"></i>
                            <h3>Consolas</h3>
                            <p>PlayStation, Xbox, Nintendo Switch</p>
                        </Link>
                        <Link to="/products?category=juegos" className="category-card">
                            <i className="bi bi-disc"></i>
                            <h3>Juegos</h3>
                            <p>Los últimos lanzamientos</p>
                        </Link>
                        <Link to="/products?category=accesorios" className="category-card">
                            <i className="bi bi-headset"></i>
                            <h3>Accesorios</h3>
                            <p>Controles, auriculares y más</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* productos destacados */}
            <section className="featured-section">
                <div className="container">
                    <h2 className="section-title">Productos Destacados</h2>
                    <div className="products-grid">
                        {featuredProducts.slice(0, 8).map(product => (
                            <ProductCard key={product.id} product={product} showAddToCart={false} />
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/products" className="btn btn-outline-primary btn-lg">
                            Ver Todos los Productos
                        </Link>
                    </div>
                </div>
            </section>

            {/* caracts */}
            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature">
                            <i className="bi bi-truck"></i>
                            <h3>Envío Gratis</h3>
                            <p>En pedidos superiores a $50.000</p>
                        </div>
                        <div className="feature">
                            <i className="bi bi-shield-check"></i>
                            <h3>Compra Segura</h3>
                            <p>Pago 100% protegido</p>
                        </div>
                        <div className="feature">
                            <i className="bi bi-arrow-clockwise"></i>
                            <h3>Devoluciones Fáciles</h3>
                            <p>30 días de garantía</p>
                        </div>
                        <div className="feature">
                            <i className="bi bi-headset"></i>
                            <h3>Soporte 24/7</h3>
                            <p>Estamos aquí para ayudarte</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
