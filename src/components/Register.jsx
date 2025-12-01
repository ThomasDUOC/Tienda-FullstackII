import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/Level-Up-Logo.png';
import { validateEmail, validatePassword, validateNombre, validateRut } from '../assets/js/validators.js'; // Asegúrate de que esta ruta sea correcta
import { authService } from '../services/authService';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
        rut: '',
        telefono: '',
        direccion: ''
    });

    const [touched, setTouched] = useState({});
    const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value 
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const { nombre, email, password, confirmPassword, rut, telefono, direccion } = formData;

    const isNombreValid = validateNombre(nombre);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = password === confirmPassword && password.length > 0;
    const isRutValid = validateRut(rut);

    const isFormValid = isNombreValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isRutValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        if (isFormValid) {
            try {
                await authService.register(formData);
                console.log('Registro exitoso');
                navigate('/login');
            } catch (error) {
                console.error(error);
                // Muestra el error que venga del backend si existe
                setServerError('Error al registrar usuario. Intente nuevamente.');
            }
        }
    };


    return (
        <div>
            <div className="d-flex justify-content-center pb-4">
                <img src={Logo} className='img-fluid' style={{ width: '17.5%', height: 'auto' }} alt='Imagen' />
            </div>
            <div className="d-flex justify-content-center align-items-center vh-10">
                <form onSubmit={handleSubmit} style={{ width: '500px' }} noValidate>
                    <fieldset className='card rounded-4' style={{background: '#16213e', borderColor: '#091521c0' }}>
                        <legend className="text-center pt-4" style={{color: '#f8f9fa'}}>Registro</legend>

                        {serverError && <div className="alert alert-danger mx-3">{serverError}</div>}
                        
                        <div className='mb-4'>
                            <label htmlFor="nombreInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>Nombre</label>
                            <input 
                                type="text" 
                                name="nombre"
                                style={{marginLeft: '15px', width: '465px'}}
                                className={`form-control ${touched.nombre && (isNombreValid ? 'is-valid' : 'is-invalid')} rounded-4`}
                                id="nombreInput"
                                value={nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Ingrese su nombre" 
                                required
                            />
                            {touched.nombre && !isNombreValid && <div className="invalid-feedback d-block" style={{marginLeft: '15px'}}>Porfavor, ingrese un nombre válido.</div>}
                            {touched.nombre && isNombreValid && <div className="valid-feedback d-block" style={{marginLeft: '15px'}}>¡Nombre válido!</div>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor="rutInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>RUT</label>
                            <input 
                                type="text"
                                name="rut"
                                maxLength={9}
                                style={{marginLeft: '15px', width: '465px'}}
                                className={`form-control ${touched.rut && (isRutValid ? 'is-valid' : 'is-invalid')} rounded-4`}
                                id="rutInput"
                                value={rut}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Ingrese su RUT sin guion ni puntos (EJ: 123456789)" 
                                required
                            />
                            {touched.rut && !isRutValid && <div className="invalid-feedback d-block" style={{marginLeft: '15px'}}>Por favor, ingrese un RUT válido.</div>}
                            {touched.rut && isRutValid && <div className="valid-feedback d-block" style={{marginLeft: '15px'}}>¡RUT válido!</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="emailInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>Correo</label>
                            <input 
                                type="email" 
                                name="email" 
                                style={{marginLeft: '15px', width: '465px'}} 
                                className={`form-control ${touched.email && (isEmailValid ? 'is-valid' : 'is-invalid')} rounded-4`}
                                id="emailInput"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Ingrese su correo" 
                                required 
                            />
                            {touched.email && !isEmailValid && <div className="invalid-feedback d-block" style={{marginLeft: '15px'}}>Por favor, ingrese un correo electrónico válido.</div>}
                            {touched.email && isEmailValid && <div className="valid-feedback d-block" style={{marginLeft: '15px'}}>¡Correo electrónico válido!</div>}
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
                            />
                            {touched.password && !isPasswordValid && <div className="invalid-feedback d-block" style={{marginLeft: '15px'}}>La contraseña debe tener al menos 8 caracteres, una
                                mayúscula, un número y un carácter especial.</div>}
                            {touched.password && isPasswordValid && <div className="valid-feedback d-block" style={{marginLeft: '15px'}}>¡Contraseña válida!</div>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor="confirmPasswordInput" className="form-label mb-3" style={{color: "#f8f9fa", marginLeft: '15px'}}>Confirme Contraseña</label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPasswordInput" 
                                style={{marginLeft: '15px', width: '465px'}} 
                                className={`form-control ${touched.confirmPassword && (isConfirmPasswordValid ? 'is-valid' : 'is-invalid')} rounded-4`}
                                placeholder="Confirme su contraseña"
                                value={confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                required 
                            />
                            {touched.confirmPassword && !isConfirmPasswordValid && <div className="invalid-feedback d-block" style={{marginLeft: '15px'}}>Las contraseñas no coinciden.</div>}
                            {touched.confirmPassword && isConfirmPasswordValid && <div className="valid-feedback d-block" style={{marginLeft: '15px'}}>¡Contraseñas coinciden!</div>}
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary w-50 mb-4 rounded-3" id="submitButton" disabled={!isFormValid}>Registrarse</button>
                        </div>
                    </fieldset>
                        <div className='text-center mt-3'>
                            <p>
                                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                            </p>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register;