// controllers/base/BaseController.js
class BaseController {
  constructor(service) { this.service = service; }
  
  handleRequest = async (fn, req, res) => {
    try { await fn(req, res); } 
    catch (error) { console.error(error); res.status(500).json({ error: error.message }); }
  }

  getAll = async (req, res) => this.handleRequest(async () => res.json(await this.service.findAll()), req, res);
  getById = async (req, res) => this.handleRequest(async () => {
    const item = await this.service.findById(req.params.id);
    item ? res.json(item) : res.status(404).json({ message: "Not found" });
  }, req, res);
  create = async (req, res) => this.handleRequest(async () => res.status(201).json(await this.service.create(req.body)), req, res);
  update = async (req, res) => this.handleRequest(async () => res.json(await this.service.update(req.params.id, req.body)), req, res);
  delete = async (req, res) => this.handleRequest(async () => res.json(await this.service.delete(req.params.id)), req, res);
}
module.exports = { BaseController };
