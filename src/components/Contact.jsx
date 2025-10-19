function Contact() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <form id="registroForm" className="form-container" style={{color: '#ea39b8;'}}>
                <fieldset>
                    <div className="d-flex justify-content-end">
                        <Link className='btn btn-primary' to='/'>X</Link>
                    </div>
                    <legend className="text-center">Registro de usuario</legend>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="nombreInput">Nombre Completo</label>
                        <input className="form-control" id="nombreInput" type="text" placeholder="Ingrese su nombre completo..." required/>
                        <div id="nombreError" className="error-message">El nombre debe contener al menos 3 carácteres y solo letras.</div>
                        <div id="nombreSuccess" className="success-message">¡Nombre válido!</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="emailInput" placeholder="Ingrese su correo" required/>
                        <div id="emailError" className="error-message">Por favor, ingrese un correo electrónico válido.</div>
                        <div id="emailSuccess" className="success-message">¡Correo electrónico válido!</div>
                        <small className="form-text text-muted">Nunca compartiremos tu correo electrónico con nadie más.</small>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Contraseña" required
                            autocomplete="off"/>
                        <div id="passwordError" className="error-message">La contraseña debe tener al menos 8 caracteres, incluir una
                            mayúscula, un número y un carácter especial.</div>
                        <div id="passwordSuccess" className="success-message">¡Contraseña válida!</div>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="confirmPasswordInput" className="form-label">Confirme Contraseña</label>
                        <input type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirme Contraseña"
                            required autocomplete="off"/>
                        <div id="confirmPasswordError" className="error-message">Las contraseñas no coinciden.</div>
                        <div id="confirmPasswordSuccess" className="success-message">¡Las contraseñas coinciden!</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="regionSelect" className="form-label">Seleccione región</label>
                        <select className="form-select" id="regionSelect" required>
                            <option value="">Seleccione una región</option>
                            <option value="1">Región Metropolitana</option>
                            <option value="2">Valparaíso</option>
                            <option value="3">Biobío</option>
                            <option value="4">La Araucanía</option>
                            <option value="5">Los Lagos</option>
                        </select>
                        <div id="regionError" className="error-message">Por favor, seleccione una región.</div>
                        <div id="regionSuccess" className="success-message">¡Región seleccionada!</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="comunaSelect" className="form-label">Seleccione comuna</label>
                        <select className="form-select" id="comunaSelect" required>
                            <option value="">Seleccione una comuna</option>
                            <option value="1">Santiago</option>
                            <option value="2">Providencia</option>
                            <option value="3">Las Condes</option>
                            <option value="4">Ñuñoa</option>
                            <option value="5">La Florida</option>
                        </select>
                        <div id="comunaError" className="error-message">Por favor, seleccione una comuna.</div>
                        <div id="comunaSuccess" className="success-message">¡Comuna seleccionada!</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-4" id="submitButton" disabled>Registrar</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Contact;
