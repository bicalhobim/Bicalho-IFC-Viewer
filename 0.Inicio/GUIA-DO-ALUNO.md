# 👋 Guia do Aluno — do zero ao visualizador IFC rodando

Bem-vindo! Este guia foi feito para quem **nunca programou** e **nunca abriu um
terminal**. Você **não precisa** ter nada instalado e **não precisa** entender
código. É só seguir os passos, na ordem.

No final, você terá:
- O ambiente da disciplina instalado (Python + Node.js + bibliotecas BIM);
- O **visualizador de modelos IFC** do projeto rodando no seu navegador.

> 🧭 **Esta pasta (`0.Inicio`) é o ponto de partida.** Os arquivos aqui se
> complementam, nesta ordem:
>
> | Arquivo | Para que serve | Quando usar |
> |---|---|---|
> | **GUIA-DO-ALUNO.md** | Este guia, o passo a passo geral | Agora, do começo ao fim |
> | **PROMPT-INSTALACAO.md** | Prompt pronto que a IA executa para instalar o ambiente | Na Etapa 2 |
> | **requirements.txt** | Lista das bibliotecas Python da disciplina | A IA usa sozinha |
> | **README.md** | Visão geral técnica do projeto e do visualizador | Na Etapa 3 e como referência |

---

## O que vamos instalar (e por quê)

Você não precisa decorar isto — é só para entender o que está acontecendo:

| O que | Para que serve |
|---|---|
| **Assistente de IA** (OpenCode) | O programa que escreve e roda código conversando com você em português |
| **Node.js** | Faz funcionar o **visualizador IFC** do projeto (que roda no navegador) |
| **Python** | Faz funcionar os exercícios da disciplina (ler arquivos IFC e planilhas) |
| **Bibliotecas BIM** | Permitem ler arquivos IFC e planilhas Excel da obra com Python |

São **três etapas**:

1. **Etapa 1 — Instalar o assistente de IA** (só cliques, sem terminal)
2. **Etapa 2 — Pedir para a IA instalar o ambiente** (Python, Node.js e bibliotecas, com um prompt pronto)
3. **Etapa 3 — Rodar o visualizador IFC** (também pela IA, com um prompt pronto)

---

# ETAPA 1: Instalar o assistente de IA (só cliques)

Esta parte é igual a instalar o Chrome ou o WhatsApp. Sem terminal.

Vamos usar o **OpenCode** (gratuito e simples). Se você já usa outro assistente de
IA com acesso ao computador — como **Claude Code** ou **Cursor** — também serve;
neste caso, pule para a Etapa 2.

### Windows
1. Acesse: **opencode.ai/download**
2. Baixe o arquivo que termina em **windows-x64.exe**
3. Dê dois cliques no arquivo baixado
4. Siga a instalação (Avançar, Avançar, Concluir)

### Mac
1. Acesse: **opencode.ai/download**
2. Baixe o arquivo **.dmg** (escolha "Apple Silicon" se seu Mac for de 2021 pra
   frente, ou "Intel" se for mais antigo)
3. Dê dois cliques e arraste o OpenCode para a pasta Aplicativos

Pronto, o assistente está instalado. Agora falta o ambiente que faz o código dele
funcionar.

---

# ETAPA 2: Instalar Python, Node.js e bibliotecas BIM (pela IA)

Aqui você **não** vai baixar nada nem rodar instaladores manualmente. O próprio
assistente faz tudo para você.

## Passo a passo

1. Pegue a **pasta do projeto compartilhada pelo professor** (a pasta `07.bim_ai`,
   que contém as pastas `0.Inicio` e `3.viewer`) e salve no seu computador — por
   exemplo, na Área de Trabalho.
2. Abra o **OpenCode**.
3. No OpenCode, vá em **File > Open Folder** e selecione a pasta **`07.bim_ai`**
   (a pasta do projeto inteira — não uma pasta vazia).
4. Na caixa de texto do OpenCode, escreva em português:

   > Leia o arquivo `0.Inicio/PROMPT-INSTALACAO.md` e siga todas as instruções.

5. A IA vai ler o prompt e começar a instalar tudo. Ela pode pedir sua
   **permissão** para executar comandos — você deve **permitir**.
6. **Aguarde.** A instalação pode levar de 5 a 15 minutos.
7. Quando a IA disser que terminou, feche e abra o OpenCode novamente.

> 💡 O arquivo `PROMPT-INSTALACAO.md` **já está dentro da pasta `0.Inicio`** do
> projeto. Você não precisa copiá-lo para lugar nenhum — só apontar a IA para ele,
> como no passo 4.

Pronto. O ambiente está configurado dentro da pasta do projeto.

---

# ETAPA 3: Rodar o visualizador IFC (pela IA)

Agora vem a parte legal: abrir o **visualizador de modelos IFC** do projeto no seu
navegador. O código dele está na pasta **`3.viewer`**.

1. Com a pasta `07.bim_ai` ainda aberta no OpenCode, escreva na caixa de texto:

   > Configure e inicie o visualizador IFC: entre na pasta `3.viewer`, rode
   > `npm install` e depois `npm run dev`. Me avise quando estiver no ar.

2. Permita os comandos quando a IA pedir e **aguarde** (a primeira vez baixa as
   dependências e pode demorar alguns minutos).
3. Quando terminar, abra o navegador em **http://localhost:3000**.
4. Arraste um arquivo **`.ifc`** para a tela (ou use o botão
   **"Carregar arquivo IFC"**) e navegue pelo modelo em 3D.

> 📖 Quer entender melhor o visualizador, os comandos disponíveis e a solução para
> erros conhecidos (por exemplo, mensagens sobre **WebAssembly / `.wasm`**)?
> Está tudo no [**README.md**](README.md) desta mesma pasta — inclusive um prompt
> pronto para a IA instalar e rodar o visualizador.

---

# Como saber se deu certo

No final de cada etapa, o próprio assistente mostra uma mensagem de sucesso ou erro.

- **Etapa 2 (ambiente):** faça o **primeiro teste** abaixo.
- **Etapa 3 (visualizador):** se o navegador abrir em `http://localhost:3000` e
  você conseguir carregar um arquivo `.ifc`, está funcionando.

Se algo falhar, tire um **print da tela inteira** (da conversa com a IA) e mande
para o professor.

---

# Primeiro teste do ambiente (opcional, mas legal de fazer)

1. Abra o **OpenCode** com a pasta do projeto aberta.
2. Na caixa de texto, escreva em português mesmo:

   > Crie um arquivo Python que escreve "Olá, obra!" na tela e execute.

3. A IA vai criar o código, pedir sua permissão e rodar.
4. Se aparecer **Olá, obra!**, seu ambiente Python está 100% funcionando.

---

# Perguntas comuns

**Preciso saber programar?**
Não. A IA escreve o código. Você conversa em português.

**É seguro? Vai mexer no meu computador?**
Sim, é seguro. Ela instala apenas as ferramentas da lista acima — as mesmas que
milhões de programadores usam.

**Preciso instalar o Python e o Node.js na mão?**
Não. A IA instala tudo na Etapa 2, a partir do `PROMPT-INSTALACAO.md`. O único
pré-requisito do visualizador é o Node.js, e ele também é instalado nessa etapa.

**Posso fazer no celular ou tablet?**
Não. Precisa ser um computador Windows ou Mac.

**Travou no meio. E agora?**
Feche o OpenCode e abra de novo. Depois cole o mesmo pedido de novo. A IA continua
de onde parou.

**Quanto tempo leva?**
Entre 5 e 15 minutos a Etapa 2, na primeira vez, dependendo da internet. A Etapa 3
leva mais alguns minutos no primeiro `npm install`.

**Apareceu uma tela preta cheia de texto no OpenCode. É normal?**
Sim. A IA está executando os comandos de instalação. Só aguarde até ela dizer que
terminou.

**O visualizador abriu, mas deu um erro sobre "WebAssembly" ou ".wasm".**
Peça à IA: "rode `npm run copy-wasm` dentro de `3.viewer` e reinicie com
`npm run dev`". A explicação completa está no [README.md](README.md).

---

# Resumo em uma linha

1. Instala o app OpenCode (cliques) → 2. Abre a pasta `07.bim_ai` no OpenCode e
pede para ler o `0.Inicio/PROMPT-INSTALACAO.md` → 3. Pede para iniciar o
visualizador em `3.viewer` → 4. Abre `http://localhost:3000` e carrega um `.ifc`.
Pronto para a aula.
