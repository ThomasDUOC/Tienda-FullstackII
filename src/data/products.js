export const products = [
    // Consolas
    {
        id: 1,
        name: 'PlayStation 5',
        category: 'Consolas',
        price: '700.000',
        image: '/src/assets/images/PS5Digital.png',
        description: 'La consola de nueva generación de Sony con gráficos 4K y velocidades ultrarrápidas.',
        stock: 15,
        featured: true,
        specs: {
            cpu: 'AMD Zen 2, 8 núcleos a 3.5 GHz',
            gpu: 'AMD RDNA 2, 10.28 TFLOPS',
            memoria: '16GB GDDR6',
            almacenamiento: '825GB SSD',
            resolución: 'Hasta 4K a 120Hz',
            conectividad: 'WiFi 6, Bluetooth 5.1, USB-C',
            peso: '4.5 kg',
            dimensiones: '390mm x 104mm x 260mm'
        }
    },
    {
        id: 2,
        name: 'Xbox Series X',
        category: 'Consolas',
        price: '500.000',
        image: '/src/assets/images/XboxSeriesX.png',
        description: 'La consola más potente de Xbox con compatibilidad total hacia atrás.',
        stock: 12,
        featured: true,
        specs: {
            cpu: 'AMD Zen 2, 8 núcleos a 3.8 GHz',
            gpu: 'AMD RDNA 2, 12 TFLOPS',
            memoria: '16GB GDDR6',
            almacenamiento: '1TB SSD NVMe',
            resolucion: 'Hasta 4K a 120Hz',
            conectividad: 'WiFi 5, Bluetooth 5.1, HDMI 2.1',
            peso: '4.45 kg',
            dimensiones: '301mm x 151mm x 151mm'
        }
    },
    {
        id: 3,
        name: 'Nintendo Switch OLED',
        category: 'Consolas',
        price: '350.000',
        image: '/src/assets/images/SwitchOLED.webp',
        description: 'La versión mejorada de Nintendo Switch con pantalla OLED de 7 pulgadas.',
        stock: 20,
        featured: true,
        specs: {
            pantalla: 'OLED de 7 pulgadas',
            resolucion: '1280 x 720 (portátil), 1920 x 1080 (TV)',
            almacenamiento: '64GB interna',
            bateria: '4.5 - 9 horas',
            conectividad: 'WiFi, Bluetooth 4.1',
            peso: '320g (consola), 422g (con Joy-Cons)',
            dimensiones: '242mm x 103mm x 13.9mm'
        }
    },
    {
        id: 4,
        name: 'PlayStation 4 Pro',
        category: 'Consolas',
        price: '400.000',
        image: '/src/assets/images/PS4Pro.webp',
        description: 'La versión mejorada de PlayStation 4 con soporte 4K.',
        stock: 8,
        featured: false,
        specs: {
            cpu: 'AMD Jaguar, 8 núcleos a 2.1 GHz',
            gpu: '4.20 TFLOPS',
            memoria: '8GB GDDR5',
            almacenamiento: '1TB HDD',
            resolucion: 'Hasta 4K',
            conectividad: 'WiFi, Bluetooth 4.0',
            peso: '3.3 kg',
            dimensiones: '295mm x 55mm x 327mm'
        }
    },

    // Juegos PlayStation
    {
        id: 5,
        name: 'God of War Ragnarök',
        category: 'Juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/GoWRPS4.jpg',
        description: 'Continúa la épica aventura de Kratos y Atreus en los reinos nórdicos.',
        stock: 30,
        featured: true,
        specs: {
            plataforma: 'PS4',
            genero: 'Acción, Aventura',
            jugadores: '1 jugador',
            desarrollador: 'Santa Monica Studio',
            editor: 'Sony Interactive Entertainment',
            añoDeLanzamiento: '2022',
            clasificacion: 'M (17+)',
            idiomas: 'Español, Inglés, y más'
        }
    },
    {
        id: 6,
        name: 'Spider-Man 2',
        category: 'Juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/Spiderman2.webp',
        description: 'Balancéate por Nueva York con Peter Parker y Miles Morales.',
        stock: 25,
        featured: true,
        specs: {
            plataforma: 'PS5',
            genero: 'Acción, Aventura',
            jugadores: '1 jugador',
            desarrollador: 'Insomniac Games',
            editor: 'Sony Interactive Entertainment',
            añoDeLanzamiento: '2023',
            clasificacion: 'T (13+)',
            idiomas: 'Español, Inglés, y más'
        }
    },
    {
        id: 7,
        name: 'Horizon Forbidden West',
        category: 'Juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/HorizonFWPS4.jpg',
        description: 'Explora un mundo post-apocalíptico lleno de máquinas peligrosas.',
        stock: 18,
        featured: false,
        specs: {
            plataforma: 'PS4',
            genero: 'Acción, RPG',
            jugadores: '1 jugador',
            desarrollador: 'Guerrilla Games',
            editor: 'Sony Interactive Entertainment',
            añoDeLanzamiento: '2022',
            clasificacion: 'T (13+)',
            idiomas: 'Español, Inglés, y más'
        }
    },
    {
        id: 8,
        name: 'The Last of Us Part II',
        category: 'Juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/TLoU2PS4.webp',
        description: 'La esperada secuela del aclamado juego de Naughty Dog.',
        stock: 22,
        featured: false,
        specs: {
            plataforma: 'PS5, PS4',
            genero: 'Acción, Aventura',
            jugadores: '1 jugador',
            desarrollador: 'Naughty Dog',
            editor: 'Sony Interactive Entertainment',
            añoDeLanzamiento: '2020',
            clasificacion: 'M (17+)',
            idiomas: 'Español, Inglés, y más'
        }
    },

    // Juegos Xbox
    {
        id: 9,
        name: 'Halo Infinite',
        category: 'Juegos',
        platform: 'Xbox',
        price: '60.000',
        image: '/src/assets/images/HInfiniteXSX.webp',
        description: 'El regreso del Jefe Maestro en esta nueva aventura de Halo.',
        stock: 20,
        featured: false,
        specs: {
            plataforma: 'Xbox Series X|S, Xbox One, PC',
            genero: 'FPS, Acción',
            jugadores: '1 jugador (campaña), Multijugador',
            desarrollador: '343 Industries',
            editor: 'Xbox Game Studios',
            añoDeLanzamiento: '2021',
            clasificacion: 'T (13+)',
            idiomas: 'Español, Inglés, y más'
        }
    },
    {
        id: 10,
        name: 'Forza Horizon 5',
        category: 'Juegos',
        platform: 'Xbox',
        price: '60.000',
        image: '/src/assets/images/ForzaHorizon5XSX.webp',
        description: 'Corre por los hermosos paisajes de México en el mejor juego de carreras.',
        stock: 15,
        featured: true,
        specs: {
            plataforma: 'Xbox Series X|S, Xbox One, PC',
            genero: 'Carreras, Arcade',
            jugadores: '1 jugador, Multijugador',
            desarrollador: 'Playground Games',
            editor: 'Xbox Game Studios',
            añoDeLanzamiento: '2021',
            clasificacion: 'E (Para todos)',
            idiomas: 'Español, Inglés, y más'
        }
    },
    {
        id: 11,
        name: 'Starfield',
        category: 'Juegos',
        platform: 'Xbox',
        price: '70.000',
        image: '/src/assets/images/Starfield.jpg',
        description: 'Explora el universo en este RPG espacial de Bethesda.',
        stock: 28,
        featured: true,
        specs: {
            plataforma: 'Xbox Series X|S, PC',
            genero: 'RPG, Acción',
            jugadores: '1 jugador',
            desarrollador: 'Bethesda Game Studios',
            editor: 'Bethesda Softworks',
            añoDeLanzamiento: '2023',
            clasificacion: 'M (17+)',
            idiomas: 'Español, Inglés, y más'
        }
    },

    // Juegos Nintendo
    {
        id: 12,
        name: 'The Legend of Zelda: Tears of the Kingdom',
        category: 'Juegos',
        platform: 'Nintendo',
        price: '70.000',
        image: '/src/assets/images/ToTK.jpg',
        description: 'La esperada secuela de Breath of the Wild.',
        stock: 35,
        featured: true,
        specs: {
            plataforma: 'Nintendo Switch',
            genero: 'Acción, Aventura',
            jugadores: '1 jugador',
            desarrollador: 'Nintendo EPD',
            editor: 'Nintendo',
            añoDeLanzamiento: '2023',
            clasificacion: 'E10+ (10+)',
            idiomas: 'Español, Inglés, y más'
        }
    },
    {
        id: 13,
        name: 'Super Mario Odyssey',
        category: 'Juegos',
        platform: 'Nintendo',
        price: '60.000',
        image: '/src/assets/images/SMOdyssey.webp',
        description: 'Acompaña a Mario en una aventura por todo el mundo.',
        stock: 24,
        featured: false,
        specs: {
            plataforma: 'Nintendo Switch',
            genero: 'Plataformas, Aventura',
            jugadores: '1-2 jugadores',
            desarrollador: 'Nintendo EPD',
            editor: 'Nintendo',
            añoDeLanzamiento: '2017',
            clasificacion: 'E10+ (10+)',
            idiomas: 'Español, Inglés, y más'
        }
    },
    {
        id: 14,
        name: 'Pokémon Scarlet',
        category: 'Juegos',
        platform: 'Nintendo',
        price: '70.000',
        image: '/src/assets/images/PKMNScarlet.webp',
        description: 'Explora la región de Paldea en esta nueva aventura Pokémon.',
        stock: 30,
        featured: false,
        specs: {
            plataforma: 'Nintendo Switch',
            genero: 'RPG, Aventura',
            jugadores: '1 jugador, Multijugador',
            desarrollador: 'Game Freak',
            editor: 'Nintendo',
            añoDeLanzamiento: '2022',
            clasificacion: 'E (Para todos)',
            idiomas: 'Español, Inglés, y más'
        }
    },

    // Accesorios
    {
        id: 15,
        name: 'DualSense Wireless Controller',
        category: 'Accesorios',
        price: '70.000',
        image: '/src/assets/images/dualsense.webp',
        description: 'El innovador controlador de PS5 con retroalimentación háptica.',
        stock: 40,
        featured: false,
        specs: {
            compatibilidad: 'PS5, PC',
            conectividad: 'Bluetooth, USB-C',
            batería: 'Hasta 12 horas',
            caracteristicas: 'Retroalimentación háptica, Gatillos adaptativos, Micrófono integrado',
            peso: '280g',
            dimensiones: '160mm x 66mm x 106mm',
            colores: 'Blanco, Negro, Rojo, Azul'
        }
    },
    {
        id: 16,
        name: 'Xbox Wireless Controller - Robot White',
        category: 'Accesorios',
        price: '60.000',
        image: '/src/assets/images/xboxcontrollerwhite.webp',
        description: 'Control inalámbrico para Xbox con agarre texturizado.',
        stock: 35,
        featured: false,
        specs: {
            compatibilidad: 'Xbox Series X|S, Xbox One, PC',
            conectividad: 'Bluetooth, USB-C',
            batería: 'Hasta 40 horas (con pilas AA)',
            caracteristicas: 'Botón Share, Puerto de 3.5mm, Agarre texturizado',
            peso: '287g (sin pilas)',
            dimensiones: '154mm x 106mm x 60mm',
            colores: 'Blanco'
        }
    },
    {
        id: 17,
        name: 'Nintendo Switch Pro Controller',
        category: 'Accesorios',
        price: '70.000',
        image: '/src/assets/images/SwitchProController1.jfif',
        description: 'Control profesional para Nintendo Switch.',
        stock: 25,
        featured: false,
        specs: {
            compatibilidad: 'Nintendo Switch',
            conectividad: 'Bluetooth, USB-C',
            batería: 'Hasta 40 horas',
            caracteristicas: 'Giroscopio, HD Rumble, NFC',
            peso: '246g',
            dimensiones: '152mm x 106mm x 60mm',
            colores: 'Negro'
        }
    },
    {
        id: 18,
        name: 'PlayStation 5 Headset',
        category: 'Accesorios',
        price: '100.000',
        image: '/src/assets/images/pulse_elite_1.jpg',
        description: 'Auriculares inalámbricos con audio 3D Tempest.',
        stock: 18,
        featured: false,
        specs: {
            compatibilidad: 'PS5, PS4, PC',
            conectividad: 'USB-C inalámbrico, 3.5mm',
            batería: 'Hasta 12 horas',
            caracteristicas: 'Audio 3D Tempest, Cancelación de ruido, Micrófono bidireccional',
            peso: '292g',
            drivers: '40mm',
            frecuencia: '20Hz - 20,000Hz'
        }
    },
    {
        id: 19,
        name: 'Razer Gaming Keyboard Blackwidow V4 X',
        category: 'Accesorios',
        price: '130.000',
        image: '/src/assets/images/BlackwidowV4X.webp',
        description: 'Teclado mecánico gaming con iluminación RGB.',
        stock: 12,
        featured: false,
        specs: {
            compatibilidad: 'PC, Mac',
            conectividad: 'USB 2.0',
            switches: 'Razer Green Mechanical',
            caracteristicas: 'RGB Chroma, Anti-ghosting, Reposamuñecas magnético',
            peso: '1.3kg',
            dimensiones: '448mm x 155mm x 42mm',
            distribución: 'QWERTY (Español/Inglés)'
        }
    },
    {
        id: 20,
        name: 'Logitech Gaming Mouse G203',
        category: 'Accesorios',
        price: '80.000',
        image: '/src/assets/images/G203.webp',
        description: 'Ratón gaming de alta precisión con sensor óptico.',
        stock: 22,
        featured: false,
        specs: {
            compatibilidad: 'PC, Mac',
            conectividad: 'USB, Wireless 2.4GHz',
            sensor: 'HERO 25K (hasta 25,600 DPI)',
            batería: 'Hasta 60 horas',
            caracteristicas: '6 botones programables, RGB LIGHTSYNC, Peso ajustable',
            peso: '107g (sin cable)',
            dimensiones: '130mm x 67mm x 40mm'
        }
    }
];

export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
};

export const getProductsByPlatform = (platform) => {
    return products.filter(product => product.platform === platform);
}; //