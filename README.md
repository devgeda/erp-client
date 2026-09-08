# ERP Frontend (React + Fluent UI)

Este é o cliente Frontend do sistema ERP, desenvolvido para se conectar de forma dinâmica com a API backend construída em Java/Spring Boot. O projeto é focado em alta performance, tipagem rigorosa e produtividade, utilizando as ferramentas mais modernas do ecossistema React.

---

## 🛠️ Stack e Tecnologias

A arquitetura foi desenhada para ser escalável, robusta e fácil de manter:

*   **Core e Build:** React 19 executado via Vite 8, garantindo inicialização instantânea e builds ultrarrápidos.
*   **Interface (UI):** Fluent UI React Components (v9) e Icons da Microsoft, entregando componentes acessíveis e com visual corporativo limpo.
*   **Roteamento:** React Router DOM (v7) para o gerenciamento de rotas fluídas (SPA).
*   **Formulários:** React Hook Form perfeitamente integrado ao Zod para lidar com estados complexos e validações rígidas.
*   **Comunicação:** Axios gerenciando as chamadas HTTP para o backend em Spring Boot.
*   **Qualidade de Código:** TypeScript, ESLint e Prettier mantendo o código seguro e padronizado.

---

## 🚀 Como Executar Localmente

Para rodar o ambiente de desenvolvimento, o ideal é que o servidor da sua API Spring Boot já esteja ativo na porta configurada para receber as requisições.

1. Clone o repositório para a sua máquina local.
2. Abra o terminal navegando até a pasta raiz do front-end.
3. Instale todas as dependências rodando o comando `npm install`.
4. Inicie o servidor de desenvolvimento com o comando `npm run dev`.
5. Acesse a URL local fornecida pelo Vite no seu navegador.

---

## 📋 Comandos Úteis (Scripts)

Os scripts do projeto foram configurados para facilitar o ciclo de vida da aplicação.

| Comando | Ação Executada no Projeto |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local com Hot Module Replacement (HMR). |
| `npm run build` | Valida as tipagens (tsc) e gera o *bundle* otimizado para produção. |
| `npm run lint` | Executa o ESLint para procurar erros de sintaxe ou formatação. |