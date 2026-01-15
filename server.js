const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db.js");
const initModels = require("./models/init-models.js");

// Importar rutas generadas
const productosRoutes = require("./routes/productosRoutes.js");
const logRoutes = require("./routes/logRoutes.js");
const pedidosRoutes = require("./routes/pedidosRoutes.js");
const clientesRoutes = require("./routes/clientesRoutes.js");
const categoriasRoutes = require("./routes/categoriasRoutes.js");
const detallesRoutes = require("./routes/detalles_pedidoRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

// 1. Inicializar Modelos
initModels(sequelize); 

// 2. Definir Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/detalles_pedido", detallesRoutes);

// 3. Arrancar Servidor
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Base de datos sincronizada.");
    
    const PORT = 3000;
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar:", error);
  }
})();