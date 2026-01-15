// controllers/pedidosController.js
const { BaseController } = require("./base/BaseController.js");
const { PedidosService } = require("../services/pedidosService.js");

class PedidosController extends BaseController {
  constructor() { super(new PedidosService()); }
}
module.exports = new PedidosController();
