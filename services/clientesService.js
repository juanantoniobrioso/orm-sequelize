// services/clientesService.js
const { sequelize } = require("../config/db.js");

class ClientesService {
  
  get model() {
    // Busca el modelo justo cuando se necesita, asegurando que ya esté cargado
    return sequelize.models.clientes || sequelize.models.Clientes;
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
module.exports = { ClientesService };
