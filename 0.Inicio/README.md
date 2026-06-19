# BIM AI — Visualizador IFC

Projeto da Pós-graduação em **BIM + Inteligência Artificial**.

> 📍 **Você está na pasta `0.Inicio`** — o ponto de partida do projeto. Se é a sua
> primeira vez aqui e você **nunca programou**, comece pelo
> [**GUIA-DO-ALUNO.md**](GUIA-DO-ALUNO.md): ele instala tudo do zero, passo a passo.
> Este README é a visão geral técnica do projeto.

Este repositório contém um **visualizador de modelos IFC** que roda no navegador:
você abre um arquivo `.ifc` (modelo BIM) e consegue navegar em 3D, clicar em
elementos, ver a árvore espacial (Terreno → Edifício → Pavimento → Elemento) e
inspecionar as propriedades de cada objeto.

O visualizador é construído com [ThatOpen Components](https://thatopen.com/) (o
motor BIM web), [web-ifc](https://github.com/ThatOpen/engine_web-ifc) (leitura de
IFC via WebAssembly), [Three.js](https://threejs.org/) (3D) e
[Vite](https://vitejs.dev/) (servidor de desenvolvimento).

> **Você não precisa saber programar.** A forma recomendada de instalar e rodar é
> pedindo ao seu agente de IA (OpenCode, Claude Code, Cursor, etc.) que faça isso
> por você. Há um **prompt pronto** no final deste documento — basta copiar e colar.

---

## ⚡ Início rápido (3 passos)

> Nunca programou? **Não comece por aqui** — vá para o
> [**GUIA-DO-ALUNO.md**](GUIA-DO-ALUNO.md), que instala tudo do zero. Os passos
> abaixo assumem que o Node.js já está instalado.

1. Instale o **Node.js** (versão LTS) em <https://nodejs.org/> — é o único pré-requisito.
2. Abra um terminal **dentro da pasta `3.viewer`** (ela fica na raiz do projeto,
   ao lado desta pasta `0.Inicio`) e rode:
   ```bash
   npm install
   npm run dev
   ```
3. O navegador abre sozinho em <http://localhost:3000>. Arraste um arquivo `.ifc`
   para a tela ou use o botão **"Carregar arquivo IFC"**.

Se preferir não usar o terminal, pule para a seção
[**🤖 Prompt para o agente de IA**](#-prompt-para-o-agente-de-ia).

---

## 📁 Estrutura do repositório

O que está **versionado no Git** (o código que funciona) e o que fica **só na sua
máquina** (arquivos pesados / gerados):

```
07.bim_ai/
├── .gitignore                 ← define o que NÃO entra no Git
│
├── 0.Inicio/                  ← 👋 COMECE AQUI — onboarding do aluno
│   ├── GUIA-DO-ALUNO.md       ← guia passo a passo (instala tudo do zero)
│   ├── PROMPT-INSTALACAO.md   ← prompt pronto p/ a IA configurar o ambiente
│   ├── README.md              ← este arquivo (visão geral técnica do projeto)
│   ├── requirements.txt       ← bibliotecas Python da disciplina
│   └── (Instalador .exe        — NÃO versionado, distribuído à parte)
│
├── 3.viewer/                  ← ⭐ O CÓDIGO DO PROJETO (o visualizador IFC)
│   ├── src/main.ts            ← toda a lógica do visualizador
│   ├── index.html             ← página inicial
│   ├── scripts/copy-wasm.mjs  ← copia os arquivos WASM do web-ifc
│   ├── package.json           ← dependências e comandos (npm)
│   ├── vite.config.ts         ← configuração do servidor de desenvolvimento
│   ├── tsconfig.json          ← configuração do TypeScript
│   ├── public/                ← arquivos servidos na raiz (WASM gerado aqui)
│   ├── node_modules/          ← (gerado por "npm install" — NÃO versionado)
│   └── dist/                  ← (gerado por "npm run build" — NÃO versionado)
│
├── BEP/                       ← documentos de referência BIM (Termo de Referência)
│
├── 2.engine_web-ifc-main/     ← código-fonte da engine web-ifc (referência — NÃO versionado)
├── venv/                      ← ambiente Python (NÃO versionado)
└── *.zip / *.exe              ← instaladores pesados (NÃO versionados)
```

> 💡 **Por que algumas pastas não vão para o Git?** `node_modules`, `venv`, `dist`,
> os `.zip` e a engine `2.engine_web-ifc-main` somam mais de **1 GB** e são
> reconstruídos automaticamente na instalação. Versionar apenas o código mantém o
> repositório leve e rápido de baixar. Veja o arquivo `.gitignore`.

---

## 🧩 Dependências

### Para rodar o visualizador (pasta `3.viewer`)
- **Node.js** LTS (inclui o `npm`) — <https://nodejs.org/>

Tudo o mais é instalado automaticamente pelo `npm install`. As principais
bibliotecas (definidas em `3.viewer/package.json`):

| Biblioteca | Para que serve |
|---|---|
| `@thatopen/components` | Motor BIM (cena 3D, carregamento de IFC, seleção) |
| `@thatopen/components-front` | Ferramentas de interface (destaque de elementos) |
| `@thatopen/fragments` | Conversão e gerenciamento dos modelos carregados |
| `@thatopen/ui` / `@thatopen/ui-obc` | Componentes de interface (painéis, tabelas, botões) |
| `web-ifc` | Leitura de arquivos IFC via WebAssembly |
| `three` | Renderização 3D |
| `vite` + `typescript` | Servidor de desenvolvimento e linguagem |

### Para os exercícios em Python (opcional, disciplina)
Definidas em `requirements.txt` (nesta mesma pasta): `ifcopenshell`, `openpyxl`,
`numpy`, `matplotlib`. Instaladas em um ambiente virtual (`venv`) — veja
`PROMPT-INSTALACAO.md`.

---

## 🛠️ Comandos disponíveis (na pasta `3.viewer`)

| Comando | O que faz |
|---|---|
| `npm install` | Baixa todas as dependências (primeira vez) |
| `npm run dev` | Inicia o visualizador em <http://localhost:3000> (modo desenvolvimento) |
| `npm run build` | Gera a versão final otimizada na pasta `dist/` |
| `npm run preview` | Pré-visualiza a versão de `dist/` |
| `npm run copy-wasm` | Recopia os arquivos WASM do web-ifc (roda sozinho antes de `dev`/`build`) |

---

## 🚀 Publicar (deploy)

Para colocar o visualizador online (Netlify, Vercel, GitHub Pages, etc.):

```bash
cd 3.viewer
npm install
npm run build      # gera a pasta dist/ (já inclui os arquivos .wasm)
```

Suba o **conteúdo da pasta `dist/`** para o serviço de hospedagem. Não é preciso
servidor próprio — é um site estático. Os arquivos `.wasm` são copiados para
`dist/` automaticamente durante o build.

---

## ❓ Problema conhecido (já resolvido) e por quê

Se em algum momento aparecer o erro:

> `Erro ao carregar o arquivo IFC: RuntimeError: Aborted(TypeError:
> WebAssembly.instantiate(): Import #0 "a": module is not an object or function)`

isso significa que os arquivos **`.wasm` do web-ifc** não foram encontrados pelo
navegador. O projeto já está configurado para evitar isso:

- O script `scripts/copy-wasm.mjs` copia os `.wasm` para `public/` automaticamente
  antes de `npm run dev` e `npm run build`.
- O `src/main.ts` carrega o WASM **localmente** (`wasm: { path: "/", absolute: true }`,
  com `autoSetWasm: false`), sem depender de baixá-lo da internet em tempo real.

Se o erro voltar, rode `npm run copy-wasm` dentro de `3.viewer` e reinicie o servidor.

---

## 🤖 Prompt para o agente de IA

Se você **não quer mexer no terminal**, copie o texto abaixo e cole no seu agente
de IA (OpenCode, Claude Code, Cursor, etc.) **com esta pasta do projeto aberta**.
Ele vai instalar e iniciar o visualizador para você.

> Você é meu assistente de configuração. Estou em um projeto de visualizador IFC
> (BIM) e não tenho experiência com programação. Faça o seguinte, explicando cada
> passo em português simples e pedindo minha permissão antes de executar comandos:
>
> 1. Verifique se o **Node.js** está instalado rodando `node --version`. Se não
>    estiver, me oriente a baixar a versão LTS em https://nodejs.org/ e aguarde
>    eu instalar.
> 2. Entre na pasta `3.viewer` do projeto.
> 3. Rode `npm install` para baixar as dependências (pode levar alguns minutos).
> 4. Rode `npm run dev` para iniciar o visualizador.
> 5. Me avise que devo abrir http://localhost:3000 no navegador e que posso
>    arrastar um arquivo `.ifc` para a tela ou usar o botão "Carregar arquivo IFC".
> 6. Se aparecer qualquer erro relacionado a "WebAssembly" ou ".wasm", rode
>    `npm run copy-wasm` dentro de `3.viewer` e reinicie com `npm run dev`.
>
> Não instale nada além do necessário para rodar este projeto. Ao final, confirme
> que o visualizador está funcionando.
