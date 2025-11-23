import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../assets/js/validators.js';
import Logo from '../assets/images/Level-Up-Logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const admin_email = 'admin@levelup.cl';
        const admin_password = 'Admin1234.*'
        if (email === admin_email && password === admin_password) {
            console.log('Inicio de sesion como admin');
            localStorage.setItem('userRole', 'admin');
            navigate('/vistaadmin'); // Redirigir al dashboard después del inicio de sesión exitoso
        } else {
            navigate('/'); //Redirigir a la vista de usuario normal
        }
    };

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isFormValid = isEmailValid && isPasswordValid;

    return (
        <div>
            <div className="d-flex justify-content-center pb-4">
                <img src={Logo} className='img-fluid' style={{ width: '17.5%', height: 'auto' }} alt='Imagen' />
            </div>

            <div className="d-flex justify-content-center align-items-center vh-10">
                <form onSubmit={handleSubmit} style={{ width: '500px', minHeight: '500px'}} noValidate>
                    <fieldset className='card rounded-4' style={{background: '#16213e', borderColor: '#091521c0' }}>
                        <legend className="text-center pt-4" style={{color: '#f8f9fa'}}>Inicio Sesión</legend>

                        <div className="mb-4">
                            <label htmlFor="emailInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>Correo</label>
                            <input type="email" name="email" style={{marginLeft: '15px', width: '465px'}} className={`form-control ${touched.email && (isEmailValid ? 'is-valid' : 'is-invalid')} rounded-4`} id='emailInput' value={email} onChange={handleChange} onBlur={handleBlur} placeholder="Ingrese su correo" required />
                            {touched.email && !isEmailValid && <div className="invalid-feedback d-block" style={{marginLeft: '15px'}}>Por favor, ingrese un correo electrónico válido.</div>}
                            {touched.email && isEmailValid && <div className="valid-feedback d-block" style={{marginLeft: '15px'}}>¡Correo electrónico válido!</div>}
                        </div>

                        <div class="mb-4">
                            <label htmlFor="passwordInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>Contraseña</label>
                            <input type="password" name="password" id="passwordInput" style={{marginLeft: '15px', width: '465px'}} className={`form-control ${touched.password && (isPasswordValid ? 'is-valid' : 'is-invalid')} rounded-4`} placeholder="Ingrese su contraseña" value={password} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                            <div className="invalid-feedback" style={{marginLeft: '15px'}}>La contraseña debe tener al menos 8 caracteres, una
                                mayúscula, un número y un carácter especial.</div>
                            <div className="valid-feedback" style={{marginLeft: '15px'}}>¡Contraseña válida!</div>
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
