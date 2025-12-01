import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useToast } from "./ToastContext";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {showToast}  = useToast();

    const BD_URL = "http://localhost:8080/api/v1/productos"

    const fetchProducts = async () => {
        try {
            const response = await axios.get(BD_URL);
            
            const adaptedProducts = response.data.map(p => ({
                ...p,
                name: p.nombre,
                image: p.imagen,
                category: p.categoria?.nombre || 'Sin categoría', // Mapeo crítico
                platform: p.plataforma?.nombre || null,          // Mapeo crítico
                price: p.precio.toLocaleString('es-CL'), 
                // Guardamos el precio numérico original por si acaso
                rawPrice: p.precio, 
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

    const updateStock = async (productId, newStock) => {
        try {
            const currentProduct = products.find(p => p.id === productId);
            if (!currentProduct) return;

            const payload = {
                id: currentProduct.id,
                nombre: currentProduct.nombre,
                descripcion: currentProduct.descripcion,
                precio: currentProduct.precio, // Usamos el precio numérico original
                stock: newStock,                 // El nuevo stock
                imagen: currentProduct.imagen,
                destacado: currentProduct.destacado,
                // Enviamos los objetos completos de categoria y plataforma
                // (El backend solo necesita sus IDs, pero enviar el objeto funciona si tu Java lo espera)
                categoria: currentProduct.categoria, 
                plataforma: currentProduct.plataforma
            };

            const token = localStorage.getItem('token');

            await axios.put(`${BD_URL}/${productId}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}` // <--- Aquí va el permiso
                }
            });
            
            // Actualizamos el estado local
            setProducts(prev => prev.map(p => 
                p.id === productId ? { ...p, stock: newStock } : p
            ));

            showToast("Stock actualizado correctamente", "success");
            
        } catch (error) {
            console.error("Error actualizando stock:", error);
            showToast("Error al actualizar el stock: Permisos insuficientes o servidor caído.", "error");
        }
    };

    return (
        <ProductContext.Provider value={{ products, updateStock, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
