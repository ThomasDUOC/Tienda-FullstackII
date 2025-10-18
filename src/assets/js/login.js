export const emailInput = document.getElementById('emailInput');
export const passwordInput = document.getElementById('passwordInput');
export const submitButton = document.getElementById('submitButton');
export const form = document.querySelector('form');

let isEmailValid = false;
let isPasswordValid = false;

// Función para actualizar el estado del botón
export function updateSubmitButton() {
submitButton.disabled = !(isEmailValid && isPasswordValid);
}

// Validación en tiempo real del email
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

// Validación en tiempo real de la contraseña
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
updateSubmitButton();
});

// Manejo del envío del formulario
form.addEventListener('submit', function (e) {
e.preventDefault();
if (isEmailValid && isPasswordValid) {
    // Aquí puedes agregar la lógica para enviar el formulario
    window.location.href = 'index.html';
}
});