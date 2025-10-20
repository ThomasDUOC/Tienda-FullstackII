import { Link } from "react-router-dom";

function VistaAdmin() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                {/* Botón para mostrar el sidebar en móviles */}
                <button
                    className="navbar-toggler me-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebar"
                    aria-controls="sidebar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <a className="navbar-brand fw-bold text-uppercase me-auto" href="#">Dashboard</a>
                
                {/* Menú de la derecha */}
                <div className="dropdown">
                    <button
                    className="btn btn-dark dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    {/* Aquí iría un ícono de usuario */}
                    <i className="bi bi-person-fill"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Mi Perfil</a></li>
                    <li><a className="dropdown-item" href="#">Configuración</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to='/login'>Cerrar sesion</Link></li>
                    </ul>
                </div>
                </div>
            </nav>

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
                        Principal
                        </div>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-3 active">
                        {/* Ícono */}
                        <span className="me-2"><i className="bi bi-speedometer2"></i></span>
                        <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="my-2"><hr className="dropdown-divider" /></li>
                    <li>
                        <div className="text-muted small fw-bold text-uppercase px-3">
                        Gestión
                        </div>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-3">
                        <span className="me-2"><i className="bi bi-people"></i></span>
                        <span>Usuarios</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-3">
                        <span className="me-2"><i className="bi bi-box-seam"></i></span>
                        <span>Productos</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-3">
                        <span className="me-2"><i className="bi bi-card-list"></i></span>
                        <span>Órdenes</span>
                        </a>
                    </li>
                    <li className="my-2"><hr className="dropdown-divider" /></li>
                    <li>
                        <div className="text-muted small fw-bold text-uppercase px-3">
                        Adicional
                        </div>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-3">
                        <span className="me-2"><i className="bi bi-gear"></i></span>
                        <span>Configuración</span>
                        </a>
                    </li>
                    </ul>
                </nav>
                </div>
            </div>

            <main className="mt-5 pt-3">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                    <h1 className="h2 mb-3">Dashboard</h1>
                    </div>
                </div>
                
                {/* Tarjetas de Resumen */}
                <div className="row">
                    <div className="col-md-3 mb-3">
                    <div className="card text-white bg-primary h-100">
                        <div className="card-body">
                        <h5 className="card-title">Ventas Totales</h5>
                        <p className="card-text fs-4">$12,345</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 mb-3">
                    <div className="card text-white bg-success h-100">
                        <div className="card-body">
                        <h5 className="card-title">Nuevos Usuarios</h5>
                        <p className="card-text fs-4">89</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 mb-3">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                        <h5 className="card-title">Órdenes Pendientes</h5>
                        <p className="card-text fs-4">23</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 mb-3">
                    <div className="card text-white bg-danger h-100">
                        <div className="card-body">
                        <h5 className="card-title">Tickets de Soporte</h5>
                        <p className="card-text fs-4">7</p>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Tabla de Datos */}
                <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                        <span><i className="bi bi-table me-2"></i></span> Últimos Usuarios Registrados
                        </div>
                        <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Correo Electrónico</th>
                                <th>Rol</th>
                                <th>Fecha de Registro</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Juan Pérez</td>
                                <td>juan.perez@example.com</td>
                                <td>Admin</td>
                                <td>2025-10-20</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Ana Gómez</td>
                                <td>ana.gomez@example.com</td>
                                <td>Editor</td>
                                <td>2025-10-19</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Carlos Ruiz</td>
                                <td>carlos.ruiz@example.com</td>
                                <td>Usuario</td>
                                <td>2025-10-19</td>
                                </tr>
                                {/* Agrega más filas según sea necesario */}
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
    )
}
export default VistaAdmin;


