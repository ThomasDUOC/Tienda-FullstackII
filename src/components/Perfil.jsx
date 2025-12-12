import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

function Perfil() {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '', // Si tu backend separa nombre y apellido
        rut: '',
        email: '',
        telefono: '',
        direccion: '',
        password: '' // Necesario para re-enviar el objeto usuario completo si el backend lo requiere
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
            setUserData(response.data);
        } catch (error)  {
            console.error ("Error cargando perfil:", error);
            showToast("Error al cargar datos del usuario", "error");
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
            await axios.put(`http://localhost:8080/api/v1/usuarios/${userId}`, userData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            showToast("Datos actualizados correctamente", "success");
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            showToast("Error al actualizar los datos", "error");
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
                        {/* CAMPOS DE SOLO LECTURA (readonly) */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre Completo</label>
                            <input type="text" className="form-control bg-light" value={`${userData.nombre} ${userData.apellido || ''}`} readOnly disabled />
                        </div>
                        
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">RUT</label>
                                <input type="text" className="form-control bg-light" value={userData.rut} readOnly disabled />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Correo Electrónico</label>
                                <input type="email" className="form-control bg-light" value={userData.email} readOnly disabled />
                            </div>
                        </div>

                        <hr />
                        <h5 className="text-primary mb-3">Datos Editables</h5>

                        {/* CAMPOS EDITABLES */}
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="telefono" 
                                value={userData.telefono} 
                                onChange={handleChange} 
                                placeholder="+56 9 1234 5678"
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