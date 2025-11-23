import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
//import { getProductById } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import '../assets/css/productdetail.css';

export const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const product = products.find(p => p.id.toString() === id);
    const { addToCart, cartItems } = useCart();
    const { showToast } = useToast();
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    Producto no encontrado
                </div>
                <Link to="/products" className="btn btn-primary">
                    Volver a productos
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        // Se busca si el producto ya existe en el carrito
        const itemInCart = cartItems?.find(item => item.id === product.id);
        // Se obtiene la cantidad que ya esta guardada en el carrito
        const currentCartQuantity = itemInCart ? itemInCart.quantity : 0;

        if (currentCartQuantity + quantity > product.stock) {
            showToast(`No puedes añadir más de ${product.stock} unidades de ${product.name}.`, 'error');
            return;
        }
        addToCart(product, quantity);
        showToast(`¡${product.name} ha sido añadido al carrito!`);
    };
    

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const calculateTotal = () => {
        const price = parseFloat(product.price.replace('.', ''));
        return (price * quantity).toLocaleString('es-CL');
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/products">Productos</Link></li>
                        <li className="breadcrumb-item active">{product.name}</li>
                    </ol>
                </nav>

                <div className="product-detail">
                    <div className="product-images">
                        <img src={product.image} alt={product.name} className="main-image" />
                    </div>

                    <div className="product-details">
                        <h1>{product.name}</h1>

                        {product.platform && (
                            <span className="badge bg-secondary mb-3">{product.platform}</span>
                        )}

                        <div className="product-price-section">
                            <span className="price">${product.price}</span>
                            {product.stock > 0 ? (
                                <span className="stock-status in-stock">
                                    <i className="bi bi-check-circle"></i> En stock ({product.stock} disponibles)
                                </span>
                            ) : (
                                <span className="stock-status out-of-stock">
                                    <i className="bi bi-x-circle"></i> Agotado
                                </span>
                            )}
                        </div>

                        <p className="product-description">{product.description}</p>

                        {product.stock > 0 && (
                            <div className="purchase-section">
                                <div className="quantity-selector">
                                    <label>Cantidad:</label>
                                    <div className="quantity-controls">
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{quantity}</span>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= product.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary btn-lg w-100 mt-3"
                                    onClick={handleAddToCart}
                                >
                                    <i className="bi bi-cart-plus"></i> Añadir al carrito
                                </button>

                                <div className="total-price mt-3">
                                    Total: <strong>${calculateTotal()}</strong>
                                </div>
                            </div>
                        )}

                        <div className="product-info-list mt-4">
                            <h3>Información del producto</h3>
                            <ul>
                                <li><strong>Categoría:</strong> {product.category}</li>
                                {product.platform && <li><strong>Plataforma:</strong> {product.platform}</li>}
                                <li><strong>SKU:</strong> PRD-{product.id.toString().padStart(4, '0')}</li>
                            </ul>
                        </div>

                        {product.specs && (
                            <div className="product-specs mt-4">
                                <h3>Especificaciones Técnicas</h3>
                                <div className="specs-grid">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="spec-item">
                                            <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                                            <span className="spec-value">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
