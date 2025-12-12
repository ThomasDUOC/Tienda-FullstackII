import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useToast } from "./ToastContext";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Asegúrate que esta URL sea correcta
    const BD_URL = "http://localhost:8080/api/v1/productos";

    const fetchProducts = async () => {
        try {
            const response = await axios.get(BD_URL);

            const adaptedProducts = response.data.map(p => ({
                ...p,
                name: p.nombre,
                description: p.descripcion || '',
                image: p.imagen,
                category: p.categoria?.nombre || 'Sin categoría',
                categoryId: p.categoria?.id,
                platform: p.plataforma?.nombre || null,
                platformId: p.plataforma?.id,
                price: p.precio ? p.precio.toLocaleString('es-CL') : '0', 
                rawPrice: p.precio || 0, 
                specs: p.especificaciones || []
            }));

            setProducts(adaptedProducts);
        } catch (error) {
            console.error("Error cargando productos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (productData) => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                showToast("No hay token. Inicia sesión como admin.", "error");
                return false;
            }

            // CORRECCIÓN: Guardamos la respuesta en 'const response'
            const response = await axios.post(BD_URL, productData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log("Producto creado:", response.data);

            await fetchProducts(); // Recargar la lista

            showToast("Producto creado exitosamente", "success");
            return true;

        } catch (error) {
            console.error("Error creando producto:", error);
            
            if (error.response?.status === 403) {
                showToast("Permisos insuficientes (403).", "error");
            } else if (error.response?.status === 401) {
                showToast("Sesión expirada (401).", "error");
            } else {
                showToast("Error al crear: " + (error.response?.data?.message || "Error desconocido"), "error");
            }
            return false;
        }
    };

    const updateStock = async (productId, newStock) => {
        try {
            const currentProduct = products.find(p => p.id === productId);
            if (!currentProduct) return;

            const payload = {
                id: currentProduct.id,
                nombre: currentProduct.nombre,
                descripcion: currentProduct.descripcion,
                precio: currentProduct.rawPrice || currentProduct.precio, // Usar rawPrice es más seguro
                stock: newStock,
                imagen: currentProduct.imagen,
                destacado: currentProduct.destacado,
                categoria: currentProduct.categoria, 
                plataforma: currentProduct.plataforma,
                especificaciones: currentProduct.especificaciones
            };

            const token = localStorage.getItem('token');

            await axios.put(`${BD_URL}/${productId}`, payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            setProducts(prev => prev.map(p => 
                p.id === productId ? { ...p, stock: newStock } : p
            ));

            showToast("Stock actualizado correctamente", "success");
            
        } catch (error) {
            console.error("Error actualizando stock:", error);
            showToast("Error al actualizar stock", "error");
        }
    };

    const updateProduct = async (productId, productData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            await axios.put(`${BD_URL}/${productId}`, productData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            await fetchProducts();
            showToast("Producto actualizado exitosamente", "success");
            return true;
        } catch (error) {
            console.error("Error actualizando producto:", error);
            showToast("Error al actualizar producto", "error");
            return false;
        }
    }

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            await axios.delete(`${BD_URL}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setProducts(prev => prev.filter(product => product.id !== id));

            showToast("Producto eliminado correctamente", "success");
            return true;
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            showToast("Error al eliminar. Puede que tenga pedidos asociados.", "error");
            return false;
        }
    };

    return (
        <ProductContext.Provider value={{ products, updateStock, addProduct, updateProduct, deleteProduct, loading }}>
            {children}
        </ProductContext.Provider>
    );
};