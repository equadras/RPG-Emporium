#!/usr/bin/env bash
set -e

echo "🐍 Configurando backend..."

cd backend || { echo "❌ Pasta backend não encontrada"; exit 1; }

############################
# ▶︎ .env com variáveis ◀︎ #
############################
ENV_FILE=".env"
DB_NAME="rpg_emporium"
DB_USER="rpg_user"
DB_PASS="123456"
SECRET_KEY=$(openssl rand -hex 32)

# Detecta Codespaces
if [ "$CODESPACES" = "true" ]; then
  DB_URL="sqlite:///rpg_emporium.db"
else
  DB_URL="postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"
fi

if [ ! -f "$ENV_FILE" ]; then
  cat <<EOF > "$ENV_FILE"
# gerado por setup_backend.sh
SQLALCHEMY_DATABASE_URI=${DB_URL}
SECRET_KEY=${SECRET_KEY}
FLASK_ENV=development
EOF
  echo "📝 Arquivo $ENV_FILE criado."
fi

# ——— cria / reaproveita o venv ———
if [ ! -x venv/bin/activate ]; then
  echo "📦 (Re)criando ambiente virtual…"
  rm -rf venv
  python3 -m venv venv
fi
. venv/bin/activate

export PIP_BREAK_SYSTEM_PACKAGES=1      # ignora PEP 668
python -m pip install -U pip wheel setuptools
pip install -r requirements.txt

echo "🚀 Iniciando backend em http://0.0.0.0:5000"
venv/bin/python app.py

