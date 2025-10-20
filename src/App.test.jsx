import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./context/CartContext', () => ({
    CartProvider: ({ children }) => <div>{children}</div>,
}));
vi.mock('./components/Header', () => ({ default: () => <header>Contenido del Header</header> }));
vi.mock('./components/Footer', () => ({ default: () => <footer>Contenido del Footer</footer> }));

// Mocks para componentes con "export default"
vi.mock('./components/Home', () => ({ default: () => <div>Página Principal</div> }));
vi.mock('./components/Login', () => ({ default: () => <div>Página de Login</div> }));
vi.mock('./components/Contact', () => ({ default: () => <div>Página de Contacto</div> }));
vi.mock('./components/VistaAdmin', () => ({ default: () => <div>Página de Administrador</div> }));

// Mocks para componentes con "export { Componente }" (exportación nombrada)
// Fíjate que aquí no usamos "default"
vi.mock('./components/Products', () => ({ 
    Products: () => <div>Página de Productos</div> 
}));
vi.mock('./components/ProductDetail', () => ({ 
    ProductDetail: () => <div>Página de Detalle de Producto</div> 
}));
vi.mock('./components/Cart', () => ({ 
    Cart: () => <div>Página del Carrito</div> 
}));
vi.mock('./components/Checkout', () => ({ 
    Checkout: () => <div>Página de Checkout</div> 
}));


describe('App', () => {

    it('renderiza el layout principal y la página de inicio en la ruta raíz', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    expect(screen.getByText('Contenido del Header')).toBeTruthy();
    expect(screen.getByText('Página Principal')).toBeTruthy();
    expect(screen.getByText('Contenido del Footer')).toBeTruthy();
});

  // Puedes añadir otra prueba para verificar una de las rutas con exportación nombrada
    it('renderiza la página de productos en la ruta /products', () => {
    render(
    <MemoryRouter initialEntries={['/products']}>
        <App />
    </MemoryRouter>
    );

    expect(screen.getByText('Página de Productos')).toBeTruthy();
    });
});