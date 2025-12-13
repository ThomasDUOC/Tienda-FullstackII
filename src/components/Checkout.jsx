import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { datosRegiones } from '../data/regiones';
import { useToast } from '../context/ToastContext';
import axios from 'axios'
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
        region: '',
        comuna: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const [comunasDispo, setComunasDispo] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (userId && token) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/usuarios/${userId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const user = response.data;

                    // Separar nombre y apellido si es posible (ya que en BD es un solo campo)
                    const nombreCompleto = user.nombre || '';
                    const primerEspacio = nombreCompleto.indexOf(' ');
                    let nombre = nombreCompleto;
                    let apellido = '';

                    if (primerEspacio !== -1) {
                        nombre = nombreCompleto.substring(0, primerEspacio);
                        apellido = nombreCompleto.substring(primerEspacio + 1);
                    }

                    // Actualizamos el formulario preservando lo que no viene del perfil
                    setFormData(prev => ({
                        ...prev,
                        firstName: nombre,
                        lastName: apellido,
                        email: user.username || '', // En tu backend username es el email
                        phone: user.telefono ? String(user.telefono) : '',
                        address: user.direccion || ''
                        // Nota: Región y Comuna no se guardan en el perfil, así que quedan vacíos para que el usuario elija
                    }));

                } catch (error) {
                    console.error("Error cargando datos del usuario para checkout", error);
                }
            };
            fetchUserData();
        }
    }, []);

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentInput = (e) => {
        let { name, value } = e.target;

        if (name === 'cardNumber') {
            const raw = value.replace(/\D/g, '');
            const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
            value = formatted.substring(0, 19);
        }

        if (name === 'expiryDate') {
            const raw = value.replace(/\D/g, '');

            if (raw.length >= 3) {
                value = `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
            } else {
                value = raw;
            }
        }

        if (name === 'cardName') {
            value = value.toUpperCase();
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegionChange = (e) => {
        const regionKey = e.target.value;
        setFormData({
            ...formData,
            region: regionKey,
            comuna: ''
        });

        if (regionKey && datosRegiones[regionKey]) {
            setComunasDispo(datosRegiones[regionKey].comunas);
        } else {
            setComunasDispo([]);
        }
    };

    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId) {
            showToast('Debes iniciar sesión para comprar', 'info');
            navigate('/login');
            return;
        }

        if (formData.cardNumber.replace(/\s/g, '').length < 16) {
            showToast('El número de tarjeta esta incompleto', 'error');
            return;
        }

        try {
                const orderPayload = {
                    idUsuario: parseInt(userId),
                    nombre: formData.firstName,
                    apellido: formData.lastName,
                    email: formData.email,
                    telefono: formData.phone,
                    direccion: formData.address,
                    region: datosRegiones[formData.region]?.nombre || formData.region,
                    comuna: formData.comuna,
                    items: cartItems.map(item => ({
                        idProducto: item.id,
                        cantidad: item.quantity,
                        // Convertimos el precio formateado "$ 50.000" a número 50000
                        precio: typeof item.price === 'string' 
                                ? parseInt(item.price.replace(/\./g, '').replace('$', '').trim()) 
                                : item.price
                    }))
                };

                await axios.post('http://localhost:8080/api/v1/pedidos', orderPayload, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                showToast('¡Pedido realizado con éxito!', 'success');
                clearCart();
                navigate('/');
                
            } catch (error) {
                console.error("Error en checkout:", error);
                const msg = error.response?.data || "Error al procesar el pedido";
                showToast(msg, 'error');    
            }
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
                                            <label className="form-label">Región *</label>
                                            <select
                                                className="form-select"
                                                name="region"
                                                value={formData.region}
                                                onChange={handleRegionChange}
                                                required
                                            >
                                                <option value="">Seleccione región</option>
                                                {Object.keys(datosRegiones).map((key) => (
                                                    <option key={key} value={key}>
                                                        {datosRegiones[key].nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-mb-6'>
                                        <div className='mb-3'>
                                            <label className='form-label'>Comuna *</label>
                                            <select className='form-select' name='comuna' value={formData.comuna} onChange={handleChange} required disabled={!formData.region}>
                                                <option value=''>Seleccione comuna</option>
                                                {comunasDispo.map((comuna, index) => (
                                                    <option key={index} value={comuna}>
                                                        {comuna}
                                                    </option>
                                                ))}
                                            </select>
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
                                        placeholder="0000 0000 0000 0000"
                                        value={formData.cardNumber}
                                        onChange={handlePaymentInput}
                                        maxLength="19"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre en la Tarjeta *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cardName"
                                        placeholder='Ingrese nombre con MAYUSCULAS'
                                        value={formData.cardName}
                                        onChange={handlePaymentInput}
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
                                                onChange={handlePaymentInput}
                                                maxLength="5"
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
                                                onChange={handlePaymentInput}
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
