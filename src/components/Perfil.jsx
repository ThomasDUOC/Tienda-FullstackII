import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

function Perfil() {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const [userData, setUserData] = useState({
        id: '',
        nombre: '',
        rut: '',
        username: '', // CORREGIDO: Usamos 'username' en lugar de 'email'
        telefono: '',
        direccion: '',
        password: '',
        rol: ''
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/usuarios/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            // CORRECCIÓN CLAVE:
            // 1. Extraemos los datos que llegaron
            const data = response.data;
            
            // 2. Guardamos en el estado, PERO forzamos password a vacío
            // para evitar re-encriptarlo al guardar.
            setUserData({
                id: data.id,
                nombre: data.nombre,
                rut: data.rut,
                username: data.username, // Mapeamos el correo aquí
                telefono: data.telefono || '',
                direccion: data.direccion || '',
                rol: data.rol,
                password: '' // ¡IMPORTANTE! Lo dejamos vacío
            });

        } catch (error) {
            console.error("Error cargando perfil:", error);
            showToast("Error al cargar datos. Verifica tu conexión.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            // Preparamos el objeto para enviar
            // Si la password está vacía, la quitamos del objeto o la mandamos vacía
            // (Tu backend ya maneja que si está vacía, no la actualiza)
            const payload = { ...userData };
            
            await axios.put(`http://localhost:8080/api/v1/usuarios/${userId}`, payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            showToast("Datos actualizados correctamente", "success");
            // Opcional: Recargar datos para confirmar
            fetchUserData();

        } catch (error) {
            console.error("Error actualizando perfil:", error);
            showToast("Error al actualizar. Intenta nuevamente.", "error");
        }
    };

    if (loading) return <div className="container mt-5 text-center">Cargando perfil...</div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0"><i className="bi bi-person-lines-fill me-2"></i>Mi Cuenta</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* CAMPOS DE SOLO LECTURA */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre Completo</label>
                            <input 
                                type="text" 
                                className="form-control bg-light" 
                                value={userData.nombre} 
                                readOnly 
                                disabled 
                            />
                        </div>
                        
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">RUT</label>
                                <input 
                                    type="text" 
                                    className="form-control bg-light" 
                                    value={userData.rut} 
                                    readOnly 
                                    disabled 
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Correo Electrónico</label>
                                {/* OJO: Aquí mostramos userData.username */}
                                <input 
                                    type="email" 
                                    className="form-control bg-light" 
                                    value={userData.username} 
                                    readOnly 
                                    disabled 
                                />
                            </div>
                        </div>

                        <hr />
                        <h5 className="text-primary mb-3">Datos Editables</h5>

                        {/* CAMPOS EDITABLES */}
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="telefono" 
                                value={userData.telefono} 
                                onChange={handleChange} 
                                placeholder="Ej: 912345678"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="direccion" 
                                value={userData.direccion} 
                                onChange={handleChange} 
                                placeholder="Tu dirección de envío"
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-save me-2"></i> Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Perfil;