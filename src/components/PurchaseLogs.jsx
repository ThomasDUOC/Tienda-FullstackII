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
            const filtered = orders.filter(order => 
                order.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toString().includes(searchTerm)
            );
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
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data);
            setFilteredOrders(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Error al cargar los pedidos. Verifica que el servidor esté funcionando.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return `$${price.toLocaleString('es-CL')}`;
    };

    const calculateOrderTotal = (items) => {
        if (!items || items.length === 0) return 0;
        return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    const viewOrderDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span><i className="bi bi-receipt me-2"></i> Registro de Compras</span>
                            <button 
                                className="btn btn-primary btn-sm"
                                onClick={fetchOrders}
                            >
                                <i className="bi bi-arrow-clockwise me-1"></i> Actualizar
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar por nombre, email o ID de pedido..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {filteredOrders.length === 0 ? (
                                <div className="text-center py-4">
                                    <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                                    <p className="text-muted mt-2">No hay pedidos registrados</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Cliente</th>
                                                <th>Email</th>
                                                <th>Teléfono</th>
                                                <th>Dirección</th>
                                                <th>Región</th>
                                                <th>Fecha</th>
                                                <th>Total</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td><strong>#{order.id}</strong></td>
                                                    <td>{order.nombre} {order.apellido}</td>
                                                    <td>{order.email}</td>
                                                    <td>{order.telefono}</td>
                                                    <td>{order.direccion}, {order.comuna}</td>
                                                    <td>{order.region}</td>
                                                    <td>{formatDate(order.fechaPedido)}</td>
                                                    <td><strong>{formatPrice(calculateOrderTotal(order.items))}</strong></td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-info"
                                                            onClick={() => viewOrderDetails(order)}
                                                        >
                                                            <i className="bi bi-eye"></i> Ver
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="mt-3">
                                <small className="text-muted">
                                    Mostrando {filteredOrders.length} de {orders.length} pedidos
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for order details */}
            {selectedOrder && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles del Pedido #{selectedOrder.id}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h6>Información del Cliente</h6>
                                        <p><strong>Nombre:</strong> {selectedOrder.nombre} {selectedOrder.apellido}</p>
                                        <p><strong>Email:</strong> {selectedOrder.email}</p>
                                        <p><strong>Teléfono:</strong> {selectedOrder.telefono}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Información de Envío</h6>
                                        <p><strong>Dirección:</strong> {selectedOrder.direccion}</p>
                                        <p><strong>Comuna:</strong> {selectedOrder.comuna}</p>
                                        <p><strong>Región:</strong> {selectedOrder.region}</p>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h6>Fecha del Pedido</h6>
                                        <p>{formatDate(selectedOrder.fechaPedido)}</p>
                                    </div>
                                </div>

                                <h6>Productos</h6>
                                <div className="table-responsive">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>ID Producto</th>
                                                <th>Cantidad</th>
                                                <th>Precio Unitario</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.items && selectedOrder.items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.idProducto}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{formatPrice(item.precio)}</td>
                                                    <td>{formatPrice(item.precio * item.cantidad)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                                <td><strong>{formatPrice(calculateOrderTotal(selectedOrder.items))}</strong></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PurchaseLogs;
