import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/css/productcard.css';

export const ProductCard = ({ product, showAddToCart = true }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        // notif
        alert(`${product.name} añadido al carrito`);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.stock < 5 && product.stock > 0 && (
                        <span className="badge bg-warning">¡Últimas unidades!</span>
                    )}
                    {product.stock === 0 && (
                        <span className="badge bg-danger">Agotado</span>
                    )}
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    {product.platform && (
                        <span className="product-platform badge bg-secondary">
                            {product.platform}
                        </span>
                    )}
                    <p className="product-price">${product.price}</p>
                </div>
            </Link>
            {showAddToCart && (
                <button
                    className="btn btn-primary w-100"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                </button>
            )}
        </div>
    );
};
