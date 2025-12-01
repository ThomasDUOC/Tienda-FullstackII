import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import { useProducts } from '../context/ProductContext';

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

    const { products } = useProducts();

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
                                <a href="#" className='nav-link px-3 active' onClick={(e) => e.preventDefault()}>
                                    <span className="me-2"><i className="bi bi-speedometer2"></i></span>
                                    <span>Productos</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className='nav-link px-3'>
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
                                <div className="card-header">
                                    <span><i className="bi bi-box-seam me-2"></i></span> Gestionar Stock de Productos
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
        </div>
    );
}

export default VistaAdmin;