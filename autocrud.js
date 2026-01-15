const fs = require("fs");
const path = require("path");

// CONFIGURACIÓN
const modelsPath = "./models";
const controllersPath = "./controllers";
const baseControllerPath = "./controllers/base";
const servicesPath = "./services";
const routesPath = "./routes";

// Crear directorios necesarios
[modelsPath, controllersPath, baseControllerPath, servicesPath, routesPath].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. BASE CONTROLLER (Estándar CommonJS)
const baseControllerContent = `// controllers/base/BaseController.js
class BaseController {
  constructor(service) { this.service = service; }
  
  handleRequest = async (fn, req, res) => {
    try { await fn(req, res); } 
    catch (error) { console.error(error); res.status(500).json({ error: error.message }); }
  }

  getAll = async (req, res) => this.handleRequest(async () => res.json(await this.service.findAll()), req, res);
  getById = async (req, res) => this.handleRequest(async () => {
    const item = await this.service.findById(req.params.id);
    item ? res.json(item) : res.status(404).json({ message: "Not found" });
  }, req, res);
  create = async (req, res) => this.handleRequest(async () => res.status(201).json(await this.service.create(req.body)), req, res);
  update = async (req, res) => this.handleRequest(async () => res.json(await this.service.update(req.params.id, req.body)), req, res);
  delete = async (req, res) => this.handleRequest(async () => res.json(await this.service.delete(req.params.id)), req, res);
}
module.exports = { BaseController };
`;
fs.writeFileSync(`${baseControllerPath}/BaseController.js`, baseControllerContent);

// 2. PROCESAR CADA MODELO
const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js" && f !== "index.js");

for (const modelFile of models) {
  const modelNameOriginal = path.basename(modelFile, ".js"); // ej: "productos"
  const modelClass = modelNameOriginal.charAt(0).toUpperCase() + modelNameOriginal.slice(1);
  
  const ServiceClass = `${modelClass}Service`;
  const ControllerClass = `${modelClass}Controller`;

  // --- SERVICIO (CORREGIDO CON LAZY LOADING) ---
  // Usamos 'get model()' para buscar el modelo en el momento de la consulta, no al inicio.
  const serviceContent = `// services/${modelNameOriginal}Service.js
const { sequelize } = require("../config/db.js");

class ${ServiceClass} {
  
  get model() {
    // Busca el modelo justo cuando se necesita, asegurando que ya esté cargado
    return sequelize.models.${modelNameOriginal} || sequelize.models.${modelClass};
  }

  async findAll() { return await this.model.findAll(); }
  async findById(id) { return await this.model.findByPk(id); }
  async create(data) { return await this.model.create(data); }
  async update(id, data) {
    const item = await this.findById(id);
    return item ? await item.update(data) : null;
  }
  async delete(id) {
    const item = await this.findById(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
module.exports = { ${ServiceClass} };
`;
  fs.writeFileSync(`${servicesPath}/${modelNameOriginal}Service.js`, serviceContent);

  // --- CONTROLADOR ---
  const controllerContent = `// controllers/${modelNameOriginal}Controller.js
const { BaseController } = require("./base/BaseController.js");
const { ${ServiceClass} } = require("../services/${modelNameOriginal}Service.js");

class ${ControllerClass} extends BaseController {
  constructor() { super(new ${ServiceClass}()); }
}
module.exports = new ${ControllerClass}();
`;
  fs.writeFileSync(`${controllersPath}/${modelNameOriginal}Controller.js`, controllerContent);

  // --- RUTAS ---
  const routeContent = `// routes/${modelNameOriginal}Routes.js
const express = require("express");
const controller = require("../controllers/${modelNameOriginal}Controller.js");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
`;
  fs.writeFileSync(`${routesPath}/${modelNameOriginal}Routes.js`, routeContent);
  
  console.log(`✅ Stack generado para: ${modelNameOriginal}`);
}