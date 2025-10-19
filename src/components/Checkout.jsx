import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/css/checkout.css';

export const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // sim de pago
        alert('¡Pedido realizado con éxito! Recibirás un email de confirmación.');
        clearCart();
        navigate('/');
    };

    const calculateItemTotal = (item) => {
        const price = parseFloat(item.price.replace('.', ''));
        return (price * item.quantity).toLocaleString('es-CL');
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Finalizar Compra</h1>

                <div className="checkout-content">
                    <div className="checkout-form">
                        <form onSubmit={handleSubmit}>
                            <section className="form-section">
                                <h3>Información de Contacto</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Nombre *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Apellidos *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Email *</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Teléfono *</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="form-section">
                                <h3>Dirección de Envío</h3>
                                <div className="mb-3">
                                    <label className="form-label">Dirección *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label className="form-label">Ciudad *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Código Postal *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="form-section">
                                <h3>Información de Pago</h3>
                                <div className="mb-3">
                                    <label className="form-label">Número de Tarjeta *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre en la Tarjeta *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Fecha de Expiración *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="expiryDate"
                                                placeholder="MM/AA"
                                                value={formData.expiryDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">CVV *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cvv"
                                                placeholder="123"
                                                maxLength="3"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <button type="submit" className="btn btn-primary btn-lg w-100">
                                Confirmar Pedido - ${getCartTotal()}
                            </button>
                        </form>
                    </div>

                    <div className="order-summary">
                        <h3>Resumen del Pedido</h3>
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="summary-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-info">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-quantity">Cantidad: {item.quantity}</p>
                                    </div>
                                    <p className="item-price">${calculateItemTotal(item)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="summary-totals">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
