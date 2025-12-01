import api from '../api/axiosConfig';

export const pedidoService = {
    createOrder: async (orderData) => {
        // orderData debe coincidir con PedidoRequest de Java
        const response = await api.post('/api/v1/pedidos', orderData);
        return response.data;
    }
};