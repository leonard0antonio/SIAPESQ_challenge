# 🌿 SIAPESQ - Sistema Integrado de Pesquisa e Fauna Silvestre

> Uma plataforma tecnológica focada no mapeamento geográfico, análise de dados e monitoramento da biodiversidade brasileira.

O **SIAPESQ** é uma aplicação web moderna projetada para auxiliar investigadores, biólogos e instituições ambientais a registarem e analisarem ocorrências de animais silvestres. Com uma interface orgânica e transições fluidas, o sistema transforma dados brutos em ferramentas práticas de conservação.

---

## 🌐 Deploy e Status do Servidor

A aplicação está disponível online, com o frontend hospedado na **Vercel** e o backend hospedado no **Render.com**.

> **⚠️ Aviso Importante:** Como a API está hospedada num plano gratuito (Serverless/Free Tier), o servidor entra em modo de suspensão ("sleep") após um período de inatividade para poupar recursos. 
> 
> O primeiro acesso ao sistema pode demorar até 50 segundos para "acordar" o servidor ou até mesmo lançar um erro inicial. **Caso os dados não carreguem de imediato, aguarde alguns instantes e recarregue a página.** Assim que o servidor despertar, a navegação voltará a ser rápida e fluida.

---

## ✨ Principais Funcionalidades

- **Catálogo Inteligente:** Listagem de espécies com sistema de busca tolerante a acentos e filtros por categoria.
- **Dashboard Analítico:** Gráficos interativos (Barras e Pizza) para visualização rápida de métricas populacionais e distribuição regional.
- **Mapeamento Georreferenciado:** Mapa interativo com agrupamento inteligente de marcadores. Popups dinâmicos que listam múltiplas espécies registadas nas mesmas coordenadas.
- **Registo Avançado:** - Integração com a API do **IBGE** para autocompletar Cidades e Estados.
  - Integração com **OpenStreetMap (Nominatim)** para conversão automática de endereço em coordenadas (Latitude/Longitude).
- **UI/UX Premium:** Design focado no utilizador com Glassmorphism, paleta de cores institucional (Emerald), feedback visual (Toasts) e transições de página (Page Transitions) usando Framer Motion.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído num ecossistema JavaScript/TypeScript atualizado:

- **Frontend:** React 18 + TypeScript + Vite
- **Roteamento:** React Router DOM v6
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Mapas:** Leaflet + React Leaflet
- **Gráficos:** Recharts
- **Integração de APIs:** Axios / Fetch API nativo
- **Backend (Mock API):** JSON-Server

---

## 🚀 Como Rodar o Projeto Localmente

Para executar esta aplicação na sua máquina, precisará de ter o [Node.js](https://nodejs.org/) instalado. 
Como o projeto utiliza uma Fake API (`json-server`) para simular o banco de dados, será necessário rodar **dois terminais** em simultâneo.

### Passo 1: Clonar e Instalar Dependências

Abra o seu terminal e execute:

```bash
# Clone este repositório
git clone [https://github.com/leonard0antonio/SIAPESQ_challenge](https://github.com/leonard0antonio/SIAPESQ_challenge)

# Entre na pasta do projeto
cd siapesq

# Instale as dependências
npm install
```

### Passo 2: Alterar a API para Ambiente Local

Como o código está configurado para o ambiente de produção, é necessário apontar o Axios para o seu servidor local.

Abra o ficheiro **`src/services/api.ts`** e altere a `baseURL`:

```typescript
import axios from 'axios';

export const api = axios.create({
  // baseURL: '[https://siapesq-api.onrender.com](https://siapesq-api.onrender.com)', <-- Comente ou apague a URL de produção
  baseURL: 'http://localhost:3000', // <-- Adicione a URL local
});
```

### Passo 3: Iniciar o Banco de Dados (API Mock)

Abra um terminal na pasta raiz do projeto e inicie o JSON-Server. Ele vai monitorar o ficheiro `db.json` e criar as rotas da API na porta 3000.

```bash
npx json-server --watch db.json --port 3000
```
*(Certifique-se de que o terminal indica que o servidor está a rodar em `http://localhost:3000`)*

### Passo 4: Iniciar o Frontend (Vite)

Abra um **novo terminal** (mantendo o do JSON-Server aberto) na mesma pasta do projeto e inicie a aplicação React:

```bash
npm run dev
```

A aplicação estará disponível no seu navegador, tipicamente em: `http://localhost:5173`.

---

## 📁 Estrutura de Pastas (Clean Code)

A arquitetura do projeto foi pensada para ser escalável, dividindo responsabilidades entre lógicas de página e componentes visuais de apresentação:

```text
src/
 |
 ├── pages/
 │    ├── Landing/         # Tela de Apresentação Institucional
 │    ├── home/            # Catálogo Principal e Menu de Navegação
 │    └── register/        # Formulário de Cadastro e Edição (dividido em subcomponentes lógicos)
 ├── services/             # Configuração do Axios (api.ts)
 ├── types/                # Interfaces TypeScript (species.ts)
 └── App.tsx               # Orquestração de Rotas e Layout
```

---

## 🤝 Autor

Desenvolvido com dedicação técnica e foco em código limpo por **Leonardo**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leonardo-a-a063b519b/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/leonard0antonio)
