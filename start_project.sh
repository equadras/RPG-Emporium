#!/bin/bash

echo "🚀 Iniciando RPG Emporium..."

# Verificar se estamos no diretório correto
if [ ! -f "setup.sql" ]; then
    echo "❌ Execute este script na raiz do projeto RPG-Emporium"
    exit 1
fi

# Configurar banco de dados
echo "📦 Configurando banco de dados..."
chmod +x setup_database.sh
./setup_database.sh

# Instalar dependências do backend
echo "🐍 Instalando dependências do backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "📦 Criando ambiente virtual..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

# Iniciar backend em background
echo "🔧 Iniciando backend..."
python app.py &
BACKEND_PID=$!

# Aguardar backend inicializar
sleep 3


# Instalar dependências do frontend
echo "⚛️ Instalando dependências do frontend..."
cd ../e-commerce
npm install

# Criar arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "📝 Criando arquivo .env..."
    echo "VITE_API_BASE_URL=http://localhost:5000" > .env
fi

# Iniciar frontend
echo "🎨 Iniciando frontend..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Projeto iniciado com sucesso!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:5000"
echo ""
echo "Para parar o projeto, pressione Ctrl+C"

# Função para limpar processos ao sair
cleanup() {
    echo "🛑 Parando serviços..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Manter script rodando
wait 