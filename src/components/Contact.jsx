import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import '../assets/css/contact.css';

function Contact() {

    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Llamada directa con Axios (o usa el servicio si lo creaste)
            await axios.post('http://localhost:8080/api/v1/contacto', formData);
            
            showToast('¡Mensaje enviado! Te responderemos pronto.', 'success');
            
            // Limpiar formulario
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                asunto: '',
                mensaje: ''
            });

        } catch (error) {
            console.error("Error al enviar mensaje:", error);
            showToast('Hubo un error al enviar el mensaje. Intenta más tarde.', 'error');
        } finally {
            setLoading(false); // Desactivar carga siempre
        }
    };

    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-header">
                    <h1>Contáctanos</h1>
                    <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
                </div>

                <div className="contact-content">
                    {/* contactos */}
                    <div className="contact-info">
                        <h2>Información de Contacto</h2>

                        <div className="info-item">
                            <i className="bi bi-geo-alt-fill"></i>
                            <div>
                                <h3>Dirección</h3>
                                <p>Av. Principal 1234<br />Santiago, Chile</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <i className="bi bi-telephone-fill"></i>
                            <div>
                                <h3>Teléfono</h3>
                                <p>+56 2 2345 6789<br />Lun - Vie: 9:00 - 18:00</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <i className="bi bi-envelope-fill"></i>
                            <div>
                                <h3>Email</h3>
                                <p>info@levelup.cl<br />soporte@levelup.cl</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <i className="bi bi-clock-fill"></i>
                            <div>
                                <h3>Horario de Atención</h3>
                                <p>Lunes a Viernes: 9:00 - 20:00<br />
                                    Sábados: 10:00 - 18:00<br />
                                    Domingos: Cerrado</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3>Síguenos</h3>
                            <div className="social-icons">
                                <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="social-icon"><i className="bi bi-youtube"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* formulario */}
                    <div className="contact-form-container">
                        <h2>Envíanos un Mensaje</h2>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Completo *</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    className="form-control"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tu nombre completo"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Correo Electrónico *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="tu@email.com"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        className="form-control"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder="+56 9 1234 5678"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="asunto">Asunto *</label>
                                <select
                                    id="asunto"
                                    name="asunto"
                                    className="form-control"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                >
                                    <option value="">Selecciona un asunto</option>
                                    <option value="Consulta General">Consulta General</option>
                                    <option value="Seguimiento de Pedido">Seguimiento de Pedido</option>
                                    <option value="Informacion de Producto">Información de Producto</option>
                                    <option value="Devolucion y Cambios">Devoluciones y Cambios</option>
                                    <option value="Soporte Tecnico">Soporte Técnico</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="mensaje">Mensaje *</label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    className="form-control"
                                    rows="6"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                    placeholder="Escribe tu mensaje aquí..."
                                    disabled={loading}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                                {loading ? (
                                    <span><span className='spinner-border spinner-border-sm me-2'></span>Enviando...</span>
                                ) : (
                                    <span><i className="bi bi-send-fill"></i> Enviar Mensaje</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* preguntas frecuentes */}
                <div className="faq-section">
                    <h2>Preguntas Frecuentes</h2>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <i className="bi bi-question-circle"></i>
                            <h3>¿Cuál es el tiempo de entrega?</h3>
                            <p>Los pedidos se entregan entre 2-5 días hábiles en la Región Metropolitana y 3-7 días en regiones.</p>
                        </div>
                        <div className="faq-item">
                            <i className="bi bi-question-circle"></i>
                            <h3>¿Hacen envíos a todo Chile?</h3>
                            <p>Sí, realizamos envíos a todas las regiones de Chile. El envío es gratis en compras sobre $50.000.</p>
                        </div>
                        <div className="faq-item">
                            <i className="bi bi-question-circle"></i>
                            <h3>¿Cuál es la política de devoluciones?</h3>
                            <p>Aceptamos devoluciones dentro de 30 días desde la compra. El producto debe estar sin usar y en su embalaje original.</p>
                        </div>
                        <div className="faq-item">
                            <i className="bi bi-question-circle"></i>
                            <h3>¿Ofrecen garantía en los productos?</h3>
                            <p>Todos nuestros productos tienen garantía del fabricante. Consolas y accesorios: 1 año. Juegos: Según términos del editor.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
