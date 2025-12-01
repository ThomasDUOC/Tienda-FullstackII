import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import { useProducts } from '../context/ProductContext';

function AddProductForm({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Consolas',
        price: '',
        image: '',
        description: '',
        stock: 0
    });

    const [specs, setSpecs] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addSpec = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const removeSpec = (index) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...specs];
        updatedSpecs[index][field] = value;
        setSpecs(updatedSpecs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            alert('Por favor completa los campos obligatorios (Nombre y Precio)');
            return;
        }

        // Convert specs array to object
        const specsObject = {};
        specs.forEach(spec => {
            if (spec.key && spec.value) {
                specsObject[spec.key] = spec.value;
            }
        });

        onAdd({ ...formData, specs: specsObject });
        onClose();
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Nuevo Producto</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Categoría *</label>
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="Consolas">Consolas</option>
                                        <option value="Juegos">Juegos</option>
                                        <option value="Accesorios">Accesorios</option>
                                        <option value="Componentes">Componentes</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Precio *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="ej: 500.000"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Stock Inicial</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <label className="form-label">URL de Imagen</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="/src/assets/images/producto.png"
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="form-label mb-0">Especificaciones Técnicas</label>
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={addSpec}
                                        >
                                            <i className="bi bi-plus-circle me-1"></i> Agregar Especificación
                                        </button>
                                    </div>
                                    {specs.length === 0 && (
                                        <p className="text-muted small">No hay especificaciones. Haz clic en "Agregar Especificación" para añadir.</p>
                                    )}
                                    {specs.map((spec, index) => (
                                        <div key={index} className="row g-2 mb-2 align-items-center">
                                            <div className="col-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Nombre (ej: cpu, memoria)"
                                                    value={spec.key}
                                                    onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Valor (ej: AMD Zen 2, 16GB)"
                                                    value={spec.value}
                                                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-1">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => removeSpec(index)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Agregar Producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StockRow({ product }) {
    const { updateStock } = useProducts();
    const [localStock, setLocalStock] = useState(product.stock);

    const handleQuantity = (amount) => {
        setLocalStock(prevStock => Math.max(0, prevStock + amount)); 
    };
    const handleInputChange = (e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
        setLocalStock(Math.max(0, value));
    };
    const handleUpdate = () => {
        updateStock(product.id, localStock);
        
    };
    useEffect(() => {
        setLocalStock(product.stock);
    }, [product.stock]);

    return (
        <tr>
            <td>
                <img src={product.image} alt={product.name} width="60" className="me-3 rounded" />
                <strong>{product.name}</strong>
            </td>
            <td>
                <div className="input-group" style={{ width: "160px" }}>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantity(-1)}>-</button>
                    <input type="number" className="form-control text-center" value={localStock} onChange={handleInputChange} />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantity(1)}>+</button>
                </div>
            </td>
            <td>
                <button className="btn btn-success" onClick={handleUpdate}>Actualizar</button>
            </td>
        </tr>
    );
}

function VistaAdmin() {

    const { products, addProduct } = useProducts();
    const [showAddForm, setShowAddForm] = useState(false);
    const [currentView, setCurrentView] = useState('products'); // 'products' or 'add'

    const handleAddProduct = (newProduct) => {
        addProduct(newProduct);
        setShowAddForm(false);
    };

    // Las funciones handleStockChange y handleStockUpdate
    // se mueven al componente StockRow para que cada fila sea independiente.

    return (
        <div>
            {/* --- Navbar (sin cambios) --- */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                <button
                    className="navbar-toggler me-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebar"
                    aria-controls="sidebar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand fw-bold text-uppercase me-auto" href="#">Vista Administrador</a>
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-fill"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <li className="ms-3">Mi Perfil</li>
                        <li><Link className="dropdown-item" to='/login'>Cerrar Sesión</Link></li>
                    </ul>
                </div>
                </div>
            </nav>

            {/* --- Sidebar (MODIFICADA para cambiar la vista) --- */}
            <div
                className="offcanvas offcanvas-start bg-dark text-white sidebar-nav"
                tabIndex="-1"
                id="sidebar"
            >
                <div className="offcanvas-body p-0">
                    <nav className="navbar-dark">
                        <ul className="navbar-nav">
                            <li>
                                <div className="text-muted small fw-bold text-uppercase px-3 pt-3">
                                    Gestión
                                </div>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    className={`nav-link px-3 ${currentView === 'products' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}
                                >
                                    <span className="me-2"><i className="bi bi-speedometer2"></i></span>
                                    <span>Productos</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    className={`nav-link px-3 ${currentView === 'add' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); setShowAddForm(true); }}
                                >
                                    <span className="me-2"><i className="bi bi-box-seam"></i></span>
                                    <span>Agregar Producto</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* --- Contenido Principal (Renderizado Condicional) --- */}
            <main className="mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <span><i className="bi bi-box-seam me-2"></i> Gestionar Stock de Productos</span>
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => setShowAddForm(true)}
                                    >
                                        <i className="bi bi-plus-circle me-1"></i> Agregar Producto
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Cantidad</th>
                                                    <th>Confirmar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Mapea CADA producto a un StockRow */}
                                                {products.map(product => (
                                                    <StockRow key={product.id} product={product} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal para agregar producto */}
            {showAddForm && (
                <AddProductForm 
                    onClose={() => setShowAddForm(false)}
                    onAdd={handleAddProduct}
                />
            )}
        </div>
    );
}

export default VistaAdmin;