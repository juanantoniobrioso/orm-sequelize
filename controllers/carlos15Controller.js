// controllers/carlos15Controller.js
const { BaseController } = require("./base/BaseController.js");
const { Carlos15Service } = require("../services/carlos15Service.js");

class Carlos15Controller extends BaseController {
  constructor() { super(new Carlos15Service()); }
}
module.exports = new Carlos15Controller();
