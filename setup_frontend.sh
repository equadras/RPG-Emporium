#!/bin/bash

echo "⚛️ Verificando ambiente do frontend..."

# Verifica Node.js e NPM
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instalando Node.js (LTS)..."

    # Instala NVM se necessário
    if [ ! -d "$HOME/.nvm" ]; then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    fi

    # Carrega NVM na sessão
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    nvm install --lts
    nvm use --lts
fi

cd e-commerce || exit 1

echo "📦 Instalando dependências do frontend..."
npm install

# Garante .env
if [ ! -f ".env" ]; then
    echo "📝 Criando arquivo .env..."
    echo "VITE_API_BASE_URL=http://localhost:5050" > .env
fi

echo "🚀 Iniciando frontend..."
npm run dev &

