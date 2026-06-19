# 3.viewer — Visualizador IFC

Aplicação web que carrega e exibe modelos **IFC** em 3D no navegador, construída
com ThatOpen Components, web-ifc, Three.js e Vite.

> Documentação completa do projeto (visão geral, estrutura, deploy e o prompt para
> agentes de IA) está no `README.md` da **pasta raiz** do repositório.

## Pré-requisito
- **Node.js** LTS — <https://nodejs.org/>

## Como rodar
```bash
npm install      # baixa as dependências (primeira vez)
npm run dev      # abre o visualizador em http://localhost:3000
```
Arraste um arquivo `.ifc` para a tela ou use o botão **"Carregar arquivo IFC"**.

## Comandos
| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (http://localhost:3000) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build |
| `npm run copy-wasm` | Recopia os `.wasm` do web-ifc para `public/` |

## Estrutura
```
3.viewer/
├── src/main.ts            # toda a lógica do visualizador
├── index.html             # página inicial + estilos
├── scripts/copy-wasm.mjs  # copia os WASM do web-ifc (roda antes de dev/build)
├── public/                # arquivos servidos na raiz (WASM gerado aqui)
├── package.json           # dependências e comandos
├── vite.config.ts         # config do Vite (porta 3000)
└── tsconfig.json          # config do TypeScript
```

## Sobre os arquivos WASM
O `web-ifc` lê arquivos IFC usando WebAssembly (`web-ifc.wasm` / `web-ifc-mt.wasm`).
O script `scripts/copy-wasm.mjs` os copia de `node_modules/web-ifc` para `public/`
automaticamente antes de `dev` e `build`. O `src/main.ts` os carrega localmente
(`autoSetWasm: false`, `wasm.path = "/"`), evitando o erro
`WebAssembly.instantiate(): ... module is not an object or function`.
