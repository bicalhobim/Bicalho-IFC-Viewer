# Prompt de Instalacao do Ambiente

Siga as instrucoes abaixo para configurar o ambiente de desenvolvimento.

## 1. Verificar e instalar Python

- Verifique se o Python esta instalado (comando: `python --version`)
- Se nao estiver instalado, baixe e instale o Python 3.11 ou superior do site oficial (https://www.python.org/downloads/)
- No Windows, marque a opcao "Add Python to PATH" durante a instalacao

## 2. Verificar e instalar Node.js

- Verifique se o Node.js esta instalado (comando: `node --version`)
- Se nao estiver instalado, baixe e instale a versao LTS mais recente do site oficial (https://nodejs.org/)

## 3. Configurar o ambiente Python

- Crie um ambiente virtual Python dentro da pasta do projeto:
  ```
  python -m venv venv
  ```
- Ative o ambiente virtual:
  - Windows: `venv\Scripts\activate`
  - Mac/Linux: `source venv/bin/activate`
- Atualize o pip: `python -m pip install --upgrade pip`

## 4. Instalar bibliotecas BIM

Com o ambiente virtual ativado, instale:

```
pip install ifcopenshell
pip install openpyxl
pip install numpy
pip install matplotlib
```

## 5. Criar arquivo de requisitos

Crie um arquivo `requirements.txt` na raiz do projeto com o conteudo:

```
ifcopenshell
openpyxl
numpy
matplotlib
```

## 6. Verificar instalacao

Execute o comando abaixo para confirmar que tudo foi instalado corretamente:

```
python -c "import ifcopenshell; import openpyxl; import numpy; print('Tudo instalado com sucesso!')"
```

## 7. Informar o usuario

Quando terminar, avise o usuario que o ambiente esta pronto.
