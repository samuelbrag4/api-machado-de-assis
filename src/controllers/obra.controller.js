import ObraModel from "../models/obraModel.js";

class ObraController {
  async getAll(req, res) {
    try {
      const obras = await ObraModel.findAll();
      res.json(obras);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar obras" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const obra = await ObraModel.findById(id);
      if (!obra) return res.status(404).json({ error: "Obra não encontrada" });
      res.json(obra);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar obra" });
    }
  }

  async create(req, res) {
    try {
      const { titulo, descricao, anoPublicacao, autor } = req.body;
      if (!titulo || !descricao || !anoPublicacao) {
        return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
      }
      const userId = req.userId; // Vem do authMiddleware
      const obra = await ObraModel.create({
        titulo,
        descricao,
        anoPublicacao: Number(anoPublicacao),
        autor: autor || "Machado de Assis",
        userId
      });
      res.status(201).json(obra);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar obra" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao, anoPublicacao, autor } = req.body;
      const obra = await ObraModel.update(id, {
        titulo,
        descricao,
        anoPublicacao: Number(anoPublicacao),
        autor
      });
      res.json(obra);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar obra" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ObraModel.delete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover obra" });
    }
  }
}

export default new ObraController();