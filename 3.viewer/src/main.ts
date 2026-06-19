import * as THREE from "three";
import * as OBC from "@thatopen/components";
import * as OBCF from "@thatopen/components-front";
import * as FRAGS from "@thatopen/fragments";
import * as BUI from "@thatopen/ui";
import * as BUIC from "@thatopen/ui-obc";

// =============================================================================
// 1. Inicializar UI (registra todos os web components <bim-*>)
// =============================================================================
BUI.Manager.init();

// =============================================================================
// 2. Configurar Engine - Cena, Camera, Renderer
// =============================================================================
const components = new OBC.Components();

const worlds = components.get(OBC.Worlds);
const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();
world.name = "main";

// Viewport (container do canvas 3D)
const viewport = document.createElement("bim-viewport");

// Marca do visualizador no canto inferior esquerdo (substitui a logo da ThatOpen)
const brand = document.createElement("div");
brand.textContent = "Bicalho IFC Viewer";
brand.style.cssText = [
  "position: absolute",
  "left: 0.75rem",
  "bottom: 0.75rem",
  "font-family: system-ui, -apple-system, sans-serif",
  "font-weight: 600",
  "font-size: 0.95rem",
  "color: #1a3a5c",
  "pointer-events: none",
  "user-select: none",
  "opacity: 0.9",
  "z-index: 1",
].join("; ");
viewport.appendChild(brand);

// Cena com iluminacao adequada e fundo azul claro
const sceneComponent = new OBC.SimpleScene(components);
sceneComponent.setup({
  // Configura luzes automaticamente (ambient + directional) e define o fundo
  backgroundColor: new THREE.Color("#cfe8ff"), // azul claro
});
world.scene = sceneComponent;

// Renderer
const rendererComponent = new OBC.SimpleRenderer(components, viewport);
world.renderer = rendererComponent;
// Remove a marca d'agua "That Open Company" do canto do viewport
rendererComponent.showLogo = false;

// Camera
const cameraComponent = new OBC.SimpleCamera(components);
world.camera = cameraComponent;

// Responsividade
viewport.addEventListener("resize", () => {
  rendererComponent.resize();
  cameraComponent.updateAspect();
});

// Grid no chao
const grids = components.get(OBC.Grids);
grids.create(world);

// Iniciar loop de renderizacao
components.init();

// =============================================================================
// 3. Configurar carregamento de IFC
// =============================================================================
const ifcLoader = components.get(OBC.IfcLoader);
// Servimos o WASM do web-ifc localmente (pasta public/) em vez de baixar do unpkg
// em runtime. Isso evita o erro "WebAssembly.instantiate ... module is not an
// object or function" que ocorre quando o autoSetWasm nao consegue buscar o
// binario e o Vite acaba devolvendo o index.html no lugar do .wasm.
await ifcLoader.setup({
  autoSetWasm: false,
  wasm: {
    path: "/",
    absolute: true,
  },
});

// Fragments Manager (gerencia modelos carregados)
const workerUrl = await OBC.FragmentsManager.getWorker();
const fragments = components.get(OBC.FragmentsManager);
fragments.init(workerUrl);

// Quando um modelo e adicionado a lista, adiciona na cena
world.camera.controls.addEventListener("update", () => {
  fragments.core.update();
});

fragments.list.onItemSet.add(async ({ value: model }) => {
  model.useCamera(world.camera.three);
  world.scene.three.add(model.object);
  await fragments.core.update(true);
});

// Quando modelos sao limpos, atualiza a cena
fragments.list.onCleared.add(async () => {
  await fragments.core.update(true);
});

// =============================================================================
// 4. Highlighter (selecao de elementos com clique)
// =============================================================================
const highlighter = components.get(OBCF.Highlighter);
highlighter.setup({ world });
highlighter.zoomToSelection = true;

// =============================================================================
// 5. Funcao para carregar arquivo IFC via drag-and-drop ou input
// =============================================================================
async function loadIfcFile(file: File) {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.querySelector("p")!.textContent = `Carregando ${file.name}...`;
  }

  try {
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    const model = await ifcLoader.load(data, true, file.name);

    // Ajustar camera para enquadrar o modelo
    const box = new THREE.Box3().setFromObject(model.object);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    await world.camera.controls.fitToSphere(sphere, true);
  } catch (error) {
    console.error("Erro ao carregar IFC:", error);
    alert(`Erro ao carregar o arquivo IFC: ${error}`);
  } finally {
    if (overlay) overlay.classList.add("hidden");
  }
}

// =============================================================================
// 6. UI Components (usando @thatopen/ui-obc)
// =============================================================================

// --- Botao de carregar IFC ---
const [loadIfcBtn] = BUIC.buttons.loadIfc({ components });

// --- Tabela de modelos carregados ---
const [modelsList] = BUIC.tables.modelsList({
  components,
  metaDataTags: ["schema"],
  actions: { download: true },
});

// --- Arvore espacial (Site > Building > Floor > Element) ---
const [spatialTree] = BUIC.tables.spatialTree({
  components,
  models: [],
});
spatialTree.preserveStructureOnFilter = true;

// --- Tabela de propriedades do elemento selecionado ---
const [propertiesTable, updatePropertiesTable] = BUIC.tables.itemsData({
  components,
  modelIdMap: {},
});
propertiesTable.preserveStructureOnFilter = true;

// Atualizar propriedades quando um elemento e selecionado
highlighter.events.select.onHighlight.add((modelIdMap) => {
  updatePropertiesTable({ modelIdMap });
});

highlighter.events.select.onClear.add(() => {
  updatePropertiesTable({ modelIdMap: {} });
});

// =============================================================================
// 7. Construir paineis da interface
// =============================================================================

// Painel esquerdo: Modelos e Arvore Espacial
const leftPanel = BUI.Component.create(() => {
  return BUI.html`
    <bim-panel label="Modelos">
      <bim-panel-section label="Importar" icon="solar:import-bold">
        ${loadIfcBtn}
        <bim-button
          label="Carregar arquivo IFC"
          icon="solar:file-bold"
          @click=${() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".ifc";
            input.onchange = async () => {
              if (input.files?.length) {
                await loadIfcFile(input.files[0]);
              }
            };
            input.click();
          }}
        ></bim-button>
      </bim-panel-section>
      <bim-panel-section label="Modelos Carregados" icon="solar:list-bold">
        ${modelsList}
      </bim-panel-section>
      <bim-panel-section label="Arvore Espacial" icon="solar:folder-with-files-bold" collapsed>
        <bim-text-input
          placeholder="Buscar..."
          @input=${(e: Event) => {
            const input = e.target as HTMLInputElement;
            spatialTree.queryString = input.value;
          }}
        ></bim-text-input>
        ${spatialTree}
      </bim-panel-section>
    </bim-panel>
  `;
});

// Painel direito: Propriedades do elemento
const rightPanel = BUI.Component.create(() => {
  return BUI.html`
    <bim-panel label="Propriedades">
      <bim-panel-section label="Dados do Elemento" icon="solar:document-text-bold">
        <bim-label style="--bim-label--c: var(--bim-ui_bg-contrast-40)">
          Clique em um elemento para ver suas propriedades
        </bim-label>
        ${propertiesTable}
      </bim-panel-section>
    </bim-panel>
  `;
});

// Toolbar superior
const toolbar = BUI.Component.create(() => {
  return BUI.html`
    <bim-toolbar>
      <bim-toolbar-section label="Visualizacao">
        <bim-button
          label="Enquadrar Tudo"
          icon="solar:maximize-square-bold"
          @click=${async () => {
            const scene = world.scene.three;
            const box = new THREE.Box3().setFromObject(scene);
            if (!box.isEmpty()) {
              const sphere = new THREE.Sphere();
              box.getBoundingSphere(sphere);
              await world.camera.controls.fitToSphere(sphere, true);
            }
          }}
        ></bim-button>
        <bim-button
          label="Vista Superior"
          icon="solar:arrow-up-bold"
          @click=${async () => {
            const scene = world.scene.three;
            const box = new THREE.Box3().setFromObject(scene);
            if (!box.isEmpty()) {
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              await world.camera.controls.setLookAt(
                center.x, center.y + maxDim * 2, center.z,
                center.x, center.y, center.z,
                true
              );
            }
          }}
        ></bim-button>
        <bim-button
          label="Vista Frontal"
          icon="solar:arrow-right-bold"
          @click=${async () => {
            const scene = world.scene.three;
            const box = new THREE.Box3().setFromObject(scene);
            if (!box.isEmpty()) {
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              await world.camera.controls.setLookAt(
                center.x, center.y, center.z + maxDim * 2,
                center.x, center.y, center.z,
                true
              );
            }
          }}
        ></bim-button>
      </bim-toolbar-section>
      <bim-toolbar-section label="Painel">
        <bim-button
          label="Modelos"
          icon="solar:sidebar-minimalistic-bold"
          @click=${() => {
            const app = document.querySelector("bim-grid") as any;
            if (app) {
              app.layout = app.layout === "main" ? "no-left" : "main";
            }
          }}
        ></bim-button>
        <bim-button
          label="Propriedades"
          icon="solar:document-text-bold"
          @click=${() => {
            const app = document.querySelector("bim-grid") as any;
            if (app) {
              app.layout = app.layout === "no-right" ? "main" : "no-right";
            }
          }}
        ></bim-button>
      </bim-toolbar-section>
    </bim-toolbar>
  `;
});

// =============================================================================
// 8. Montar layout com bim-grid
// =============================================================================
const app = document.createElement("bim-grid") as BUI.Grid;
(app as any).layouts = {
  main: {
    template: `
      "toolbar toolbar toolbar" auto
      "leftPanel viewport rightPanel" 1fr
      / 20rem 1fr 22rem
    `,
    elements: {
      toolbar,
      leftPanel,
      viewport,
      rightPanel,
    },
  },
  "no-left": {
    template: `
      "toolbar toolbar" auto
      "viewport rightPanel" 1fr
      / 1fr 22rem
    `,
    elements: {
      toolbar,
      viewport,
      rightPanel,
    },
  },
  "no-right": {
    template: `
      "toolbar toolbar" auto
      "leftPanel viewport" 1fr
      / 20rem 1fr
    `,
    elements: {
      toolbar,
      leftPanel,
      viewport,
    },
  },
};
(app as any).layout = "main";
document.body.append(app);

// =============================================================================
// 9. Drag and Drop de arquivos IFC
// =============================================================================
viewport.addEventListener("dragover", (e) => {
  e.preventDefault();
  viewport.classList.add("drop-zone-active");
});

viewport.addEventListener("dragleave", () => {
  viewport.classList.remove("drop-zone-active");
});

viewport.addEventListener("drop", async (e) => {
  e.preventDefault();
  viewport.classList.remove("drop-zone-active");
  const files = e.dataTransfer?.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name.toLowerCase().endsWith(".ifc")) {
        await loadIfcFile(file);
      }
    }
  }
});

// =============================================================================
// 10. Esconder overlay de carregamento
// =============================================================================
const overlay = document.getElementById("loading-overlay");
if (overlay) overlay.classList.add("hidden");

console.log("BIM AI Viewer inicializado com sucesso!");
