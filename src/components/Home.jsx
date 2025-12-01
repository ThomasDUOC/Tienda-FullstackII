import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import ps51920 from '../assets/images/ps51920.jpg'
import god from '../assets/images/godwall.jpg';
import tlou from '../assets/images/tlouwall.png';
import '../assets/css/home.css';

const carouselSlides = [
    {
        id: 0,
        image: tlou,
        title: 'The Last of Us Part II',
        description: '¡Ya Disponible!',
        alt: 'The Last of Us Part II',
        link: '/product/7'
    },
    {
        id: 1,
        image: ps51920,
        title: 'PlayStation 5',
        description: 'La nueva generación de consolas ya está aquí.',
        alt: 'PlayStation 5',
        link: '/product/1'
    },
    {
        id: 2,
        image: god,
        title: 'God of War Ragnarök',
        description: 'Acompaña a Kratos y Atreus en su viaje épico.',
        alt: 'God of War Ragnarök',
        link: '/product/5'
    }
];

function Home() {
    const { products, loading } = useProducts();
    const featuredProducts = products.filter(product => product.destacado === true);

    if (loading) {
        return <div className='text-center mt-5'>Cargando productos...</div>;
    }

    return (
        <div className="home-page">
            {/* carrusel */}
            <div className='container mt-4'>
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        {carouselSlides.map((slide, index) => (
                            <button 
                            key={slide.id} 
                            type="button" 
                            data-bs-target="#carouselExampleIndicators" 
                            data-bs-slide-to={index} 
                            className={index === 0 ? "active" : ""} 
                            aria-current={index === 0 ? "true" : "false"} 
                            aria-label={`Slide ${index + 1}`}>
                            </button>
                    ))}
                    </div>
                    <div className="carousel-inner">
                        {carouselSlides.map((slide, index) => (
                            <div key={slide.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <Link to={slide.link}>
                                    <img src={slide.image} className="d-block w-100" alt={slide.alt} />
                                </Link>
                                {slide.title && (
                                    <div className='carousel-caption d-none d-md-block position-absolute top-p start-0 text-start m-3 p-1 bg-dark bg-opacity-50 rounded w-50'>
                                        <h5>{slide.title}</h5>
                                        <p>{slide.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
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

            {/* cats */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Explora por Categoría</h2>
                    <div className="categories-grid">
                        <Link to="/products?category=Consolas" className="category-card">
                            <i className="bi bi-controller"></i>
                            <h3>Consolas</h3>
                            <p>PlayStation, Xbox, Nintendo Switch</p>
                        </Link>
                        <Link to="/products?category=Juegos" className="category-card">
                            <i className="bi bi-disc"></i>
                            <h3>Juegos</h3>
                            <p>Los últimos lanzamientos</p>
                        </Link>
                        <Link to="/products?category=Accesorios" className="category-card">
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
                        {featuredProducts.length > 0 ? (
                            featuredProducts.slice(0, 8).map(product => (
                                <ProductCard key={product.id} product={product} showAddToCart={false} />
                        ))
                    ) : (
                            <p className='text-center'> No hay productos destacados por ahora</p>
                    )}
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
