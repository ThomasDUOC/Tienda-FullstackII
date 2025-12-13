import { useState, useEffect } from 'react';
import axios from 'axios';

function PurchaseLogs() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const filtered = orders.filter(order => {
                const nombreCliente = order.envio?.nombreContacto || order.usuario?.nombre || '';
                const emailCliente = order.envio?.emailContacto || order.usuario?.email || '';
                const idPedido = order.id.toString();
                
                return (
                    nombreCliente.toLowerCase().includes(term) ||
                    emailCliente.toLowerCase().includes(term) ||
                    idPedido.includes(term)
                );
            });
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    }, [searchTerm, orders]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1/pedidos', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOrders(response.data);
            setFilteredOrders(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Error al cargar pedidos. Verifica tu conexión.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha desconocida';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-CL', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    const formatPrice = (price) => {
        return `$${(price || 0).toLocaleString('es-CL')}`;
    };

    const calculateOrderTotal = (order) => {
        if (order.total && order.total > 0) return order.total;
        const items = order.detalles || order.items || [];
        if (items.length === 0) return 0;
        return items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
    };

    const viewOrderDetails = (order) => setSelectedOrder(order);
    const closeModal = () => setSelectedOrder(null);

    const getStatusBadgeClass = (estado) => {
        switch ((estado || '').toUpperCase()) {
            case 'COMPLETADO': return 'bg-success';
            case 'ENVIADO': return 'bg-primary';
            case 'CANCELADO': return 'bg-danger';
            default: return 'bg-warning text-dark';
        }
    }

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container-fluid">
            <div className="card shadow-sm">
                <div className="card-header bg-shadow d-flex justify-content-between align-items-center">
                    <h5 className="mb-0"><i className="bi bi-receipt me-2"></i> Registro de Ventas</h5>
                    <button className="btn btn-outline-primary btn-sm" onClick={fetchOrders}>
                        <i className="bi bi-arrow-clockwise"></i> Actualizar
                    </button>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por cliente, email o ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-4 text-muted">No se encontraron pedidos.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Cliente</th>
                                        <th>Región / Comuna</th>
                                        <th>Estado</th>
                                        <th>Total</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map(order => (
                                        <tr key={order.id}>
                                            <td><strong>#{order.id}</strong></td>
                                            <td>{formatDate(order.fecha)}</td>
                                            <td>
                                                <div className='d-flex flex-column'>
                                                    <span className='fw-bold'>{order.envio?.nombreContacto || 'Cliente Web'}</span>
                                                    <small className='text-muted'>{order.envio?.emailContacto}</small>
                                                </div>
                                            </td>
                                            <td>
                                                {order.envio ? (
                                                    <span>{order.envio.region}, {order.envio.comuna}</span>
                                                ) : (
                                                    <span className='text-muted fst-italic'>Sin datos</span>
                                                )}
                                            </td>
                                            <td>
                                                <span className={`badge ${getStatusBadgeClass(order.estado)}`}>
                                                    {order.estado || 'PENDIENTE'}
                                                </span>
                                            </td>
                                            <td className='fw-bold text-white'>
                                                {formatPrice(calculateOrderTotal(order))}
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-primary text-white" onClick={() => viewOrderDetails(order)}>
                                                    <i className="bi bi-eye"></i> Detalle
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL DETALLES */}
            {selectedOrder && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">Detalle Pedido #{selectedOrder.id}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                            </div>
                            
                            {/* CUERPO DEL MODAL */}
                            <div className="modal-body bg-dark text-white">
                                <div className='container-fluid p-0'>
                                    
                                    {/* Sección Superior: Datos Cliente y Envío */}
                                    <div className='row mb-3'>
                                        <div className='col-md-6'>
                                            <div className='card h-100 border-0 shadow-sm bg-dark text-white'>
                                                <div className='card-body'>
                                                    <h6 className='card-title fw-bold mb-3 border-bottom pb-2'>
                                                        <i className='bi bi-person me-2'></i> Datos del Cliente
                                                    </h6>
                                                    <p className='mb-1'><strong>Nombre:</strong> {selectedOrder.envio?.nombreContacto}</p>
                                                    <p className='mb-1'><strong>Email:</strong> {selectedOrder.envio?.emailContacto}</p>
                                                    <p className='mb-1'><strong>Teléfono: +56</strong> {selectedOrder.envio?.telefonoContacto}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 mt-3 mt-md-0'>
                                            <div className='card h-100 border-0 shadow-sm bg-dark text-white'>
                                                <div className='card-body'>
                                                    <h6 className='card-title fw-bold mb-3 border-bottom pb-2'>
                                                        <i className='bi bi-truck me-2'></i> Datos de Envío
                                                    </h6>
                                                    <p className='mb-1'><strong>Región:</strong> {selectedOrder.envio?.region}</p>
                                                    <p className="mb-1"><strong>Comuna:</strong> {selectedOrder.envio?.comuna}</p>
                                                    <p className="mb-1"><strong>Dirección:</strong> {selectedOrder.envio?.direccion}</p>
                                                    <p className="mb-0 small text-white-50 mt-2">Fecha: {formatDate(selectedOrder.fecha)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tabla de Productos */}
                                    <div className='card border-0 shadow-sm bg-secondary'>
                                        <div className='card-body p-0'>
                                            <div className='table-responsive'>
                                                <table className='table table-striped table-dark mb-0'>
                                                    <thead>
                                                        <tr>
                                                            <th>Producto</th>
                                                            <th className='text-center'>Cant.</th>
                                                            <th className='text-end'>Precio Unit.</th>
                                                            <th className='text-end'>Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedOrder.detalles && selectedOrder.detalles.map((detalle) => (
                                                            <tr key={detalle.id}>
                                                                <td>{detalle.producto?.nombre || 'Producto eliminado'}</td>
                                                                <td className='text-center'>{detalle.cantidad}</td>
                                                                <td className='text-end'>{formatPrice(detalle.precioUnitario)}</td>
                                                                <td className='text-end fw-bold'>
                                                                    {formatPrice(detalle.precioUnitario * detalle.cantidad)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colSpan="3" className='text-end fw-bold fs-5'>TOTAL:</td>
                                                            <td className='text-end fw-bold fs-5 text-white'>
                                                                {formatPrice(selectedOrder.total || calculateOrderTotal(selectedOrder))}
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* FOOTER */}
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

export default PurchaseLogs;