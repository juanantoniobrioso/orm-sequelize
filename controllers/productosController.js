// controllers/productosController.js
const { BaseController } = require("./base/BaseController.js");
const { ProductosService } = require("../services/productosService.js");

class ProductosController extends BaseController {
  constructor() { super(new ProductosService()); }
}
module.exports = new ProductosController();
