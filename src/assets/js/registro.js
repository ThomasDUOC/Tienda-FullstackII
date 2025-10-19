document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombreInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const regionSelect = document.getElementById('regionSelect');
    const comunaSelect = document.getElementById('comunaSelect');
    const submitButton = document.getElementById('submitButton');

    let isNombreValid = false;
    let isEmailValid = false;
    let isPasswordValid = false;
    let isConfirmPasswordValid = false;
    let isRegionValid = false;
    let isComunaValid = false;

    // Función para validar nombre
    function validateNombre(nombre) {
    const nombreRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]{3,}$/;
    return nombreRegex.test(nombre);
    }

    // Función para validar email
    function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }

    // Función para validar contraseña
    function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
    }

    // Función para actualizar el estado del botón
    function updateSubmitButton() {
    submitButton.disabled = !(isNombreValid && isEmailValid && isPasswordValid &&
        isConfirmPasswordValid && isRegionValid && isComunaValid);
    }

    // Validación del nombre
    nombreInput.addEventListener('input', function () {
    const nombreValue = this.value.trim();
    const nombreError = document.getElementById('nombreError');
    const nombreSuccess = document.getElementById('nombreSuccess');

    if (nombreValue === '') {
        this.classList.remove('is-valid', 'is-invalid');
        nombreError.style.display = 'none';
        nombreSuccess.style.display = 'none';
        isNombreValid = false;
    } else if (validateNombre(nombreValue)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        nombreError.style.display = 'none';
        nombreSuccess.style.display = 'block';
        isNombreValid = true;
    } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
        nombreError.style.display = 'block';
        nombreSuccess.style.display = 'none';
        isNombreValid = false;
    }
    updateSubmitButton();
    });

    // Validación del email
    emailInput.addEventListener('input', function () {
    const emailValue = this.value.trim();
    const emailError = document.getElementById('emailError');
    const emailSuccess = document.getElementById('emailSuccess');

    if (emailValue === '') {
        this.classList.remove('is-valid', 'is-invalid');
        emailError.style.display = 'none';
        emailSuccess.style.display = 'none';
        isEmailValid = false;
    } else if (validateEmail(emailValue)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        emailError.style.display = 'none';
        emailSuccess.style.display = 'block';
        isEmailValid = true;
    } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
        emailError.style.display = 'block';
        emailSuccess.style.display = 'none';
        isEmailValid = false;
    }
    updateSubmitButton();
    });

    // Validación de la contraseña
    passwordInput.addEventListener('input', function () {
    const passwordValue = this.value.trim();
    const passwordError = document.getElementById('passwordError');
    const passwordSuccess = document.getElementById('passwordSuccess');

    if (passwordValue === '') {
        this.classList.remove('is-valid', 'is-invalid');
        passwordError.style.display = 'none';
        passwordSuccess.style.display = 'none';
        isPasswordValid = false;
    } else if (validatePassword(passwordValue)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        passwordError.style.display = 'none';
        passwordSuccess.style.display = 'block';
        isPasswordValid = true;
    } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
        passwordError.style.display = 'block';
        passwordSuccess.style.display = 'none';
        isPasswordValid = false;
    }
    // Revalidar confirmación de contraseña
    confirmPasswordInput.dispatchEvent(new Event('input'));
    updateSubmitButton();
    });

    // Validación de la confirmación de contraseña
    confirmPasswordInput.addEventListener('input', function () {
    const confirmValue = this.value.trim();
    const confirmError = document.getElementById('confirmPasswordError');
    const confirmSuccess = document.getElementById('confirmPasswordSuccess');

    if (confirmValue === '') {
        this.classList.remove('is-valid', 'is-invalid');
        confirmError.style.display = 'none';
        confirmSuccess.style.display = 'none';
        isConfirmPasswordValid = false;
    } else if (confirmValue === passwordInput.value.trim()) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        confirmError.style.display = 'none';
        confirmSuccess.style.display = 'block';
        isConfirmPasswordValid = true;
    } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
        confirmError.style.display = 'block';
        confirmSuccess.style.display = 'none';
        isConfirmPasswordValid = false;
    }
    updateSubmitButton();
    });

    // Validación de la región
    regionSelect.addEventListener('change', function () {
    const regionError = document.getElementById('regionError');
    const regionSuccess = document.getElementById('regionSuccess');

    if (this.value === '') {
        this.classList.remove('is-valid', 'is-invalid');
        regionError.style.display = 'block';
        regionSuccess.style.display = 'none';
        isRegionValid = false;
    } else {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        regionError.style.display = 'none';
        regionSuccess.style.display = 'block';
        isRegionValid = true;
    }
    updateSubmitButton();
    });

    // Validación de la comuna
    comunaSelect.addEventListener('change', function () {
    const comunaError = document.getElementById('comunaError');
    const comunaSuccess = document.getElementById('comunaSuccess');

    if (this.value === '') {
        this.classList.remove('is-valid', 'is-invalid');
        comunaError.style.display = 'block';
        comunaSuccess.style.display = 'none';
        isComunaValid = false;
    } else {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        comunaError.style.display = 'none';
        comunaSuccess.style.display = 'block';
        isComunaValid = true;
    }
    updateSubmitButton();
    });

    // Manejo del envío del formulario
    form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isNombreValid && isEmailValid && isPasswordValid &&
        isConfirmPasswordValid && isRegionValid && isComunaValid) {
        // Aquí puedes agregar la lógica para enviar el formulario
        window.location.href = 'index.html';
    }
    });
});