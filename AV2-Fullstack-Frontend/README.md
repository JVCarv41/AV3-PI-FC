# AV2 Fullstack - Frontend

Este é o frontend do projeto **AV2 Fullstack**, desenvolvido como parte das atividades da disciplina de Desenvolvimento Fullstack. A aplicação foi construída utilizando **React** com **Vite** para proporcionar uma experiência de desenvolvimento rápida e moderna.

Vídeo demonstrativo do projeto: https://youtu.be/WveRu-DuAhk
## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org/)
- [Vercel](https://vercel.com/) (para deploy)

## Estrutura do Projeto

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## Instalação e Execução Local

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/JVCarv41/AV2-Fullstack-Frontend.git
   cd AV2-Fullstack-Frontend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   - Renomeie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.
   - Escolha entre um link remoto ou o localhost para o servidor backend (garanta que o servidor backend e frontend estão hospedados em portas diferentes)
   - Link para o servidor backend dessa aplicação: https://github.com/JVCarv41/AV2-backend-Fullstack

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:5173`.

## Deploy

A aplicação está implantada na Vercel e pode ser acessada através do seguinte link:

 [https://av-2-fullstack-frontend.vercel.app](https://av-2-fullstack-frontend.vercel.app)

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.