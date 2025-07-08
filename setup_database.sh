#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Configurando banco de dados para RPG Emporium..."

_psql() {
  sudo -u postgres bash -c 'cd /tmp && exec psql "$@"' _ "$@"
}

if ! command -v psql &>/dev/null; then
  echo "📥 Instalando PostgreSQL..."
  sudo apt update -y
  sudo apt install -y postgresql postgresql-contrib
fi

start_pg() {
  if command -v systemctl &>/dev/null && systemctl --quiet is-enabled postgresql 2>/dev/null; then
    sudo systemctl start postgresql
  elif sudo service postgresql start 2>/dev/null; then
    :
  else
    ver="$(ls /etc/postgresql | head -n1)" || ver=14
    sudo pg_ctlcluster --skip-systemctl -m fast "$ver" main start
  fi
}
echo "🔄 Iniciando serviço PostgreSQL…"
start_pg

DB_NAME="rpg_emporium"
DB_USER="rpg_user"
DB_PASS="123456"

echo "📦 Banco '${DB_NAME}'…"
_psql -tc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" \
  | grep -q 1 || _psql -c "CREATE DATABASE ${DB_NAME};"

echo "👤 Usuário '${DB_USER}'…"
_psql <<SQL
DO \$\$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';
  ELSE
    ALTER USER ${DB_USER} WITH PASSWORD '${DB_PASS}';
  END IF;
END \$\$;
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
SQL

echo "🔧 Permissões no schema public…"
_psql -d "$DB_NAME" <<SQL
ALTER SCHEMA public OWNER TO ${DB_USER};
GRANT USAGE, CREATE ON SCHEMA public TO ${DB_USER};
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES    TO ${DB_USER};
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO ${DB_USER};
SQL

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
SQL_TMP="/tmp/rpg_setup.sql"
cp "$PROJECT_DIR/setup.sql" "$SQL_TMP"

echo "🗄️ Executando setup.sql…"
_psql -d "$DB_NAME" -f "$SQL_TMP"
rm -f "$SQL_TMP"

echo "✅ Banco de dados configurado com sucesso!"

