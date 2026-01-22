// controllers/node1Controller.js
const { BaseController } = require("./base/BaseController.js");
const { Node1Service } = require("../services/node1Service.js");

class Node1Controller extends BaseController {
  constructor() { super(new Node1Service()); }
}
module.exports = new Node1Controller();
