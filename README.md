# MachadoDeAssis_API

API simples para gerenciamento das obras de Machado de Assis, com autenticação, rotas protegidas e manipulação de dados usando **Node.js**, **Express** e **Prisma ORM**.

Este guia cobre desde o setup inicial até autenticação, validações e testes via Postman.

---

## 📁 Estrutura do Projeto

```
MachadoDeAssis_API/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 Como iniciar o projeto do zero

1. **Criar pasta e inicializar o projeto**
    ```bash
    mkdir MachadoDeAssis_API
    cd MachadoDeAssis_API
    npm init -y
    ```

2. **Criar pastas e arquivo principal**
    ```bash
    mkdir -p src/{controllers,models,routes,middlewares}
    touch src/server.js
    ```

3. **Instalar dependências**
    ```bash
    npm install express cors dotenv jsonwebtoken bcryptjs prisma
    npm install --save-dev nodemon
    ```

4. **Configurar `package.json`**
    ```json
    "scripts": {
      "dev": "nodemon src/server.js"
    }
    ```

5. **Inicializar o Prisma**
    ```bash
    npx prisma init
    ```

6. **Configurar banco de dados no `.env`**
    ```ini
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="sua_chave_secreta_aqui"
    ```

7. **Criar schema do Prisma (`prisma/schema.prisma`)**
    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "sqlite"
      url      = env("DATABASE_URL")
    }

    model User {
      id        Int      @id @default(autoincrement())
      email     String   @unique
      password  String
      name      String
      createdAt DateTime @default(now())
    }

    model Obra {
      id        Int    @id @default(autoincrement())
      titulo    String
      ano       Int
      descricao String
      userId    Int
      user      User   @relation(fields: [userId], references: [id])
    }
    ```

8. **Rodar migração e gerar client Prisma**
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

---

## 💻 Estrutura dos Arquivos Principais

- `src/server.js`: Inicializa o Express, configura middleware e rotas.
- `src/controllers/`: Funções para lógica das rotas.
- `src/routes/`: Define endpoints.
- `src/models/`: Interações com o banco (ex: instância do Prisma).
- `src/middlewares/`: Middleware para autenticação, validações, etc.

---

## 🔑 Configuração CORS e dotenv no Express

```js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ...suas rotas aqui...

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```

---

## 🔐 Autenticação com JWT e bcryptjs

- **Cadastro:** Hash da senha com bcryptjs antes de salvar.
- **Login:** Valide a senha e gere um token JWT.
- **Rotas protegidas:** Middleware para verificar o token.

**Exemplo de middleware:**
```js
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
     if (err) return res.status(403).json({ error: 'Token inválido' });
     req.user = user;
     next();
  });
}
```

---

## ✅ Validações e Verificações

- Validar campos obrigatórios (email, senha, título, etc).
- Verificar se email já existe.
- Garantir senha com tamanho mínimo.
- Verificar autenticação nas rotas protegidas.
- Tratar erros do Prisma com try/catch.

---

## 📦 Usando o Prisma Client nos Models

**Exemplo (`src/models/user.model.js`):**
```js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createUser(data) {
  return await prisma.user.create({ data });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}
```

---

## 🛠 Testando API no Postman

### 1. **Login (POST)**
- **URL:** `http://localhost:3000/login`
- **Body (JSON):**
  ```json
  {
     "email": "usuario@exemplo.com",
     "password": "123456"
  }
  ```
- **Retorno:** token JWT.

### 2. **Requisição autenticada (ex: criar obra)**
- **URL:** `http://localhost:3000/obras`
- **Método:** POST
- **Headers:**
  ```
  Authorization: Bearer <seu_token_jwt_aqui>
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
     "titulo": "Dom Casmurro",
     "ano": 1899,
     "descricao": "Romance clássico brasileiro"
  }
  ```

---

## 📝 Dicas Finais

- Entenda o fluxo: cadastro → login → uso do token.
- Saiba instalar e configurar o Prisma.
- Pratique validações e tratamento de erros.
- Use middleware no Express.
- Teste rotas no Postman (atenção ao header Authorization).
- Use variáveis de ambiente para segredos.

Qualquer dúvida, só chamar! Bons estudos e boa prova! 🚀