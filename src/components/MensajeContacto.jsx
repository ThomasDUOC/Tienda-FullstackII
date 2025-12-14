import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function MensajeContacto() {
    const { showToast } = useToast();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1/contacto', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Ordenar: No leídos primero, luego por fecha más reciente
            const sorted = response.data.sort((a, b) => {
                if (a.leido === b.leido) {
                    return new Date(b.fechaEnvio) - new Date(a.fechaEnvio);
                }
                return a.leido ? 1 : -1;
            });
            setMessages(sorted);
        } catch (error) {
            console.error("Error cargando mensajes:", error);
            showToast("Error al cargar mensajes de contacto", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleRead = async (msg) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:8080/api/v1/contacto/${msg.id}/leido`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Actualizar localmente para no recargar todo
            setMessages(prev => prev.map(m => 
                m.id === msg.id ? { ...m, leido: !m.leido } : m
            ));
            showToast(msg.leido ? "Marcado como no leído" : "Marcado como leído", "success");
        } catch (error) {
            console.error("Error actualizando estado:", error);
            showToast("Error al actualizar el mensaje", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este mensaje?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/v1/contacto/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMessages(prev => prev.filter(m => m.id !== id));
            showToast("Mensaje eliminado", "success");
            if (selectedMessage?.id === id) setSelectedMessage(null); // Cerrar modal si estaba abierto
        } catch (error) {
            showToast("Error al eliminar", "error");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-CL', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'
        });
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0 fw-bold"><i className="bi bi-envelope-paper me-2"></i> Buzón</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-shadow">
                                <tr>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Remitente</th>
                                    <th>Asunto</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(msg => (
                                    <tr key={msg.id} className={msg.leido ? "text-muted" : "fw-bold table-active"}>
                                        <td>
                                            {msg.leido ? 
                                                <span className="badge bg-secondary">Leído</span> : 
                                                <span className="badge bg-success">Nuevo</span>
                                            }
                                        </td>
                                        <td>{formatDate(msg.fechaEnvio)}</td>
                                        <td>
                                            <div>{msg.nombre}</div>
                                            <small className="text-muted fw-normal">{msg.email}</small>
                                        </td>
                                        <td>{msg.asunto}</td>
                                        <td className="text-center">
                                            <div className="btn-group">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary" 
                                                    onClick={() => setSelectedMessage(msg)}
                                                    title="Leer Mensaje Completo"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button 
                                                    className={`btn btn-sm ${msg.leido ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                                                    onClick={() => handleToggleRead(msg)}
                                                    title={msg.leido ? "Marcar como No Leído" : "Marcar como Leído"}
                                                >
                                                    {msg.leido ? <i className="bi bi-envelope"></i> : <i className="bi bi-envelope-open"></i>}
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger" 
                                                    onClick={() => handleDelete(msg.id)}
                                                    title="Eliminar"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {messages.length === 0 && (
                                    <tr><td colSpan="5" className="text-center py-5">No hay mensajes.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL PARA LEER MENSAJE */}
            {selectedMessage && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content shadow border-0">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">Mensaje de {selectedMessage.nombre}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedMessage(null)}></button>
                            </div>
                            <div className="modal-body p-4 bg-dark">
                                <div className="mb-3 d-flex justify-content-between text-muted border-bottom pb-2">
                                    <span><i className="bi bi-calendar me-2"></i>{formatDate(selectedMessage.fechaEnvio)}</span>
                                    <span><i className="bi bi-envelope me-2"></i>{selectedMessage.email}</span>
                                    {selectedMessage.telefono && <span><i className="bi bi-telephone me-2"></i>{selectedMessage.telefono}</span>}
                                </div>
                                <h5 className="fw-bold mb-3">{selectedMessage.asunto}</h5>
                                <div className="p-3 bg-primary rounded border">
                                    <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.mensaje}</p>
                                </div>
                            </div>
                            <div className="modal-footer bg-dark border-top-0">
                                {!selectedMessage.leido && (
                                    <button className="btn btn-primary" onClick={() => { handleToggleRead(selectedMessage); setSelectedMessage(null); }}>
                                        Marcar como Leído y Cerrar
                                    </button>
                                )}
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedMessage(null)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MensajeContacto;