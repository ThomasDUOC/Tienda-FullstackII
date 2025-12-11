import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import { useProducts } from '../context/ProductContext';
import { useToast } from "../context/ToastContext";

function ProductForm({ onClose, onSave, initialData = null }) {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '1', // ID 1 = Consolas (Backend)
        platformId: '1', // ID 1 = PlayStation (Backend)
        price: '',
        image: '',
        description: '',
        stock: 0,
        featured: false
    });

    const [specs, setSpecs] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                categoryId: initialData.categoryId || '1',
                platformId: initialData.platformId || '1',
                price: initialData.rawPrice || '',
                image: initialData.image || '',
                description: initialData.descripcion || '',
                stock: initialData.stock || 0,
                featured: initialData.destacado || false
            });

            if (initialData.specs && initialData.specs.length > 0) {
                setSpecs(initialData.specs.map(s => ({
                    key: s.nombre,
                    value: s.valorEspecifico
                })));
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
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
            showToast('Por favor completa los campos obligatorios (Nombre y Precio)');
            return;
        }

        const specsList = specs
            .filter(s => s.key && s.value)
            .map(s => ({
                nombre: s.key,
                valorEspecifico: s.value
            }));

        const productPayload = {
            nombre: formData.name,
            precio: parseInt(formData.price),
            stock: parseInt(formData.stock),
            imagen: formData.image,
            descripcion: formData.description,
            destacado: formData.featured,
            // Objetos anidados con ID para las relaciones
            categoria: { id: parseInt(formData.categoryId) },
            plataforma: { id: parseInt(formData.platformId) },
            especificaciones: specsList
        };

        onSave(productPayload, initialData ? initialData.id : null);
        onClose();
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{initialData ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre *</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Precio *</label>
                                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="ej: 50000" required />
                                </div>
                                
                                {/* SELECT DE CATEGORÍA CON IDs */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Categoría *</label>
                                    <select className="form-select" name="categoryId" value={formData.categoryId} onChange={handleChange}>
                                        <option value="1">Consolas</option>
                                        <option value="2">Juegos</option>
                                        <option value="3">Accesorios</option>
                                    </select>
                                </div>

                                {/* SELECT DE PLATAFORMA (NUEVO) */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Plataforma *</label>
                                    <select className="form-select" name="platformId" value={formData.platformId} onChange={handleChange}>
                                        <option value="1">PlayStation</option>
                                        <option value="2">Xbox</option>
                                        <option value="3">Nintendo</option>
                                        <option value="4">PC</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Stock Inicial</label>
                                    <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} min="0" />
                                </div>

                                <div className="col-md-6 mb-3 d-flex align-items-end">
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" type="checkbox" name="featured" id="feat" checked={formData.featured} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="feat">Destacado</label>
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label">URL de Imagen</label>
                                    <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                                </div>
                                <div className="col-12 mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
                                </div>

                                {/* SECCIÓN ESPECIFICACIONES (Tu diseño intacto) */}
                                <div className="col-12 mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="form-label mb-0">Especificaciones Técnicas</label>
                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={addSpec}>
                                            <i className="bi bi-plus-circle me-1"></i> Agregar
                                        </button>
                                    </div>
                                    {specs.map((spec, index) => (
                                        <div key={index} className="row g-2 mb-2 align-items-center">
                                            <div className="col-5">
                                                <input type="text" className="form-control form-control-sm" placeholder="Nombre (ej: Género)" value={spec.key} onChange={(e) => handleSpecChange(index, 'key', e.target.value)} />
                                            </div>
                                            <div className="col-6">
                                                <input type="text" className="form-control form-control-sm" placeholder="Valor (ej: Acción)" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} />
                                            </div>
                                            <div className="col-1">
                                                <button type="button" className="btn btn-sm btn-danger" onClick={() => removeSpec(index)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                                <button type="submit" className="btn btn-primary">{initialData ? 'Guardar Cambios' : 'Agregar Producto'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StockRow({ product, onEdit }) {
    const { updateStock } = useProducts();
    const [localStock, setLocalStock] = useState(product.stock);

    const handleQuantity = (amount) => {
        setLocalStock(prevStock => Math.max(0, prevStock + amount)); 
    };
    const handleInputChange = (e) => {
        setLocalStock(Math.max(0, parseInt(e.target.value) || 0));
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
                <div className="d-flex align-items-center">
                    {product.image && <img src={product.image} alt={product.name} width="50" height="50" className="me-3 rounded object-fit-cover border" />}
                    
                    <div className="d-flex flex-column">
                        <span className="fw-bold fs-5 text-white mb-1">
                            {product.name}
                        </span>
                        
                        <div className="d-flex align-items-center">
                            <span className="badge bg-secondary text-white border me-2">
                                {product.category}
                            </span>
                            
                            <span className="text-white fw-bold small">
                                ${product.price}
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="align-middle">
                <div className="input-group input-group-sm" style={{ width: "120px" }}>
                    <button className="btn btn-outline-secondary" onClick={() => handleQuantity(-1)}>-</button>
                    <input type="number" className="form-control text-center p-0" value={localStock} onChange={handleInputChange} />
                    <button className="btn btn-outline-secondary" onClick={() => handleQuantity(1)}>+</button>
                </div>
            </td>
            <td className="align-middle">
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-success" onClick={handleUpdate} title="Guardar Stock">
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button className="btn btn-primary" onClick={() => onEdit(product)} title="Editar Producto">
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
}

function VistaAdmin() {
    const { products, addProduct, updateProduct } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentView, setCurrentView] = useState('products');

    const handleOpenAdd = () => {
        setEditingProduct(null); // Modo crear
        setShowForm(true);
    };

    const handleOpenEdit = (product) => {
        setEditingProduct(product); // Modo editar
        setShowForm(true);
    };

    const handleSaveProduct = (payload, id) => {
        if (id) {
            updateProduct(id, payload); // Editar
        } else {
            addProduct(payload); // Crear
        }
        setShowForm(false);
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-uppercase me-auto" href="#">Panel Admin</a>
                    <Link className="btn btn-outline-light btn-sm" to='/login'>Cerrar Sesión</Link>
                </div>
            </nav>

            {/* Sidebar */}
            <div className="offcanvas offcanvas-start bg-dark text-white sidebar-nav" tabIndex="-1" id="sidebar" style={{visibility: 'visible'}}>
                <div className="offcanvas-body p-0">
                    <nav className="navbar-dark">
                        <ul className="navbar-nav pt-3">
                            <li><div className="text-muted small fw-bold text-uppercase px-3">Menu</div></li>
                            <li>
                                <a href="#" className={`nav-link px-3 ${currentView === 'products' ? 'active' : ''}`} onClick={() => setCurrentView('products')}>
                                    <i className="bi bi-speedometer2"></i> Productos
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="mt-5 pt-3">
                <div className="container-fluid">
                    <div className="card shadow-sm mt-3">
                        <div className="card-header bg-shadow d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Inventario</h5>
                                <button className="btn btn-primary btn-sm" onClick={handleOpenAdd}>
                                    <i className="bi bi-plus-lg"></i> Nuevo
                                </button>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="table-shadow">
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Stock Rápido</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map(product => (
                                                    <StockRow
                                                        key={product.id}
                                                        product={product}
                                                        onEdit={handleOpenEdit}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                </main>

            {/* Modal */}
            {showForm && (
                <ProductForm 
                    initialData={editingProduct}
                    onClose={() => setShowForm(false)}
                    onSave={handleSaveProduct}
                />
            )}
        </div>
    );
}

export default VistaAdmin;