// controllers/categoriasController.js
const { BaseController } = require("./base/BaseController.js");
const { CategoriasService } = require("../services/categoriasService.js");

class CategoriasController extends BaseController {
  constructor() { super(new CategoriasService()); }
}
module.exports = new CategoriasController();
