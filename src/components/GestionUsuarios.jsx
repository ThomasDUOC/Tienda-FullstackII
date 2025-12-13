import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from  '../context/ToastContext';

function GestionUsuarios() {
    const { showToast } = useToast();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const currentAdminId = parseInt(localStorage.getItem('userId')); // ID del admin logueado

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filtrar
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const result = users.filter(user => 
            user.nombre.toLowerCase().includes(term) ||
            user.username.toLowerCase().includes(term) ||
            user.rut.toLowerCase().includes(term)
        );
        setFilteredUsers(result);
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1/usuarios', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
            showToast("Error al cargar la lista de usuarios", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (user) => {
        if (user.id === currentAdminId) {
            showToast("No puedes desactivar la cuenta administrador", "warning");
            return;
        }

        const action = user.enabled ? "desactivar" : "activar";
        if(!window.confirm(`¿Estás seguro de ${action} a ${user.nombre}?`)) return;

        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:8080/api/v1/usuarios/${user.id}/estado`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            showToast(`Usuario ${user.enabled ? 'desactivado' : 'activado'} correctamente`, "success");
            fetchUsers();
        } catch (error) {
            console.error("Error cambiando estado de cuenta:", error);
            showToast("Error al cambiar el estado de la cuenta", "error");
        }
    }

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0"><i className="bi bi-people-fill me-2"></i> Gestión de Usuarios</h5>
                </div>
                <div className="card-body">
                    {/* Buscador */}
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text bg-dark border-end-0"><i className="bi bi-search"></i></span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 ps-0" 
                                placeholder="Buscar por nombre, email o RUT..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email / Usuario</th>
                                    <th>RUT</th>
                                    <th>Rol</th>
                                    <th className="text-center">Estado</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className={!user.enabled ? "table-dark text-muted" : ""}>
                                        <td>{user.id}</td>
                                        <td className="fw-bold">
                                            {user.nombre}
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.rut}</td>
                                        <td>
                                            <span className={`badge ${user.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                                {user.rol}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {user.enabled ? (
                                                <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Activo</span>
                                            ) : (
                                                <span className="badge bg-danger"><i className="bi bi-ban me-1"></i>Inactivo</span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {user.id !== currentAdminId ? (
                                                <button 
                                                    className={`btn btn-sm ${user.enabled ? 'btn-outline-danger' : 'btn-outline-success'}`} 
                                                    onClick={() => handleToggleStatus(user)}
                                                    title={user.enabled ? "Desactivar Cuenta" : "Activar Cuenta"}
                                                >
                                                    {user.enabled ? <i className="bi bi-person-slash"></i> : <i className="bi bi-person-check-fill"></i>}
                                                </button>
                                            ) : (
                                                <small className="text-muted-white fst-italic"> 
                                                    <i className="bi bi-block-fill"></i> Cuenta protegida
                                                </small>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">No se encontraron usuarios.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionUsuarios;