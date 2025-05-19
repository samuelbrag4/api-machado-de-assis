import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const existing = await UserModel.findByEmail(email);
      if (existing) return res.status(400).json({ error: "E-mail já cadastrado" });

      const hash = await bcrypt.hash(password, 10);
      const user = await UserModel.create({ name, email, password: hash });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const data = {};
      if (name) data.name = name;
      if (email) data.email = email;
      if (password) data.password = await bcrypt.hash(password, 10);

      const user = await UserModel.update(id, data);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await UserModel.delete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover usuário" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Credenciais inválidas" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

export default new UserController();