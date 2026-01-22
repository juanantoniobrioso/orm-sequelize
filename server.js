
// server.js
import express from "express";
import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";

// Importar todas las rutas
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import detallesPedidoRoutes from "./routes/detalles_pedidoRoutes.js";
import node1Routes from "./routes/node1Routes.js";

const app = express();
app.use(express.json());
initModels(sequelize);

// Registrando las rutas importadas
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/detallesPedidos', detallesPedidoRoutes);
app.use('/api/node1', node1Routes);

// 🔌 Verificar y sincronizar la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con la base de datos:", sequelize.config.database);
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
  }
})();

// 🚀 Arrancar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));