import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import { useProducts } from '../context/ProductContext';
import { useToast } from "../context/ToastContext";
import PurchaseLogs from "./PurchaseLogs";
import GestionUsuarios from "./GestionUsuarios";
import MensajeContacto from "./MensajeContacto";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{initialData ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6"><label className="form-label">Nombre *</label><input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required /></div>
                                <div className="col-md-3">
                                    <label className="form-label">Categoría</label>
                                    <select className="form-select" name="categoryId" value={formData.categoryId} onChange={handleChange}>
                                        <option value="1">Consolas</option><option value="2">Juegos</option><option value="3">Accesorios</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Plataforma</label>
                                    <select className="form-select" name="platformId" value={formData.platformId} onChange={handleChange}>
                                        <option value="1">PlayStation 5</option><option value="2">PlayStation 4</option><option value="3">Xbox Series X</option><option value="4">Nintendo Switch</option><option value="5">PC</option>
                                    </select>
                                </div>
                                <div className="col-md-6"><label className="form-label">Precio *</label><input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required /></div>
                                <div className="col-md-6"><label className="form-label">Stock</label><input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} /></div>
                                <div className="col-12"><label className="form-label">URL Imagen</label><input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} /></div>
                                <div className="col-12"><label className="form-label">Descripción</label><textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="2"></textarea></div>
                                
                                <div className="col-12">
                                    <div className="d-flex justify-content-between mb-2"><label className="form-label">Especificaciones</label><button type="button" className="btn btn-sm btn-outline-secondary" onClick={addSpec}>+ Agregar</button></div>
                                    {specs.map((s, i) => (
                                        <div key={i} className="row g-2 mb-2">
                                            <div className="col-5"><input className="form-control form-control-sm" placeholder="Clave" value={s.key} onChange={e=>handleSpecChange(i,'key',e.target.value)}/></div>
                                            <div className="col-6"><input className="form-control form-control-sm" placeholder="Valor" value={s.value} onChange={e=>handleSpecChange(i,'value',e.target.value)}/></div>
                                            <div className="col-1"><button type="button" className="btn btn-sm btn-danger w-100" onClick={()=>removeSpec(i)}>×</button></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-12"><div className="form-check"><input className="form-check-input" type="checkbox" name="featured" id="feat" checked={formData.featured} onChange={handleChange}/><label className="form-check-label" htmlFor="feat">Destacado</label></div></div>
                            </div>
                            <div className="modal-footer px-0 pb-0 mt-4 border-top-0">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                                <button type="submit" className="btn btn-primary px-4">{initialData ? 'Guardar Cambios' : 'Crear Producto'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StockRow({ product, onEdit, onDelete }) {
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

    const handleDeleteClick = () => {
        if (window.confirm(`¿Estás seguro que deseas eliminar "${product.name}"?`)) {
            onDelete(product.id);
        }
    }

    return (
        <tr>
            <td className="align-middle ps-4">
                <div className="d-flex align-items-center">
                    <div className="bg-white rounded p-1 border me-3" style={{width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {product.image ? (
                            <img src={product.image} alt={product.name} style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
                        ) : (
                            <i className="bi bi-image text-muted"></i>
                        )}
                    </div>
                    <div>
                        <div className="fw-bold text-white">{product.name}</div>
                        <div className="d-flex align-items-center small mt-1">
                            <span className="badge bg-secondary me-2">{product.category}</span>
                            <span className="text-white fw-bold">${product.price}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="align-middle">
                <div className="d-flex justify-content-center">
                    <div className="input-group input-group-sm" style={{ width: "120px" }}>
                        <button className="btn btn-outline-secondary" onClick={() => handleQuantity(-1)}>-</button>
                        <input type="number" className="form-control text-center p-0" value={localStock} onChange={handleInputChange} />
                        <button className="btn btn-outline-secondary" onClick={() => handleQuantity(1)}>+</button>
                    </div>
                </div>
            </td>
            <td className="align-middle">
                <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-sm btn-outline-success" onClick={handleUpdate} title="Guardar Stock">
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button className="btn btn-primary" onClick={() => onEdit(product)} title="Editar Producto">
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteClick} title="Eliminar Producto">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
}

function VistaAdmin() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentView, setCurrentView] = useState('products');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleOpenAdd = () => {
        setEditingProduct(null); // Modo crear
        setShowForm(true);
    };

    const handleOpenEdit = (product) => {
        setEditingProduct(product); // Modo editar
        setShowForm(true);
    };

    const handleDeleteProduct = (id) => {
        deleteProduct(id);
    };

    const handleSaveProduct = (payload, id) => {
        if (id) {
            updateProduct(id, payload); // Editar
        } else {
            addProduct(payload); // Crear
        }
        setShowForm(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="bg-shadow min-vh-100" style={{ paddingBottom: '50px'}}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4 shadow">
                <div className="container-fluid px-0">
                    <a className="navbar-brand fw-bold text-uppercase d-flex align-items-center" href="#">
                        <i className="bi bi-shield-lock-fill-me-2 text-warning"></i> Panel Admin
                    </a>

                    {/* Menu desplegable de usuario */}
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle d-flex align-itmes-center gap-2 border-0" type="button" id="adminDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{width: 32, height: 32}}>
                                <i className="bi bi-person-fill"></i>
                            </div>
                            <span>Administrador</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="adminDropdown">
                            <li><h6 className="dropdown-header text-white small">Gestión</h6></li>
                            <li>
                                <button className={`dropdown-item ${currentView === 'products' ? 'active-shadow' : ''} text-white`} onClick={() => setCurrentView('products')}>
                                    <i className="bi bi-box-seam me-2 text-white"></i> Inventario de Productos
                                </button>
                            </li>
                            <li>
                                <button className={`dropdown-item ${currentView === 'sales' ? 'active-shadow' : ''} text-white`} onClick={() => setCurrentView('sales')}>
                                    <i className="bi bi-receipt me-2 text-white"></i> Ventas
                                </button>
                            </li>
                            <li>
                                <button className={`dropdown-item ${currentView === 'users' ? 'active-shadow' : ''} text-white`} onClick={() => setCurrentView('users')}>
                                    <i className="bi bi-people-fill me-2 text-white"></i> Usuarios
                                </button>
                            </li>
                            <li>
                                <button className={`dropdown-item ${currentView === 'messages' ? 'active-shadow' : ''} text-white`} onClick={() => setCurrentView('messages')}>
                                    <i className="bi bi-envelope me-2 text-white"></i> Mensajes
                                </button>
                            </li>

                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container-fluid px-4" style={{marginTop: '80px'}}>
                <div className="row">
                    <div className="col-12">
                        {/* Header de la Sección */}
                        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-shadow rounded shadow-sm border-start border-4-shadow">
                            <div>
                                <h2 className="mb-0 fw-bold text-white">
                                    {currentView === 'products' ? 'Gestión de Inventario' : 
                                    currentView === 'sales' ? 'Historial de Ventas' :
                                    currentView === 'users' ? 'Gestion de usuarios' :
                                    'Mensajes de Contacto'}
                                </h2>
                                <p className="text-white mb-0 small">
                                    {currentView === 'products' ? 'Administra tus productos, precios y stock.' : 
                                    currentView === 'sales' ? 'Revisa el detalle de todas las transacciones.' : 
                                    currentView === 'users' ? 'Administra cuentas de clientes y administradores' : 'Administra tus mensajes'}
                                </p>
                            </div>
                            
                            {currentView === 'products' && (
                                <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" onClick={handleOpenAdd}>
                                    <i className="bi bi-plus-lg"></i> 
                                    <span className="d-none d-md-inline">Nuevo Producto</span>
                                </button>
                            )}
                        </div>
                        {currentView === 'products' && (
                            <div className="card shadow-sm border-0">
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="bg-shadow">
                                                <tr>
                                                    <th className="py-3 ps-4 text-white text-uppercase small" style={{width: '50%'}}>Producto</th>
                                                    <th className="py-3 text-center text-white text-uppercase small" style={{width: '25%'}}>Stock</th>
                                                    <th className="py-3 text-center text-white text-uppercase small" style={{width: '25%'}}>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.length > 0 ? (
                                                    products.map(product => (
                                                    <StockRow
                                                        key={product.id}
                                                        product={product}
                                                        onEdit={handleOpenEdit}
                                                        onDelete={handleDeleteProduct}
                                                    />
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center py-5 text-muted">
                                                        No hay productos cargados.
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentView === 'sales' && (
                            <div className="mt-3">
                                <PurchaseLogs />
                            </div>
                        )}

                        {currentView === 'users' && (
                            <div className="mt-3">
                                <GestionUsuarios />
                            </div>
                        )}

                        {currentView === 'messages' && (
                            <div className="mt-3">
                                <MensajeContacto />
                            </div>
                        )}
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