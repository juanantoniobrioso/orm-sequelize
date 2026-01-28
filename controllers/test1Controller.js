// controllers/test1Controller.js
const { BaseController } = require("./base/BaseController.js");
const { Test1Service } = require("../services/test1Service.js");

class Test1Controller extends BaseController {
  constructor() { super(new Test1Service()); }
}
module.exports = new Test1Controller();
