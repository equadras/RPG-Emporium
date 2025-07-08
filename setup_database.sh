#!/usr/bin/env bash
set -e                                           # aborta na primeira falha

echo "🚀 Configurando banco de dados para RPG Emporium..."

if [ "$CODESPACES" = "true" ]; then
  echo "⚡️ Rodando em Codespaces: usando SQLite (rpg_emporium.db)"
  # SQLite não precisa de setup
  exit 0
fi

#######################################
# 1. Instala/garante PostgreSQL ativo #
#######################################
if ! command -v psql &>/dev/null; then
  echo "📥 PostgreSQL não encontrado — instale manualmente se necessário."
  exit 1
fi

if ! systemctl is-active --quiet postgresql; then
  echo "🔄 Iniciando serviço PostgreSQL..."
  systemctl start postgresql
  systemctl enable postgresql
fi

###############################################
# 2. Cria BD e usuário se ainda não existirem #
###############################################
DB_NAME="rpg_emporium"
DB_USER="rpg_user"
DB_PASS="123456"

echo "📦 Criando banco de dados '${DB_NAME}' (se necessário)…"
sudo -u postgres psql -tc \
  "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 ||
  sudo -u postgres createdb "$DB_NAME"

echo "👤 Garantindo usuário '${DB_USER}' e privilégios…"
sudo -u postgres psql <<SQL
DO \$\$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';
  END IF;
END \$\$;

GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
SQL

#########################################
#  ➜ Permissões no schema "public"     #
#########################################
sudo -u postgres psql -d "$DB_NAME" <<'EOSQL'
ALTER SCHEMA public OWNER TO rpg_user;
GRANT USAGE, CREATE ON SCHEMA public TO rpg_user;

-- novos objetos herdarão privilégios
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES    TO rpg_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO rpg_user;
EOSQL

#################################
# 3. Executa script de estrutura #
#################################
echo "🗄️ Executando setup.sql..."
sudo -u postgres psql -d "$DB_NAME" -f setup.sql

echo "✅ Banco de dados configurado com sucesso!"

