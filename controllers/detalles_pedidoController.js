// controllers/detalles_pedidoController.js
const { BaseController } = require("./base/BaseController.js");
const { Detalles_pedidoService } = require("../services/detalles_pedidoService.js");

class Detalles_pedidoController extends BaseController {
  constructor() { super(new Detalles_pedidoService()); }
}
module.exports = new Detalles_pedidoController();
