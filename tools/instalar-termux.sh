#!/usr/bin/env bash
# Prepara Termux para usar el comando «lanzamiento-oficial». No pide ni guarda tokens.
set -u
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Instalando herramientas (gh, curl, coreutils, unzip)…"
pkg update -y >/dev/null 2>&1 || true
pkg install -y gh curl coreutils unzip || { echo "ERROR: no pude instalar las herramientas básicas."; exit 1; }
echo "Instalando aapt y apksigner (lectura de versión y verificación de firma)…"
pkg install -y aapt apksigner || echo "AVISO: no pude instalar aapt/apksigner. Sin ellos el comando no podrá leer la versión ni verificar la firma."
chmod +x "$DIR/lanzamiento-oficial"
BIN="${PREFIX:-/usr}/bin"
ln -sf "$DIR/lanzamiento-oficial" "$BIN/lanzamiento-oficial" || { echo "ERROR: no pude crear el comando en $BIN."; exit 1; }
echo "Listo. Revisa tu entorno con: lanzamiento-oficial doctor"
