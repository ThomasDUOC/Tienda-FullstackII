import api from '../api/axiosConfig';

export const authService = {
    // LOGIN
    login: async (email, password) => {
        try {
            // Backend espera: { username, password }
            const payload = { 
                username: email, // Mapeamos email a username
                password: password 
            };
            
            const response = await api.post('/auth/login', payload);
            
            // Si el login es exitoso, guardamos el token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                
                if (response.data.role) {
                    localStorage.setItem('userRole', response.data.role);
                }
                if (response.data.userId) {
                    localStorage.setItem("userRole". response.data.userId);
                }
            }
            return response.data;

        } catch (error) {
            throw error.response?.data || 'Error al iniciar sesión';
        }
    },

    // REGISTRO
    register: async (userData) => {
        try {
            // Backend RegisterRequest espera:
            // username, password, confirmPassword, nombre, rut, telefono, direccion
            
            const payload = {
                username: userData.email, // Importante: email -> username
                password: userData.password,
                confirmPassword: userData.confirmPassword, // Asegúrate que backend use esto o quítalo si no lo valida
                nombre: userData.nombre,
                rut: userData.rut,
                // Agregamos valores por defecto si el form no los tiene, 
                // o debes agregar los inputs al formulario.
                telefono: userData.telefono ? parseInt(userData.telefono) : 0, 
                direccion: userData.direccion || "Sin dirección" 
            };

            const response = await api.post('/auth/register', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Error en el registro';
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
    }
};