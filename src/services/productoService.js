import api from '../api/axiosConfig';

export const productoService = {
    getAll: async () => {
        const response = await api.get('/api/v1productos');
        return response.data;
    },

    // Para actualizar stock, necesitamos enviar el producto completo
    // porque el backend usa un PUT que sobrescribe todo.
    update: async (id, productData) => {
        const response = await api.put(`/productos/${id}`, productData);
        return response.data;
    }
};