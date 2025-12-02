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
                price: p.precio ? p.precio.toLocaleString('es-CL') : '0', 
                // Guardamos el precio numérico original por si acaso
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
            console.log("Token enviado:", token);
            
            if (!token) {
                showToast("No hay token de autenticación. Debes iniciar sesión como admin.", "error");
                return false;
            }

            console.log("=== INTENTANDO CREAR PRODUCTO ===");
            console.log("URL:", BD_URL);
            console.log("Método: POST");
            console.log("Token:", token.substring(0, 50) + "...");
            console.log("Payload:", JSON.stringify(productData, null, 2));

            // Enviamos los datos al backend (POST)
            await axios.post(BD_URL, productData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log("Respuesta exitosa:", response.data);

            await fetchProducts(); 

            showToast("Producto creado exitosamente", "success");
            return true;

        } catch (error) {
            console.error("✗ Error creando producto:");
            console.error("URL intento:", error.config?.url);
            console.error("Método:", error.config?.method);
            console.error("Status:", error.response?.status);
            console.error("StatusText:", error.response?.statusText);
            console.error("Data:", error.response?.data);
            
            if (error.response?.status === 403) {
                showToast("Error 403: Permisos insuficientes. Verifica que seas admin.", "error");
            } else if (error.response?.status === 401) {
                showToast("Error 401: Token expirado o inválido. Inicia sesión nuevamente.", "error");
            } else {
                showToast("Error al crear el producto: " + (error.response?.data?.message || error.message), "error");
            }
            return false;
        }
    }

    const updateStock = async (productId, newStock) => {
        try {
            const currentProduct = products.find(p => p.id === productId);
            if (!currentProduct) return;

            const payload = {
                id: currentProduct.id,
                nombre: currentProduct.nombre,
                descripcion: currentProduct.descripcion,
                precio: currentProduct.precio,
                stock: newStock,
                imagen: currentProduct.imagen,
                destacado: currentProduct.destacado,
                categoria: currentProduct.categoria, 
                plataforma: currentProduct.plataforma
            };

            const token = localStorage.getItem('token');

            console.log("=== INTENTANDO ACTUALIZAR STOCK ===");
            console.log("URL:", `${BD_URL}/${productId}`);
            console.log("Método: PUT");
            console.log("Payload:", JSON.stringify(payload, null, 2));

            await axios.put(`${BD_URL}/${productId}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setProducts(prev => prev.map(p => 
                p.id === productId ? { ...p, stock: newStock } : p
            ));

            showToast("Stock actualizado correctamente", "success");
            
        } catch (error) {
            console.error("✗ Error actualizando stock:");
            console.error("URL intento:", error.config?.url);
            console.error("Método:", error.config?.method);
            console.error("Status:", error.response?.status);
            console.error("Respuesta del servidor:", error.response?.data);
            showToast("Error al actualizar el stock: Permisos insuficientes o servidor caído.", "error");
        }
    };

    return (
        <ProductContext.Provider value={{ products, updateStock, addProduct, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
