// controllers/clientesController.js
const { BaseController } = require("./base/BaseController.js");
const { ClientesService } = require("../services/clientesService.js");

class ClientesController extends BaseController {
  constructor() { super(new ClientesService()); }
}
module.exports = new ClientesController();
