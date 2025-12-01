import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../assets/js/validators.js';
import Logo from '../assets/images/Level-Up-Logo.png';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estado para errores de login (ej: "Usuario no encontrado")
    const [loginError, setLoginError] = useState(''); 

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    // --- NUEVO HANDLE SUBMIT ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); // Limpiar errores previos

        try {
            // Llamada al backend
            const response = await axios.post('http://localhost:8080/auth/login', {
                username: email,
                password: password
            });

            const data = response.data;

            if (data.token) {
                localStorage.setItem('token', data.token);
                if (data.role) localStorage.setItem('userRole', data.role);
                if (data.userId) localStorage.setItem('userId', data.userId);

                if (data.role === 'ADMIN') {
                    navigate('/vistaadmin');
                } else {
                    navigate('/');
                }
            }
            
        } catch (error) {
            console.error(error);
            setLoginError('Credenciales incorrectas o error de conexión.');
        }
    };

    const isEmailValid = validateEmail(email);
    // Nota: A veces la validación de contraseña en frontend es muy estricta para el login, 
    // asegúrate que coincida con lo que permite el backend.
    const isPasswordValid = validatePassword(password); 
    const isFormValid = isEmailValid && isPasswordValid;

    return (
        <div>
            {/* ... (Tu código de imagen Logo se mantiene igual) ... */}
            <div className="d-flex justify-content-center pb-4">
                <img src={Logo} className='img-fluid' style={{ width: '17.5%', height: 'auto' }} alt='Imagen' />
            </div>

            <div className="d-flex justify-content-center align-items-center vh-10">
                <form onSubmit={handleSubmit} style={{ width: '500px', minHeight: '500px'}} noValidate>
                    <fieldset className='card rounded-4' style={{background: '#16213e', borderColor: '#091521c0' }}>
                        <legend className="text-center pt-4" style={{color: '#f8f9fa'}}>Inicio Sesión</legend>

                        {/* MENSAJE DE ERROR SI FALLA EL LOGIN */}
                        {loginError && (
                            <div className="alert alert-danger text-center mx-3" role="alert">
                                {loginError}
                            </div>
                        )}

                        <div className="mb-4">
                            <label htmlFor="emailInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>Correo</label>
                            <input 
                                type="email" 
                                name="email" 
                                style={{marginLeft: '15px', width: '465px'}} 
                                className={`form-control ${touched.email && (isEmailValid ? 'is-valid' : 'is-invalid')} rounded-4`} 
                                id='emailInput' 
                                value={email} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                placeholder="Ingrese su correo" 
                                required 
                            />
                            {/* ... (Tus validaciones de email se mantienen igual) ... */}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="passwordInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>Contraseña</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="passwordInput" 
                                style={{marginLeft: '15px', width: '465px'}} 
                                className={`form-control ${touched.password && (isPasswordValid ? 'is-valid' : 'is-invalid')} rounded-4`} 
                                placeholder="Ingrese su contraseña" 
                                value={password} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                required 
                                autoComplete='current-password' 
                            />
                            {/* ... (Tus validaciones de password se mantienen igual) ... */}
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary w-50 mb-4 rounded-3" id="submitButton" disabled={!isFormValid}>Iniciar Sesión</button>
                        </div>
                    </fieldset>
                    <div className='text-center mt-3'>
                        <p>¿No tienes una cuenta Levelup? <Link to="/register">Regístrate aquí</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;