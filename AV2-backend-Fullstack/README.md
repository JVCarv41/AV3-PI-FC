# AV2.1-Fullstack - Backend

Este é o repositório do backend do projeto **AV2.1-Fullstack**, desenvolvido como parte das atividades da disciplina de Desenvolvimento Full Stack na **Universidade SENAI Cimatec**.

## Demonstrações em Vídeo

* [Demonstração 1](https://youtu.be/0ENZEgI6nmA)
* [Demonstração 2](https://youtu.be/5WEL5PDFwto)

## Tecnologias Utilizadas

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
* [Vercel](https://vercel.com/) (para deploy)

## Estrutura do Projeto

```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env.example
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

## Instalação e Execução Local

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/JVCarv41/AV2-backend-Fullstack.git
   cd AV2-backend-Fullstack
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   * Renomeie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.
   * Escolha entre uma aplicação local ou em cloud do banco de dados MongoDB
   * Link para interface frontend para o servidor: https://github.com/JVCarv41/AV2-Fullstack-Frontend

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

   O backend estará disponível em `http://localhost:3000` (ou na porta definida no seu arquivo `.env`).

## Deploy

A aplicação está implantada na Vercel e pode ser acessada através do seguinte link:
 [https://av-2-1-fullstack.vercel.app](https://av-2-1-fullstack.vercel.app)

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
