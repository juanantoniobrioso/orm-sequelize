// controllers/logController.js
const { BaseController } = require("./base/BaseController.js");
const { LogService } = require("../services/logService.js");

class LogController extends BaseController {
  constructor() { super(new LogService()); }
}
module.exports = new LogController();
