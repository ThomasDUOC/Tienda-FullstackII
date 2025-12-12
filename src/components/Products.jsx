import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { useProducts } from '../context/ProductContext';
import '../assets/css/products.css';

export const Products = () => {
    const { products, loading } = useProducts();
    const [searchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        const category = searchParams.get('category');
        const platform = searchParams.get('platform');

        if (category) setSelectedCategory(category);
        if (platform) setSelectedPlatform(platform);
    }, [searchParams]);

    useEffect(() => {

        if (products.length === 0)  return;

        let result = [...products];

        // filtrar categoria
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // filtrar plataforma
        if (selectedPlatform !== 'all') {
            result = result.filter(p => {
                if (!p.platform) return false;
                return p.platform === selectedPlatform || p.platform.includes(selectedPlatform);
            })
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
                    return (a.rawPrice || 0) - (b.rawPrice || 0)
                case 'price-high':
                    return (b.rawPrice || 0) - (a.rawPrice || 0)
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(result);
    }, [products, selectedCategory, selectedPlatform, sortBy, searchParams]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        if (e.target.value !== 'Juegos') {
            setSelectedPlatform('all');
        }
    }

    if (loading) return <div className="container mt-5 text-center"><h2>Cargando catálogo...</h2></div>;

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
                            onChange={handleCategoryChange}
                        >
                            <option value="all">Todas</option>
                            <option value="Consolas">Consolas</option>
                            <option value="Juegos">Juegos</option>
                            <option value="Accesorios">Accesorios</option>
                        </select>
                    </div>

                    {selectedCategory === 'Juegos' && (
                        <div className="filter-group">
                            <label>Plataforma:</label>
                            <select
                                className="form-select"
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value)}
                            >
                                <option value="all">Todas</option>
                                <option value="PlayStation 5">PlayStation 5</option>
                                <option value="PlayStation 4">PlayStation 4</option>
                                <option value="Xbox">Xbox Series X</option>
                                <option value="Nintendo">Nintendo Switch</option>
                                <option value="PC">PC</option>
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
