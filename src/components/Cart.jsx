import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/css/cart.css';

export const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const calculateItemTotal = (item) => {
        const price = parseFloat(item.price.replace('.', ''));
        return (price * item.quantity).toLocaleString('es-CL');
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <h1>Carrito de Compras</h1>
                    <div className="empty-cart">
                        <i className="bi bi-cart-x"></i>
                        <h2>Tu carrito está vacío</h2>
                        <p>¡Agrega algunos productos para comenzar!</p>
                        <Link to="/products" className="btn btn-primary">
                            Ver Productos
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1>Carrito de Compras</h1>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />

                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    {item.platform && (
                                        <span className="badge bg-secondary">{item.platform}</span>
                                    )}
                                    <p className="item-price">${item.price}</p>
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    <strong>${calculateItemTotal(item)}</strong>
                                </div>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Resumen del Pedido</h3>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${getCartTotal()}</span>
                        </div>

                        <div className="summary-row">
                            <span>Envío:</span>
                            <span>Gratis</span>
                        </div>

                        <div className="summary-row total">
                            <strong>Total:</strong>
                            <strong>${getCartTotal()}</strong>
                        </div>

                        <Link to="/checkout" className="btn btn-primary btn-lg w-100 mt-3">
                            Proceder al Pago
                        </Link>

                        <button
                            className="btn btn-outline-danger w-100 mt-2"
                            onClick={clearCart}
                        >
                            Vaciar Carrito
                        </button>

                        <Link to="/products" className="btn btn-outline-secondary w-100 mt-2">
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
