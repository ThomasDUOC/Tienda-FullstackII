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

    // Filtro corregido para buscar dentro de los objetos anidados (envio)
    useEffect(() => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const filtered = orders.filter(order => {
                // Lógica "Blindada": Busca en estructura anidada O plana
                const nombre = order.envio?.nombreContacto || order.nombre || '';
                const email = order.envio?.emailContacto || order.email || '';
                
                return (
                    nombre.toLowerCase().includes(term) ||
                    email.toLowerCase().includes(term) ||
                    order.id.toString().includes(term)
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
            // Asegúrate de que este endpoint devuelve todos los pedidos (requiere ADMIN)
            const response = await axios.get('http://localhost:8080/api/v1/pedidos', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("Datos recibidos del backend:", response.data);
            setOrders(response.data);
            setFilteredOrders(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Error al cargar pedidos. Verifica tu conexión o permisos de administrador.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha desconocida';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-CL', {
                year: 'numeric', month: 'long', day: 'numeric',
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
        if (order.total && order.total > 0) return order.total; // Si ya viene el total, úsalo
        
        // Si no, calcúlalo. Soporta 'detalles' o 'items'
        const items = order.detalles || order.items || [];
        if (items.length === 0) return 0;
        
        return items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
    };
    // Helpers para obtener datos de forma segura (Hybrid Access)
    const getClientName = (order) => order.envio?.nombreContacto || `${order.nombre || ''} ${order.apellido || ''}`.trim() || 'Cliente Web';
    const getClientEmail = (order) => order.envio?.emailContacto || order.email || 'Sin email';
    const getClientAddress = (order) => order.envio?.direccion || order.direccion || '';
    const getClientRegion = (order) => order.envio?.region || order.region || '';
    const getOrderDate = (order) => order.fecha || order.fechaPedido;

    const viewOrderDetails = (order) => setSelectedOrder(order);
    const closeModal = () => setSelectedOrder(null);

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
                                <thead className="table-primary">
                                    <tr>
                                        <th>ID</th>
                                        <th>Cliente</th>
                                        <th>Email</th>
                                        <th>Región</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Detalle</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map(order => (
                                        <tr key={order.id}>
                                            <td><strong>#{order.id}</strong></td>
                                            <td>{getClientName(order)}</td>
                                            <td>{getClientEmail(order)}</td>
                                            <td>{getClientRegion(order)}</td>
                                            <td>{formatDate(getOrderDate(order))}</td>
                                            <td><strong>{formatPrice(calculateOrderTotal(order))}</strong></td>
                                            <td>
                                                <button className="btn btn-sm btn-primary text-white" onClick={() => viewOrderDetails(order)}>
                                                    <i className="bi bi-eye"></i> Ver
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
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">Pedido #{selectedOrder.id}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body bg-dark">
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <h6 className="text-primary text-uppercase small fw-bold">Cliente</h6>
                                        <p className="mb-1"><strong>{getClientName(selectedOrder)}</strong></p>
                                        <h6 className='text-primary text-uppercase small fw-bold'>Email</h6>
                                        <p className="mb-1">{getClientEmail(selectedOrder)}</p>
                                        <h6 className='text-primary text-uppercase small fw-bold'>Telefono</h6>
                                        <p className="mb-1">{selectedOrder.telefono}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-primary text-uppercase small fw-bold">Envío</h6>
                                        <p className="mb-1">{getClientAddress(selectedOrder)}</p>
                                        <p className="mb-1">{selectedOrder.comuna}, {getClientRegion(selectedOrder)}</p>
                                    </div>
                                </div>

                                <h6 className="text-white text-uppercase small fw-bold mb-3">Productos</h6>
                                <div className="table-responsive">
                                    <table className="table table-sm table-bordered">
                                        <thead className="table-shadow">
                                            <tr>
                                                <th>Producto</th>
                                                <th className="text-center">Cant.</th>
                                                <th className="text-end">Precio Unit.</th>
                                                <th className="text-end">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Soporta tanto 'detalles' como 'items' */}
                                            {(selectedOrder.detalles || selectedOrder.items || []).map((detalle, index) => (
                                                <tr key={index}>
                                                    <td>{detalle.producto?.nombre || 'Producto eliminado'}</td>
                                                    <td className="text-center">{detalle.cantidad}</td>
                                                    <td className="text-end">{formatPrice(detalle.precioUnitario)}</td>
                                                    <td className="text-end">{formatPrice(detalle.precioUnitario * detalle.cantidad)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-end mt-3">
                                    <h5>Total: {formatPrice(calculateOrderTotal(selectedOrder))}</h5>
                                </div>
                            </div>
                            <div className="modal-footer bg-light border-top-0">
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