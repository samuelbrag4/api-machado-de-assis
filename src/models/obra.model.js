import prisma from "../../prisma/prisma.js";

class ObraModel {
  async findAll() {
    return prisma.obra.findMany({ include: { user: true } });
  }

  async findById(id) {
    return prisma.obra.findUnique({
      where: { id: Number(id) },
      include: { user: true }
    });
  }

  async create(data) {
    return prisma.obra.create({ data });
  }

  async update(id, data) {
    return prisma.obra.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    await prisma.obra.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new ObraModel();