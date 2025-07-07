#!/bin/bash

echo "🚀 Configurando banco de dados para RPG Emporium..."

# Verificar se PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL não está instalado. Instalando..."
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib
fi

# Verificar se o serviço está rodando
if ! sudo systemctl is-active --quiet postgresql; then
    echo "🔄 Iniciando PostgreSQL..."
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
fi

# Criar banco de dados se não existir
# sudo -u postgres dropdb rpg_emporium
# sudo -u postgres createdb rpg_emporium -O rpguser
echo "📦 Criando banco de dados..."
sudo -u postgres psql -c "CREATE DATABASE rpg_emporium;" 2>/dev/null || echo "Banco já existe"

# Executar o script SQL
echo "🗄️ Executando setup.sql..."
sudo -u postgres psql -d rpg_emporium -f setup.sql

echo "✅ Banco de dados configurado com sucesso!"
echo "📝 Próximos passos:"
echo "1. Configure as variáveis de ambiente"
echo "2. Instale as dependências do backend"
echo "3. Execute o backend"
echo "4. Configure o frontend" 