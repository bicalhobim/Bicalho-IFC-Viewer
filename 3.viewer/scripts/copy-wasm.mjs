// =============================================================================
// copy-wasm.mjs
// -----------------------------------------------------------------------------
// O visualizador IFC usa a biblioteca "web-ifc", que precisa de arquivos .wasm
// (WebAssembly) para ler arquivos IFC dentro do navegador.
//
// Estes arquivos vivem dentro de node_modules/web-ifc (criado pelo "npm install").
// Este script os copia para a pasta public/, de onde o Vite os serve na raiz do
// site (ex.: http://localhost:3000/web-ifc.wasm).
//
// Por que isso importa: sem os .wasm servidos localmente, o navegador tenta
// baixa-los de um endereco que devolve HTML, e o carregamento do IFC quebra com
// o erro "WebAssembly.instantiate(): Import #0 'a': module is not an object or
// function". Este script garante que isso nao aconteca.
//
// Ele roda automaticamente antes de "npm run dev" e "npm run build" (veja os
// scripts "predev" e "prebuild" no package.json). Voce nao precisa rodar manualmente.
// =============================================================================

import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const wasmSourceDir = join(projectRoot, "node_modules", "web-ifc");
const publicDir = join(projectRoot, "public");

// Arquivos necessarios. O navegador escolhe entre a versao single-thread
// (web-ifc.wasm) e a multi-thread (web-ifc-mt.wasm) conforme o ambiente.
const files = ["web-ifc.wasm", "web-ifc-mt.wasm"];

if (!existsSync(wasmSourceDir)) {
  console.error(
    "\n[copy-wasm] ERRO: pasta node_modules/web-ifc nao encontrada.\n" +
      "           Rode 'npm install' antes de iniciar o projeto.\n"
  );
  process.exit(1);
}

mkdirSync(publicDir, { recursive: true });

let copied = 0;
for (const file of files) {
  const src = join(wasmSourceDir, file);
  const dest = join(publicDir, file);
  if (existsSync(src)) {
    copyFileSync(src, dest);
    copied++;
  }
}

console.log(`[copy-wasm] ${copied} arquivo(s) .wasm copiado(s) para public/`);
