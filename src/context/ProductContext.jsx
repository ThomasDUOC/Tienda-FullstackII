import { createContext, useState, useEffect, useContext, use } from "react";
import { products as initialProducts } from "../data/products.js";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const savedProducts = localStorage.getItem("products");
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem("products", JSON.stringify(initialProducts));
        }
    }, []);

    const updateStock = (productId, newStock) => {

        const updatedProducts = products.map((p) =>
            p.id === productId ? { ...p, stock: newStock } : p
        );

        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };

    return (
        <ProductContext.Provider value={{ products, updateStock }}>
            {children}
        </ProductContext.Provider>
    );
};
