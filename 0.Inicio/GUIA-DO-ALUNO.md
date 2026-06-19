# Guia de Instalacao do Ambiente (OpenCode + Python + JavaScript)

Bem-vindo. Este guia foi feito para quem **nunca programou** e **nunca abriu um terminal**. Voce nao precisa entender nada de codigo. So seguir os passos.

No final, seu computador estara pronto para a aula de IA e BIM.

---

## O que vamos instalar (e por que)

Voce nao precisa decorar isto, e so para entender:

| O que | Para que serve |
|---|---|
| **OpenCode** | O assistente de IA que escreve codigo conversando com voce |
| **Node.js** | Faz funcionar o codigo em JavaScript que o assistente cria |
| **Python** | Faz funcionar o codigo em Python (usado para ler arquivos BIM e planilhas) |
| **Bibliotecas de BIM** | Permitem ler arquivos IFC e planilhas Excel da obra |

Sao duas etapas:
- **Etapa 1:** Instalar o app do OpenCode (so cliques, sem terminal)
- **Etapa 2:** Pedir para o OpenCode instalar Python, Node.js e as bibliotecas BIM (usando um prompt ja pronto)

---

# ETAPA 1: Instalar o OpenCode (so cliques)

Esta parte e igual instalar o Chrome ou o WhatsApp. Sem terminal.

### Windows
1. Acesse: **opencode.ai/download**
2. Baixe o arquivo que termina em **windows-x64.exe**
3. De dois cliques no arquivo baixado
4. Siga a instalacao (Avancar, Avancar, Concluir)

### Mac
1. Acesse: **opencode.ai/download**
2. Baixe o arquivo **.dmg** (escolha "Apple Silicon" se seu Mac for de 2021 pra frente, ou "Intel" se for mais antigo)
3. De dois cliques e arraste o OpenCode para a pasta Aplicativos

Pronto, o assistente esta instalado. Agora falta o ambiente que faz o codigo dele funcionar.

---

# ETAPA 2: Instalar Python, Node.js e bibliotecas BIM (pelo OpenCode)

Aqui voce nao vai baixar nada nem rodar instaladores. O proprio OpenCode vai fazer tudo para voce.

## Passo a passo

1. Abra o **OpenCode** que voce instalou na Etapa 1
2. Crie uma **nova pasta no seu computador** para guardar os arquivos do projeto (ex: `C:\aula-bim` ou na sua Area de Trabalho)
3. No OpenCode, va em **File > Open Folder** e selecione a pasta que voce criou
4. Na **pasta compartilhada pelo professor**, encontre o arquivo **PROMPT-INSTALACAO.md**
5. **Copie** esse arquivo para dentro da pasta do seu projeto (arrastando ou copiando e colando)
6. Volte no OpenCode. Na caixa de texto, escreva em portugues:

   > Leia o arquivo PROMPT-INSTALACAO.md e siga todas as instrucoes

7. O OpenCode vai ler o prompt e comecar a instalar tudo. Ele pode pedir sua **permissao** para executar comandos — voce deve permitir.
8. **Aguarde**. A instalacao pode levar de 5 a 15 minutos.
9. Quando o OpenCode disser que terminou, feche e abra o OpenCode novamente.

Pronto. O ambiente esta configurado dentro da sua pasta de projeto.

---

# Como saber se deu certo

No final, o proprio OpenCode mostra uma mensagem de sucesso ou erro.

Para ter certeza de que tudo funcionou, faca o **teste abaixo**.

Se algo falhar, tire um **print da tela inteira** (da conversa com o OpenCode) e mande para o professor.

---

# Primeiro teste (opcional, mas legal de fazer)

1. Abra o **OpenCode** com a pasta do projeto aberta
2. Na caixa de texto, escreva em portugues mesmo:

   > Crie um arquivo Python que escreve "Ola, obra!" na tela e execute

3. O assistente vai criar o codigo, pedir sua permissao e rodar
4. Se aparecer **Ola, obra!**, seu ambiente esta 100 por cento funcionando

---

# Perguntas comuns

**Preciso saber programar?**
Nao. O OpenCode escreve o codigo. Voce conversa em portugues.

**E seguro? Vai mexer no meu computador?**
Sim, e seguro. Ele instala apenas as ferramentas da lista acima, as mesmas que milhoes de programadores usam.

**Posso fazer no celular ou tablet?**
Nao. Precisa ser um computador Windows ou Mac.

**Travou no meio. E agora?**
Feche o OpenCode e abra de novo. Depois cole o mesmo prompt de novo. Ele continua de onde parou.

**Quanto tempo leva?**
Entre 5 e 15 minutos na primeira vez, dependendo da internet.

**Apareceu uma tela preta cheia de texto no OpenCode. E normal?**
Sim. O OpenCode esta executando os comandos de instalacao. So aguarde ate ele dizer que terminou.

**Preciso copiar o PROMPT-INSTALACAO.md para a pasta?**
Sim. O arquivo precisa estar dentro da pasta do projeto para o OpenCode le-lo.

---

# Resumo em uma linha

1. Instala o app OpenCode (cliques) -> 2. Abre a pasta de projeto no OpenCode -> 3. Copia o PROMPT-INSTALACAO.md para la -> 4. Pede pro OpenCode seguir o prompt -> 5. Pronto para a aula.
