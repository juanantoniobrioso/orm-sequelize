// controllers/holaController.js
const { BaseController } = require("./base/BaseController.js");
const { HolaService } = require("../services/holaService.js");

class HolaController extends BaseController {
  constructor() { super(new HolaService()); }
}
module.exports = new HolaController();
