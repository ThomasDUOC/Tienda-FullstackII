import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { CartProvider } from '../context/CartContext';
import Home from './Home'; // Se necesita para definir la ruta
import Header from './Header'; // El componente a probar
import Contact from './Contact';

describe('Header basico', () => {

    it('renderiza el contenido de Home correctamente', () => {
    
    render(
      // MemoryRouter simula el navegador y lo posicionamos en la ruta '/'
    <CartProvider>
        <MemoryRouter initialEntries={['/']}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </MemoryRouter>
    </CartProvider>
    );
    expect(screen.getByText('Login')).toBeTruthy();
    });

});

    it('renderiza el contenido de Contacto correctamente', () => {
    
    render(

    <CartProvider>
        <MemoryRouter initialEntries={['/']}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </MemoryRouter>
    </CartProvider>
    );
    expect(screen.getByText('Contacto')).toBeTruthy();
});