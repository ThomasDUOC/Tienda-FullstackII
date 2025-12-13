import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MisPedidos() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMisPedidos();
    }, []);

    const fetchMisPedidos = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            // Endpoint específico para pedidos del usuario
            const response = await axios.get(`http://localhost:8080/api/v1/pedidos/usuario/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Ordenamos por ID descendente (el más reciente primero)
            const sortedOrders = response.data.sort((a, b) => b.id - a.id);
            setOrders(sortedOrders);
        } catch (err) {
            console.error('Error cargando mis pedidos:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-CL', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }

    const formatPrice = (price) => `$${(price || 0).toLocaleString('es-CL')}`;

    const calculateTotal = (order) => {
        if (order.total > 0) return order.total;
        return order.detalles?.reduce((acc, item) => acc + (item.precioUnitario * item.cantidad), 0) || 0;
    };

    const getStatusBadgeClass = (estado) => {
        switch ((estado || '').toUpperCase()) {
            case 'COMPLETADO': return 'bg-success';
            case 'ENVIADO': return 'bg-primary';
            case 'CANCELADO': return 'bg-danger';
            default: return 'bg-warning text-dark';
        }
    };

    const closeModal = () => setSelectedOrder(null);

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><i className="bi bi-bag-check me-2"></i> Mis Pedidos</h2>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/perfil')}>
                    <i className="bi bi-arrow-left me-2"></i> Volver al Perfil
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="alert alert-info text-center py-5">
                    <h4>Aún no has realizado compras</h4>
                    <p>¡Explora nuestro catálogo y encuentra algo genial!</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/products')}>Ir a la Tienda</button>
                </div>
            ) : (
                <div className="card dark-sm border-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr className="text-white fw-bold">
                                    <th>N° Pedido</th>
                                    <th>Fecha</th>
                                    <th>Dirección de Envío</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td className="text-white">#{order.id}</td>
                                        <td className="text-white">{formatDate(order.fecha)}</td>
                                        <td>
                                            {order.envio ? (
                                                <small className="text-white">{order.envio.direccion}, {order.envio.comuna}</small>
                                            ) : <span className="text-muted small">Retiro / Digital</span>}
                                        </td>
                                        <td>
                                            <span className={`badge ${getStatusBadgeClass(order.estado)}`}>
                                                {order.estado || 'PENDIENTE'}
                                            </span>
                                        </td>
                                        <td className="fw-bold text-white">
                                            {formatPrice(calculateTotal(order))}
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                <i className="bi bi-eye"></i> Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL DE DETALLE (Mismo diseño oscuro que PurchaseLogs) */}
            {selectedOrder && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">Pedido #{selectedOrder.id}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body bg-dark">
                                <div className="card border-0 shadow-sm mb-3">
                                    <div className="card-body bg-primary rounded-3">
                                        <h6 className="fw-bold text-white mb-3"><i className="bi bi-truck me-2"></i> Datos de Entrega</h6>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <small className="text-muted d-block">Recibe:</small>
                                                <strong>{selectedOrder.envio?.nombreContacto}</strong>
                                            </div>
                                            <div className="col-md-6">
                                                <small className="text-muted d-block">Dirección:</small>
                                                <span>{selectedOrder.envio?.direccion}, {selectedOrder.envio?.comuna}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <small className="text-muted d-block">Teléfono:</small>
                                                <span>{selectedOrder.envio?.telefonoContacto}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <small className="text-muted d-block">Fecha Compra:</small>
                                                <span>{formatDate(selectedOrder.fecha)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm rounded-3">
                                    <div className="card-header bg-shadow fw-bold">Productos</div>
                                    <div className="table-responsive">
                                        <table className="table table-sm mb-0">
                                            <thead className="table-shadow">
                                                <tr>
                                                    <th className="fw-bold text-white">Producto</th>
                                                    <th className="text-center text-white fw-bold">Cant</th>
                                                    <th className="text-end fw-bold text-white">Precio</th>
                                                    <th className="text-end fw-bold text-white">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedOrder.detalles?.map(det => (
                                                    <tr key={det.id}>
                                                        <td className="text-muted">{det.producto?.nombre}</td>
                                                        <td className="text-center text-muted">{det.cantidad}</td>
                                                        <td className="text-end text-muted">{formatPrice(det.precioUnitario)}</td>
                                                        <td className="text-end fw-bold text-muted">{formatPrice(det.precioUnitario * det.cantidad)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="table-shadow">
                                                <tr>
                                                    <td colSpan="3" className="text-end fw-bold text-white">Total Pagado:</td>
                                                    <td className="text-end fw-bold fs-5">
                                                        {formatPrice(calculateTotal(selectedOrder))}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-dark border-top-0">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MisPedidos;