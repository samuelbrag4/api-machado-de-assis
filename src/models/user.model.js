import prisma from "../../prisma/prisma.js";

class UserModel {
  async findAll() {
    return prisma.user.findMany({ include: { obras: true } });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      include: { obras: true }
    });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data) {
    return prisma.user.create({ data });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    await prisma.user.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new UserModel();