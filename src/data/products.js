export const products = [
    // Consolas
    {
        id: 1,
        name: 'PlayStation 5',
        category: 'consolas',
        price: '700.000',
        image: '/src/assets/images/PS5Digital.ppg',
        description: 'La consola de nueva generación de Sony con gráficos 4K y velocidades ultrarrápidas.',
        stock: 15,
        featured: true,
        specs: {
            cpu: 'AMD Zen 2, 8 núcleos a 3.5 GHz',
            gpu: 'AMD RDNA 2, 10.28 TFLOPS',
            memory: '16GB GDDR6',
            storage: '825GB SSD',
            resolution: 'Hasta 4K a 120Hz',
            connectivity: 'WiFi 6, Bluetooth 5.1, USB-C',
            weight: '4.5 kg',
            dimensions: '390mm x 104mm x 260mm'
        }
    },
    {
        id: 2,
        name: 'Xbox Series X',
        category: 'consolas',
        price: '500.000',
        image: '/src/assets/images/XboxSeriesX.png',
        description: 'La consola más potente de Xbox con compatibilidad total hacia atrás.',
        stock: 12,
        featured: true,
        specs: {
            cpu: 'AMD Zen 2, 8 núcleos a 3.8 GHz',
            gpu: 'AMD RDNA 2, 12 TFLOPS',
            memory: '16GB GDDR6',
            storage: '1TB SSD NVMe',
            resolution: 'Hasta 4K a 120Hz',
            connectivity: 'WiFi 5, Bluetooth 5.1, HDMI 2.1',
            weight: '4.45 kg',
            dimensions: '301mm x 151mm x 151mm'
        }
    },
    {
        id: 3,
        name: 'Nintendo Switch OLED',
        category: 'consolas',
        price: '350.000',
        image: '/src/assets/images/SwitchOLED.webp',
        description: 'La versión mejorada de Nintendo Switch con pantalla OLED de 7 pulgadas.',
        stock: 20,
        featured: true,
        specs: {
            screen: 'OLED de 7 pulgadas',
            resolution: '1280 x 720 (portátil), 1920 x 1080 (TV)',
            storage: '64GB interna',
            battery: '4.5 - 9 horas',
            connectivity: 'WiFi, Bluetooth 4.1',
            weight: '320g (consola), 422g (con Joy-Cons)',
            dimensions: '242mm x 103mm x 13.9mm'
        }
    },
    {
        id: 4,
        name: 'PlayStation 4 Pro',
        category: 'consolas',
        price: '400.000',
        image: '/src/assets/images/PS4Pro.webp',
        description: 'La versión mejorada de PlayStation 4 con soporte 4K.',
        stock: 8,
        featured: false,
        specs: {
            cpu: 'AMD Jaguar, 8 núcleos a 2.1 GHz',
            gpu: '4.20 TFLOPS',
            memory: '8GB GDDR5',
            storage: '1TB HDD',
            resolution: 'Hasta 4K',
            connectivity: 'WiFi, Bluetooth 4.0',
            weight: '3.3 kg',
            dimensions: '295mm x 55mm x 327mm'
        }
    },

    // Juegos PlayStation
    {
        id: 5,
        name: 'God of War Ragnarök',
        category: 'juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/GoWRPS4.jpg',
        description: 'Continúa la épica aventura de Kratos y Atreus en los reinos nórdicos.',
        stock: 30,
        featured: true,
        specs: {
            platform: 'PS4',
            genre: 'Acción, Aventura',
            players: '1 jugador',
            developer: 'Santa Monica Studio',
            publisher: 'Sony Interactive Entertainment',
            releaseDate: '2022',
            rating: 'M (17+)',
            languages: 'Español, Inglés, y más'
        }
    },
    {
        id: 6,
        name: 'Spider-Man 2',
        category: 'juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/Spiderman2.webp',
        description: 'Balancéate por Nueva York con Peter Parker y Miles Morales.',
        stock: 25,
        featured: true,
        specs: {
            platform: 'PS5',
            genre: 'Acción, Aventura',
            players: '1 jugador',
            developer: 'Insomniac Games',
            publisher: 'Sony Interactive Entertainment',
            releaseDate: '2023',
            rating: 'T (13+)',
            languages: 'Español, Inglés, y más'
        }
    },
    {
        id: 7,
        name: 'Horizon Forbidden West',
        category: 'juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/HorizonFWPS4.jpg',
        description: 'Explora un mundo post-apocalíptico lleno de máquinas peligrosas.',
        stock: 18,
        featured: false,
        specs: {
            platform: 'PS4',
            genre: 'Acción, RPG',
            players: '1 jugador',
            developer: 'Guerrilla Games',
            publisher: 'Sony Interactive Entertainment',
            releaseDate: '2022',
            rating: 'T (13+)',
            languages: 'Español, Inglés, y más'
        }
    },
    {
        id: 8,
        name: 'The Last of Us Part II',
        category: 'juegos',
        platform: 'PlayStation',
        price: '70.000',
        image: '/src/assets/images/TLoU2PS4.webp',
        description: 'La esperada secuela del aclamado juego de Naughty Dog.',
        stock: 22,
        featured: false,
        specs: {
            platform: 'PS5, PS4',
            genre: 'Acción, Aventura',
            players: '1 jugador',
            developer: 'Naughty Dog',
            publisher: 'Sony Interactive Entertainment',
            releaseDate: '2020',
            rating: 'M (17+)',
            languages: 'Español, Inglés, y más'
        }
    },

    // Juegos Xbox
    {
        id: 9,
        name: 'Halo Infinite',
        category: 'juegos',
        platform: 'Xbox',
        price: '60.000',
        image: '/src/assets/images/HInfiniteXSX.webp',
        description: 'El regreso del Jefe Maestro en esta nueva aventura de Halo.',
        stock: 20,
        featured: false,
        specs: {
            platform: 'Xbox Series X|S, Xbox One, PC',
            genre: 'FPS, Acción',
            players: '1 jugador (campaña), Multijugador',
            developer: '343 Industries',
            publisher: 'Xbox Game Studios',
            releaseDate: '2021',
            rating: 'T (13+)',
            languages: 'Español, Inglés, y más'
        }
    },
    {
        id: 10,
        name: 'Forza Horizon 5',
        category: 'juegos',
        platform: 'Xbox',
        price: '60.000',
        image: '/src/assets/images/ForzaHorizon5XSX.webp',
        description: 'Corre por los hermosos paisajes de México en el mejor juego de carreras.',
        stock: 15,
        featured: true,
        specs: {
            platform: 'Xbox Series X|S, Xbox One, PC',
            genre: 'Carreras, Arcade',
            players: '1 jugador, Multijugador',
            developer: 'Playground Games',
            publisher: 'Xbox Game Studios',
            releaseDate: '2021',
            rating: 'E (Para todos)',
            languages: 'Español, Inglés, y más'
        }
    },
    {
        id: 11,
        name: 'Starfield',
        category: 'juegos',
        platform: 'Xbox',
        price: '70.000',
        image: '/src/assets/images/Starfield.jpg',
        description: 'Explora el universo en este RPG espacial de Bethesda.',
        stock: 28,
        featured: true,
        specs: {
            platform: 'Xbox Series X|S, PC',
            genre: 'RPG, Acción',
            players: '1 jugador',
            developer: 'Bethesda Game Studios',
            publisher: 'Bethesda Softworks',
            releaseDate: '2023',
            rating: 'M (17+)',
            languages: 'Español, Inglés, y más'
        }
    },

    // Juegos Nintendo
    {
        id: 12,
        name: 'The Legend of Zelda: Tears of the Kingdom',
        category: 'juegos',
        platform: 'Nintendo',
        price: '70.000',
        image: '/src/assets/images/ToTK.jpg',
        description: 'La esperada secuela de Breath of the Wild.',
        stock: 35,
        featured: true,
        specs: {
            platform: 'Nintendo Switch',
            genre: 'Acción, Aventura',
            players: '1 jugador',
            developer: 'Nintendo EPD',
            publisher: 'Nintendo',
            releaseDate: '2023',
            rating: 'E10+ (10+)',
            languages: 'Español, Inglés, y más'
        }
    },
    {
        id: 13,
        name: 'Super Mario Odyssey',
        category: 'juegos',
        platform: 'Nintendo',
        price: '60.000',
        image: '/src/assets/images/SMOdyssey.webp',
        description: 'Acompaña a Mario en una aventura por todo el mundo.',
        stock: 24,
        featured: false,
        specs: {
            platform: 'Nintendo Switch',
            genre: 'Plataformas, Aventura',
            players: '1-2 jugadores',
            developer: 'Nintendo EPD',
            publisher: 'Nintendo',
            releaseDate: '2017',
            rating: 'E10+ (10+)',
            languages: 'Español, Inglés, y más'
        }
    },
    {
        id: 14,
        name: 'Pokémon Scarlet',
        category: 'juegos',
        platform: 'Nintendo',
        price: '70.000',
        image: '/src/assets/images/PKMNScarlet.webp',
        description: 'Explora la región de Paldea en esta nueva aventura Pokémon.',
        stock: 30,
        featured: false,
        specs: {
            platform: 'Nintendo Switch',
            genre: 'RPG, Aventura',
            players: '1 jugador, Multijugador',
            developer: 'Game Freak',
            publisher: 'Nintendo',
            releaseDate: '2022',
            rating: 'E (Para todos)',
            languages: 'Español, Inglés, y más'
        }
    },

    // Accesorios
    {
        id: 15,
        name: 'DualSense Wireless Controller',
        category: 'accesorios',
        price: '70.000',
        image: '/src/assets/images/dualsense.webp',
        description: 'El innovador controlador de PS5 con retroalimentación háptica.',
        stock: 40,
        featured: false,
        specs: {
            compatibility: 'PS5, PC',
            connectivity: 'Bluetooth, USB-C',
            battery: 'Hasta 12 horas',
            features: 'Retroalimentación háptica, Gatillos adaptativos, Micrófono integrado',
            weight: '280g',
            dimensions: '160mm x 66mm x 106mm',
            colors: 'Blanco, Negro, Rojo, Azul'
        }
    },
    {
        id: 16,
        name: 'Xbox Wireless Controller - Robot White',
        category: 'accesorios',
        price: '60.000',
        image: '/src/assets/images/xboxcontrollerwhite.webp',
        description: 'Control inalámbrico para Xbox con agarre texturizado.',
        stock: 35,
        featured: false,
        specs: {
            compatibility: 'Xbox Series X|S, Xbox One, PC',
            connectivity: 'Bluetooth, USB-C',
            battery: 'Hasta 40 horas (con pilas AA)',
            features: 'Botón Share, Puerto de 3.5mm, Agarre texturizado',
            weight: '287g (sin pilas)',
            dimensions: '154mm x 106mm x 60mm',
            colors: 'Blanco'
        }
    },
    {
        id: 17,
        name: 'Nintendo Switch Pro Controller',
        category: 'accesorios',
        price: '70.000',
        image: '/src/assets/images/SwitchProController1.jfif',
        description: 'Control profesional para Nintendo Switch.',
        stock: 25,
        featured: false,
        specs: {
            compatibility: 'Nintendo Switch',
            connectivity: 'Bluetooth, USB-C',
            battery: 'Hasta 40 horas',
            features: 'Giroscopio, HD Rumble, NFC',
            weight: '246g',
            dimensions: '152mm x 106mm x 60mm',
            colors: 'Negro'
        }
    },
    {
        id: 18,
        name: 'PlayStation 5 Headset',
        category: 'accesorios',
        price: '100.000',
        image: '/src/assets/images/pulse_elite_1.jpg',
        description: 'Auriculares inalámbricos con audio 3D Tempest.',
        stock: 18,
        featured: false,
        specs: {
            compatibility: 'PS5, PS4, PC',
            connectivity: 'USB-C inalámbrico, 3.5mm',
            battery: 'Hasta 12 horas',
            features: 'Audio 3D Tempest, Cancelación de ruido, Micrófono bidireccional',
            weight: '292g',
            drivers: '40mm',
            frequency: '20Hz - 20,000Hz'
        }
    },
    {
        id: 19,
        name: 'Razer Gaming Keyboard Blackwidow V4 X',
        category: 'accesorios',
        price: '130.000',
        image: '/src/assets/images/BlackwidowV4X.webp',
        description: 'Teclado mecánico gaming con iluminación RGB.',
        stock: 12,
        featured: false,
        specs: {
            compatibility: 'PC, Mac',
            connectivity: 'USB 2.0',
            switches: 'Razer Green Mechanical',
            features: 'RGB Chroma, Anti-ghosting, Reposamuñecas magnético',
            weight: '1.3kg',
            dimensions: '448mm x 155mm x 42mm',
            layout: 'QWERTY (Español/Inglés)'
        }
    },
    {
        id: 20,
        name: 'Logitech Gaming Mouse G203',
        category: 'accesorios',
        price: '80.000',
        image: '/src/assets/images/G203.webp',
        description: 'Ratón gaming de alta precisión con sensor óptico.',
        stock: 22,
        featured: false,
        specs: {
            compatibility: 'PC, Mac',
            connectivity: 'USB, Wireless 2.4GHz',
            sensor: 'HERO 25K (hasta 25,600 DPI)',
            battery: 'Hasta 60 horas',
            features: '6 botones programables, RGB LIGHTSYNC, Peso ajustable',
            weight: '107g (sin cable)',
            dimensions: '130mm x 67mm x 40mm'
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