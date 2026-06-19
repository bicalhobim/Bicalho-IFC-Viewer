#!/bin/bash

# ============================================================
# OpenCode Setup - macOS e Linux (Python + JavaScript)
# Instalacao do ZERO para aula de IA + BIM
# Arquivo .command: no Mac, da pra abrir com 2 cliques
# ============================================================

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'

if [[ "$OSTYPE" == "linux-gnu"* ]]; then OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then OS="macos"
else echo -e "${RED}Sistema nao suportado${NC}"; exit 1; fi

echo -e "${BLUE}"
echo "============================================================"
echo "   INSTALADOR OPENCODE - $(echo $OS | tr '[:lower:]' '[:upper:]')"
echo "   Ambiente Zero para Aula de IA e BIM"
echo "   (Python + JavaScript inclusos)"
echo "============================================================"
echo -e "${NC}"
echo "  Nao precisa digitar nada. So aguardar."
echo "  Pode levar de 10 a 20 minutos na primeira vez."
echo ""
read -p "  Pressione ENTER para comecar..." _

WORK_DIR="$HOME/OpenCode-Aula"
mkdir -p "$WORK_DIR"
echo -e "${GREEN}[OK]${NC} Pasta de trabalho: $WORK_DIR"

# ============================================================
# 1. Gerenciador de pacotes
# ============================================================
echo ""
echo -e "${BLUE}[1/6]${NC} Preparando gerenciador de instalacao..."
if [[ "$OS" == "macos" ]]; then
    if ! command -v brew &> /dev/null; then
        echo "      Instalando Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        # Garantir que o brew entre no PATH (Apple Silicon e Intel)
        [[ -x /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
        [[ -x /usr/local/bin/brew ]] && eval "$(/usr/local/bin/brew shellenv)"
        echo -e "      ${GREEN}[OK]${NC} Homebrew instalado"
    else
        echo -e "      ${GREEN}[OK]${NC} Homebrew ja instalado"
    fi
else
    sudo apt-get update -qq
    echo -e "      ${GREEN}[OK]${NC} apt-get pronto"
fi

# ============================================================
# 2. Node.js (JavaScript + npm)
# ============================================================
echo ""
echo -e "${BLUE}[2/6]${NC} Instalando Node.js (JavaScript)..."
if ! command -v node &> /dev/null; then
    if [[ "$OS" == "macos" ]]; then brew install node
    else curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs; fi
    echo -e "      ${GREEN}[OK]${NC} Node.js instalado"
else
    echo -e "      ${GREEN}[OK]${NC} Node.js ja instalado: $(node --version)"
fi

# ============================================================
# 3. Python
# ============================================================
echo ""
echo -e "${BLUE}[3/6]${NC} Instalando Python..."
if ! command -v python3 &> /dev/null; then
    if [[ "$OS" == "macos" ]]; then brew install python
    else sudo apt-get install -y python3 python3-pip python3-venv; fi
    echo -e "      ${GREEN}[OK]${NC} Python instalado"
else
    echo -e "      ${GREEN}[OK]${NC} Python ja instalado: $(python3 --version)"
fi

# ============================================================
# 4. Git (opcional)
# ============================================================
echo ""
echo -e "${BLUE}[4/6]${NC} Instalando Git..."
if ! command -v git &> /dev/null; then
    if [[ "$OS" == "macos" ]]; then brew install git; else sudo apt-get install -y git; fi
    echo -e "      ${GREEN}[OK]${NC} Git instalado"
else
    echo -e "      ${GREEN}[OK]${NC} Git ja instalado: $(git --version)"
fi

# ============================================================
# 5. Bibliotecas Python para BIM
# ============================================================
echo ""
echo -e "${BLUE}[5/6]${NC} Instalando bibliotecas Python para BIM..."
echo "      (pandas, openpyxl, ifcopenshell, requests)"
python3 -m pip install --upgrade pip --break-system-packages >/dev/null 2>&1 || python3 -m pip install --upgrade pip >/dev/null 2>&1
python3 -m pip install pandas openpyxl requests --break-system-packages 2>/dev/null || python3 -m pip install pandas openpyxl requests
python3 -m pip install ifcopenshell --break-system-packages 2>/dev/null || python3 -m pip install ifcopenshell 2>/dev/null
echo -e "      ${GREEN}[OK]${NC} Bibliotecas instaladas (ifcopenshell e opcional)"

# ============================================================
# 6. OpenCode
# ============================================================
echo ""
echo -e "${BLUE}[6/6]${NC} Instalando OpenCode..."
npm install -g opencode-ai@latest 2>/dev/null || sudo npm install -g opencode-ai@latest
echo -e "      ${GREEN}[OK]${NC} OpenCode instalado"

# ============================================================
# VALIDACAO
# ============================================================
echo ""
echo -e "${BLUE}============================================================"
echo "   CONFERINDO SE DEU TUDO CERTO"
echo "============================================================${NC}"
echo ""
ERROR_COUNT=0
check() {
    if command -v "$2" &> /dev/null; then
        echo -e "  ${GREEN}[OK]${NC} $1: $($2 --version 2>&1 | head -n1)"
    else
        echo -e "  ${RED}[FALHOU]${NC} $1 nao respondeu"
        ((ERROR_COUNT++))
    fi
}
check "Node.js (JavaScript)" node
check "Python" python3
check "pip (bibliotecas Python)" pip3
check "OpenCode (o agente)" opencode

echo ""
if [ $ERROR_COUNT -eq 0 ]; then
    echo -e "${GREEN}============================================================"
    echo "   TUDO PRONTO! INSTALACAO CONCLUIDA COM SUCESSO"
    echo "============================================================${NC}"
    echo ""
    echo "  Para usar:"
    echo "  1. Abra o app OpenCode (ou digite 'opencode' no terminal)"
    echo "  2. Trabalhe dentro da pasta: $WORK_DIR"
    echo ""
else
    echo -e "${RED}============================================================"
    echo "   ALGUNS ITENS FALHARAM ($ERROR_COUNT)"
    echo "============================================================${NC}"
    echo "  Tire um print desta tela e envie para o professor."
    echo ""
fi
read -p "  Pressione ENTER para fechar..." _
