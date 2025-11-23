export function validateEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}

export function validatePassword(password) {
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
return passwordRegex.test(password);
}

export function validateNombre(nombre) {
    const nombreRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]{3,}$/;
    return nombreRegex.test(nombre);
}

export function validateRut(rut) {
    if (!rut || typeof rut !== 'string')  {
        return false;
    }

    const rutLimpio = rut.replace(/\./g, '').replace('-','');

    const rutFalsos = [
        "111111111",
        "222222222",
        "333333333",
        "444444444",
        "555555555",
        "666666666",
        "777777777",
        "888888888",
        "999999999",
        "123456781",
        "123456782",
        "123456783",
        "123456784",
        "123456785",
        "123456786",
        "123456787",
        "123456788",
        "123456789",
        "123456780",
        "12345678k",
        "000000000"
    ]

    if (rutFalsos.includes(rutLimpio)) {
        return false
    }

    if (rutLimpio.length < 7) {
        return false
    }
    
    let cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1).toUpperCase();

    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i), 10);
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dvEsperado = 11 - (suma % 11);

    if (dvEsperado === 11) {
        return dv === '0';
    }

    if (dvEsperado === 10) {
        return dv === 'K';
    }

    if (dvEsperado === parseInt(dv, 10)) 
        return true;
    
}


