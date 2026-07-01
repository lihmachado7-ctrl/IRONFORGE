const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar Middleware
app.use(cors());
app.use(express.json());

// Servir los archivos estáticos de la carpeta 'public' (tu index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Lista oficial de máquinas de gimnasio para IronForge
app.use(express.static('public'));
const catalogoFalso = [
    { id: 1, nombre: "Multigimnasio / Multifuncional", categoria: "Fuerza Integral", estado: "Disponible" },
    { id: 2, nombre: "Banco de pecho", categoria: "Fuerza / Tren Superior", estado: "Disponible" },
    { id: 3, nombre: "Prensa de Piernas 45° (Leg Press)", categoria: "Fuerza / Tren Inferior", estado: "Disponible" },
    { id: 4, nombre: "Kit Mancuernas + Rack (Pesos Libres)", categoria: "Peso Libre", estado: "Disponible" }
];

// Ruta de la API que lee AngularJS
app.get('/api/maquinas', (req, res) => {
    res.json(catalogoFalso);
});
// Ruta para recibir y procesar las órdenes que envían los clientes
app.post('/api/pedidos', (req, res) => {
    const nuevoPedido = req.body;
    
    // Esto mostrará en la consola negra de VS Code el pedido que haga el cliente
    console.log("==========================================");
    console.log("¡NUEVO PEDIDO RECIBIDO!");
    console.log("Cliente:", nuevoPedido.nombreCliente);
    console.log("Teléfono:", nuevoPedido.telefonoCliente);
    console.log("Productos seleccionados:", nuevoPedido.productos.length);
    console.log("==========================================");

    // Le respondemos al frontend que todo salió perfecto
    res.json({ mensaje: "Pedido procesado con éxito en IronForge" });
});
// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de IronForge corriendo en http://localhost:${PORT}`);
});