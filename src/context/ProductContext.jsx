import { createContext, useState, useEffect, useContext, use } from "react";
import { productoService } from "../services/productoService";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const data = await productoService.getAll();
            
            const adaptedProducts = data.map(p => ({
                ...p,
                category: p.categoria?.nombre || 'Sin categoría', // Mapeo crítico
                platform: p.plataforma?.nombre || null,          // Mapeo crítico
                price: p.precio.toLocaleString('es-CL'), 
                // Guardamos el precio numérico original por si acaso
                rawPrice: p.precio 
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

            // CORRECCIÓN: Construimos el objeto manualmente en lugar de usar ...spread
            // Esto evita el warning de "Duplicate key" y envía datos limpios al Java.
            const payload = {
                id: currentProduct.id,
                nombre: currentProduct.nombre,
                descripcion: currentProduct.descripcion,
                precio: currentProduct.rawPrice, // Usamos el precio numérico original
                stock: newStock,                 // El nuevo stock
                imagen: currentProduct.imagen,
                destacado: currentProduct.destacado,
                // Enviamos los objetos completos de categoria y plataforma
                // (El backend solo necesita sus IDs, pero enviar el objeto funciona si tu Java lo espera)
                categoria: currentProduct.categoria, 
                plataforma: currentProduct.plataforma
            };

            await productoService.update(productId, payload);
            
            // Actualizamos el estado local
            setProducts(prev => prev.map(p => 
                p.id === productId ? { ...p, stock: newStock } : p
            ));
            
        } catch (error) {
            console.error("Error actualizando stock:", error);
            alert("Error al actualizar el stock en el servidor");
        }
    };

    return (
        <ProductContext.Provider value={{ products, updateStock, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
