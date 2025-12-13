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
        username: '',
        direccion: '',
        password: '',
        rol: ''
    });

    const [initialData, setInitialData] = useState({});

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
            
            const data = response.data;
            
            const cleanData = {
                id: data.id,
                nombre: data.nombre,
                rut: data.rut,
                username: data.username,
                telefono: data.telefono || '',
                direccion: data.direccion || '',
                rol: data.rol,
                password: ''
            };

            setUserData(cleanData);
            setInitialData(cleanData);

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
            const payload = { ...userData };
            
            await axios.put(`http://localhost:8080/api/v1/usuarios/${userId}`, payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            showToast("Datos actualizados correctamente", "success");
            setInitialData({ ...userData });

        } catch (error) {
            console.error("Error actualizando perfil:", error);
            showToast("Error al actualizar. Intenta nuevamente.", "error");
        }
    };

    const handleLogout = () => {
        if (window.confirm("¿Estas seguro que quieres cerrar sesión?"))  {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            navigate('/');
            window.location.reload();
        }
    }

    const hasChanges = JSON.stringify(userData) !== JSON.stringify(initialData);

    if (loading) return <div className="container mt-5 text-center">Cargando perfil...</div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="card rounded-4 mx-auto" style={{ maxWidth: '600px', background: '#16213e' }}>
                <div className="card-header text-white">
                    <h4 className="mb-0 text-center fw-bold"><i className="bi bi-fill me-2"></i>Mi Cuenta</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* CAMPOS DE SOLO LECTURA */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre Completo</label>
                            <input 
                                type="text" 
                                className="form-control text-white"
                                style={{background: '#0f1419'}} 
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
                                    className="form-control text-white" 
                                    style={{background: '#0f1419'}}
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
                                    className="form-control text-white" 
                                    style={{background: '#0f1419'}}
                                    value={userData.username} 
                                    readOnly 
                                    disabled 
                                />
                            </div>
                        </div>

                        <hr/>
                        <h5 className="text-white fw-bold mb-3">Editar</h5>

                        {/* CAMPOS EDITABLES */}
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <div className='input-group'>
                                <span className='input-group-text text-whited fw-bold' style={{background: '#0f1419'}}>
                                    +56
                                </span>
                                <input 
                                    type="tel" 
                                    className="form-control border-start-0 ps-1" 
                                    name="telefono" 
                                    value={userData.telefono} 
                                    onChange={handleChange}
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                    placeholder="Ej: 912345678"
                                    maxLength={9}
                                />
                            </div>
                            <div className='form-text text-white' style={{fontSize: '0.8rem'}}>
                                Ingresa tu número de esta forma (ej: 912345678)
                            </div>
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
                            <button type="submit" className={`btn ${hasChanges ? 'btn-primary' : 'btn-primary'}`} disabled={!hasChanges}>
                                <i className={`bi ${hasChanges ? 'bi-save' : 'bi-check-circle'} me-2`}></i> 
                                {hasChanges ? 'Guardar Cambios' : 'Sin cambios pendientes'}
                            </button>
                        </div>
                    </form>

                    <hr className='my-4'/>
                    <div className='d-grid gap-2'>
                        <button type='button' className='btn btn-outline-danger' onClick={handleLogout}>
                            <i className='bi bi-box-arrow-right me-2'></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;