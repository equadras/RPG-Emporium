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

if [ ! -f "$ENV_FILE" ]; then
  cat <<EOF > "$ENV_FILE"
# gerado por setup_backend.sh
SQLALCHEMY_DATABASE_URI=postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}
SECRET_KEY=${SECRET_KEY}
FLASK_ENV=development
EOF
  echo "📝 Arquivo $ENV_FILE criado."
fi


# ——— pacotes de sistema necessários ———
sudo apt-get update -y
sudo apt-get install -y python3-venv python3-dev build-essential python3-full

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

echo "🚀 Iniciando backend em http://localhost:5050"
venv/bin/python app.py

