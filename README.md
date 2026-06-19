<div align="center">

# 🏗️ Bicalho IFC Viewer

**Visualizador de modelos IFC (BIM) que roda no navegador.**
Abra um arquivo `.ifc`, navegue em 3D, clique nos elementos e inspecione as propriedades.

Projeto da Pós-graduação em **BIM + Inteligência Artificial**.

[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r182-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![ThatOpen](https://img.shields.io/badge/ThatOpen-Components-BCF124)](https://thatopen.com/)

</div>

---

## 👋 Você nunca programou?

Sem problema — **este projeto foi pensado para iniciantes**. Você não precisa ter
nada instalado. Comece pelo guia passo a passo, que instala tudo do zero:

### ➡️ **[Abrir o Guia do Aluno](0.Inicio/GUIA-DO-ALUNO.md)**

Lá você instala o assistente de IA, configura o ambiente (Python + Node.js) e
coloca o visualizador no ar — tudo conversando em português, sem decorar comandos.

---

## ⚡ Início rápido (para quem já tem Node.js)

```bash
cd 3.viewer
npm install
npm run dev
```

O navegador abre sozinho em **http://localhost:3000**. Arraste um arquivo `.ifc`
para a tela ou clique em **"Carregar arquivo IFC"**.

> O **Node.js** (versão LTS) é o único pré-requisito do visualizador.
> Tudo o mais é instalado pelo `npm install`.

---

## ✨ Funcionalidades

- 🧭 **Navegação 3D** fluida com órbita, zoom e enquadramento automático
- 🌳 **Árvore espacial** do modelo (Terreno → Edifício → Pavimento → Elemento)
- 🖱️ **Seleção por clique** com destaque do elemento
- 📋 **Painel de propriedades** do objeto selecionado
- 📥 **Carregar IFC** por botão ou arrastar-e-soltar
- 🔌 **100% no navegador** — leitura de IFC via WebAssembly, sem servidor próprio

---

## 📁 Estrutura do repositório

```
Bicalho-IFC-Viewer/
├── 0.Inicio/              👋 COMECE AQUI — onboarding do aluno
│   ├── GUIA-DO-ALUNO.md       guia passo a passo (instala tudo do zero)
│   ├── PROMPT-INSTALACAO.md    prompt pronto p/ a IA configurar o ambiente
│   ├── README.md              visão geral técnica detalhada
│   └── requirements.txt        bibliotecas Python da disciplina
│
├── 3.viewer/             ⭐ O CÓDIGO DO PROJETO (o visualizador IFC)
│   ├── src/main.ts            toda a lógica do visualizador
│   ├── index.html             página inicial
│   └── package.json           dependências e comandos (npm)
│
├── 1.entradas_usuario/   documentos de referência BIM (Termo de Referência, BEP)
└── .gitignore            define o que NÃO entra no Git
```

> 📖 A documentação técnica completa (dependências, comandos, deploy e solução de
> problemas conhecidos) está em **[`0.Inicio/README.md`](0.Inicio/README.md)**.

---

## 🛠️ Tecnologias

| Camada | Ferramenta |
|---|---|
| Motor BIM | [ThatOpen Components](https://thatopen.com/) |
| Leitura de IFC | [web-ifc](https://github.com/ThatOpen/engine_web-ifc) (WebAssembly) |
| Renderização 3D | [Three.js](https://threejs.org/) |
| Build / Dev server | [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) |

---

## 🚀 Publicar (deploy)

O visualizador é um **site estático** — não precisa de servidor próprio:

```bash
cd 3.viewer
npm install
npm run build      # gera a pasta dist/ (já com os arquivos .wasm)
```

Suba o conteúdo de `3.viewer/dist/` para Netlify, Vercel, GitHub Pages, etc.

---

<div align="center">

Desenvolvido para a disciplina de **BIM + Inteligência Artificial** ·
[Bicalho Engenharia](https://github.com/bicalhobim)

</div>
