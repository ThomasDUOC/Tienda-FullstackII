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
        if (isEmailValid && isPasswordValid) {
            // lógica formualrio
            console.log('Formulario enviado');
            navigate('/'); // Redirigir al dashboard después del inicio de sesión exitoso
        }
    };

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isFormValid = isEmailValid && isPasswordValid;

    return (
        <div>
            <div className="d-flex justify-content-center">
                <img src={Logo} className='img-fluid' style={{ width: '17.5%', height: 'auto' }} alt='Imagen' />
            </div>

            <div className="d-flex justify-content-center align-items-center vh-10">
                <form onSubmit={handleSubmit} style={{ color: "#ea39b8", width: '500px', minHeight: '500px' }} noValidate>
                    <fieldset>
                        <div className="d-flex justify-content-end">
                            <Link className='btn btn-primary' to='/'>X</Link>
                        </div>
                        <legend className="text-center">Inicio Sesión</legend>

                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label" style={{color: "#ea39b8"}}>Correo</label>
                            <input type="email" name="email" className={`form-control ${touched.email && (isEmailValid ? 'is-valid' : 'is-invalid')}`} id='emailInput' value={email} onChange={handleChange} onBlur={handleBlur} placeholder="Ingrese su correo" required />
                            {touched.email && !isEmailValid && <div className="invalid-feedback d-block">Por favor, ingrese un correo electrónico válido.</div>}
                            {touched.email && isEmailValid && <div className="valid-feedback d-block">¡Correo electrónico válido!</div>}
                            <small className="form-text text-muted">No se compartiran tus datos.</small>
                        </div>

                        <div class="mb-3">
                            <label htmlFor="passwordInput" className="form-label" style={{color: "#ea39b8"}}>Contraseña</label>
                            <input type="password" name="password" id="passwordInput" className={`form-control ${touched.password && (isPasswordValid ? 'is-valid' : 'is-invalid')}`} placeholder="Ingrese su contraseña" value={password} onChange={handleChange} onBlur={handleBlur} required autoComplete='off' />
                            <div className="invalid-feedback">La contraseña debe tener al menos 8 caracteres, una
                                mayúscula, un número y un carácter especial.</div>
                            <div className="valid-feedback">¡Contraseña válida!</div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3" id="submitButton" disabled={!isFormValid}>Iniciar Sesión</button>

                        <Link className='btn btn-primary w-100' to='/vistaadmin'>Iniciar Sesión como Administrador</Link>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Login;
