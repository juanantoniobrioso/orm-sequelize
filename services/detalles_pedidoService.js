// services/detalles_pedidoService.js
const { sequelize } = require("../config/db.js");

class Detalles_pedidoService {
  
  get model() {
    // Busca el modelo justo cuando se necesita, asegurando que ya esté cargado
    return sequelize.models.detalles_pedido || sequelize.models.Detalles_pedido;
  }

  async findAll() { return await this.model.findAll(); }
  async findById(id) { return await this.model.findByPk(id); }
  async create(data) { return await this.model.create(data); }
  async update(id, data) {
    const item = await this.findById(id);
    return item ? await item.update(data) : null;
  }
  async delete(id) {
    const item = await this.findById(id);
    if (!item) return null;
    await item.destroy();
    return true;
  }
}
module.exports = { Detalles_pedidoService };
