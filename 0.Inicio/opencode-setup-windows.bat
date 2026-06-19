@echo off
REM ============================================================
REM OpenCode Setup - Windows (Python + JavaScript)
REM Instalacao do ZERO para aula de IA + BIM
REM Para alunos que nunca abriram um terminal
REM ============================================================

setlocal enabledelayedexpansion
color 0A
title OpenCode Setup - IA + BIM

echo.
echo ============================================================
echo   INSTALADOR OPENCODE - Windows
echo   Ambiente Zero para Aula de IA e BIM
echo   (Python + JavaScript inclusos)
echo ============================================================
echo.
echo  Este instalador vai colocar tudo que voce precisa.
echo  Nao precisa digitar nada. So aguardar.
echo  Pode levar de 10 a 20 minutos na primeira vez.
echo.
pause

REM ---- Verificar privilegios de administrador ----
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo [ERRO] Este instalador precisa ser executado como Administrador.
    echo.
    echo  COMO RESOLVER:
    echo  1. Feche esta janela
    echo  2. Clique com o botao DIREITO neste arquivo
    echo  3. Escolha "Executar como administrador"
    echo.
    pause
    exit /b 1
)

set WORK_DIR=%USERPROFILE%\OpenCode-Aula
if not exist "%WORK_DIR%" mkdir "%WORK_DIR%"
cd /d "%WORK_DIR%"
echo [OK] Pasta de trabalho: %WORK_DIR%

REM ============================================================
REM 1. CHOCOLATEY (gerenciador que instala o resto)
REM ============================================================
echo.
echo [1/6] Preparando gerenciador de instalacao...
where choco >nul 2>&1
if %errorLevel% neq 0 (
    echo      Instalando Chocolatey...
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    set "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    if !errorLevel! equ 0 (echo      [OK] Chocolatey instalado) else (echo      [ERRO] Falha & pause & exit /b 1)
) else (
    echo      [OK] Chocolatey ja instalado
)

REM ============================================================
REM 2. NODE.JS (roda JavaScript + traz o npm)
REM ============================================================
echo.
echo [2/6] Instalando Node.js (JavaScript)...
where node >nul 2>&1
if %errorLevel% neq 0 (
    choco install -y nodejs-lts
    if !errorLevel! equ 0 (echo      [OK] Node.js instalado) else (echo      [ERRO] Falha & pause & exit /b 1)
) else (
    for /f "tokens=*" %%i in ('node --version') do echo      [OK] Node.js ja instalado: %%i
)

REM ============================================================
REM 3. PYTHON (roda os scripts Python da aula de BIM)
REM ============================================================
echo.
echo [3/6] Instalando Python...
where python >nul 2>&1
if %errorLevel% neq 0 (
    choco install -y python311
    if !errorLevel! equ 0 (echo      [OK] Python instalado) else (echo      [ERRO] Falha & pause & exit /b 1)
) else (
    for /f "tokens=*" %%i in ('python --version') do echo      [OK] Python ja instalado: %%i
)

REM ============================================================
REM 4. GIT (opcional, util para baixar exemplos)
REM ============================================================
echo.
echo [4/6] Instalando Git...
where git >nul 2>&1
if %errorLevel% neq 0 (
    choco install -y git
    if !errorLevel! equ 0 (echo      [OK] Git instalado) else (echo      [AVISO] Git falhou, mas e opcional)
) else (
    for /f "tokens=*" %%i in ('git --version') do echo      [OK] Git ja instalado: %%i
)

REM ---- Recarregar PATH para reconhecer o que acabou de instalar ----
call refreshenv >nul 2>&1

REM ============================================================
REM 5. BIBLIOTECAS PYTHON PARA BIM
REM ============================================================
echo.
echo [5/6] Instalando bibliotecas Python para BIM...
echo      (pandas, openpyxl, ifcopenshell, requests)
python -m pip install --upgrade pip >nul 2>&1
python -m pip install pandas openpyxl requests
python -m pip install ifcopenshell
if !errorLevel! neq 0 (
    echo      [AVISO] ifcopenshell pode nao ter instalado. E opcional para comecar.
) else (
    echo      [OK] Bibliotecas instaladas
)

REM ============================================================
REM 6. OPENCODE (o agente de IA)
REM ============================================================
echo.
echo [6/6] Instalando OpenCode...
call npm install -g opencode-ai@latest
if !errorLevel! equ 0 (echo      [OK] OpenCode instalado) else (echo      [ERRO] Falha & pause & exit /b 1)

REM ============================================================
REM VALIDACAO
REM ============================================================
echo.
echo ============================================================
echo   CONFERINDO SE DEU TUDO CERTO
echo ============================================================
echo.
set ERROR_COUNT=0

call :checktool "Node.js (JavaScript)" node
call :checktool "Python" python
call :checktool "pip (bibliotecas Python)" pip
call :checktool "OpenCode (o agente)" opencode

echo.
if !ERROR_COUNT! equ 0 (
    echo ============================================================
    echo   TUDO PRONTO! INSTALACAO CONCLUIDA COM SUCESSO
    echo ============================================================
    echo.
    echo  Para usar:
    echo  1. Abra o aplicativo OpenCode (ou digite "opencode" no terminal)
    echo  2. Trabalhe dentro da pasta: %WORK_DIR%
    echo.
) else (
    echo ============================================================
    echo   ALGUNS ITENS FALHARAM (!ERROR_COUNT!)
    echo ============================================================
    echo  Tire um print desta tela e envie para o professor.
    echo.
)
pause
endlocal
exit /b 0

REM ---- Sub-rotina de teste ----
:checktool
%~2 --version >nul 2>&1
if !errorLevel! equ 0 (
    for /f "tokens=*" %%v in ('%~2 --version 2^>^&1') do echo  [OK] %~1: %%v
) else (
    echo  [FALHOU] %~1 nao respondeu
    set /a ERROR_COUNT+=1
)
goto :eof
