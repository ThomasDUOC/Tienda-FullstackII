import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, getProductsByPlatform } from '../data/products';
import { ProductCard } from './ProductCard';
import { useProducts } from '../context/ProductContext';
import '../assets/css/products.css';

export const Products = () => {
    const { products } = useProducts()
    const [searchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        let result = [...products];

        // filtrar categoria (MANUALMENTE, ya no usamos la función importada)
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }
    }, [searchParams]);

    useEffect(() => {
        let result = [...products];

        // filtrar categoria
        if (selectedCategory !== 'all') {
            result = getProductsByCategory(selectedCategory);
        }

        // filtrar plataforma
        if (selectedPlatform !== 'all') {
            result = result.filter(p => p.platform === selectedPlatform);
        }

        const query = searchParams.get('search');
        if (query) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        // sortear
        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    const priceA = parseFloat(a.price.replace('.', ''));
                    const priceB = parseFloat(b.price.replace('.', ''));
                    return priceA - priceB;
                case 'price-high':
                    const priceA2 = parseFloat(a.price.replace('.', ''));
                    const priceB2 = parseFloat(b.price.replace('.', ''));
                    return priceB2 - priceA2;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(result);
    }, [selectedCategory, selectedPlatform, sortBy]);

    return (
        <div className="products-page">
            <div className="container">
                <h1 className="page-title">Catálogo de Productos</h1>

                <div className="filters-bar">
                    <div className="filter-group">
                        <label>Categoría:</label>
                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">Todas</option>
                            <option value="Consolas">Consolas</option>
                            <option value="Juegos">Juegos</option>
                            <option value="Accesorios">Accesorios</option>
                        </select>
                    </div>

                    {selectedCategory === 'juegos' && (
                        <div className="filter-group">
                            <label>Plataforma:</label>
                            <select
                                className="form-select"
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value)}
                            >
                                <option value="all">Todas</option>
                                <option value="PlayStation">PlayStation</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                            </select>
                        </div>
                    )}

                    <div className="filter-group">
                        <label>Ordenar por:</label>
                        <select
                            className="form-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Nombre</option>
                            <option value="price-low">Precio: Menor a Mayor</option>
                            <option value="price-high">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </div>

                <div className="products-count">
                    Mostrando {filteredProducts.length} productos
                </div>

                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <p>No se encontraron productos con los filtros seleccionados.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
