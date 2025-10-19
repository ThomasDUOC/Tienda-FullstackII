import { useState } from 'react';
import '../assets/css/contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // sim formulario
        console.log('Contact form submitted:', formData);
        setSubmitted(true);

        // formulario resetear
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setSubmitted(false);
        }, 3000);
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

                        {submitted && (
                            <div className="alert alert-success">
                                <i className="bi bi-check-circle-fill"></i>
                                ¡Mensaje enviado con éxito! Te responderemos pronto.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre Completo *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tu nombre completo"
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
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+56 9 1234 5678"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Asunto *</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="form-control"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un asunto</option>
                                    <option value="consulta">Consulta General</option>
                                    <option value="pedido">Seguimiento de Pedido</option>
                                    <option value="producto">Información de Producto</option>
                                    <option value="devolucion">Devoluciones y Cambios</option>
                                    <option value="tecnico">Soporte Técnico</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mensaje *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-control"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100">
                                <i className="bi bi-send-fill"></i> Enviar Mensaje
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
