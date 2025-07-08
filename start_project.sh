#!/bin/bash

echo "🚀 Iniciando RPG Emporium..."

# Verificar se estamos na raiz
if [ ! -f "setup.sql" ]; then
    echo "❌ Execute este script na raiz do projeto RPG-Emporium"
    exit 1
fi

# Banco de dados
echo "📦 Configurando banco de dados..."
chmod +x setup_database.sh
./setup_database.sh

# Backend
echo "🐍 Preparando backend..."
chmod +x setup_backend.sh
./setup_backend.sh &
BACKEND_PID=$!
timeout=30
while ! curl -s http://localhost:5050/healthz >/dev/null; do
  ((timeout--))
  [ $timeout -le 0 ] && { echo "❌ Backend não respondeu em 30 s"; exit 1; }
  sleep 1
done

# Aguarda backend subir (porta 5000)
echo "⏳ Aguardando backend iniciar..."
until curl -s http://localhost:5050 > /dev/null; do
    sleep 1
done
echo "✅ Backend pronto em http://localhost:5050"

# Frontend
echo "⚛️ Preparando frontend..."
chmod +x setup_frontend.sh
./setup_frontend.sh &
FRONTEND_PID=$!

# Aguarda frontend subir (porta 5173)
echo "⏳ Aguardando frontend iniciar..."
until curl -s http://localhost:5173 > /dev/null; do
    sleep 1
done
echo "✅ Frontend pronto em http://localhost:5173"

# Mensagem final
echo ""
echo "🎯 Projeto iniciado com sucesso!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:5050"
echo ""
echo "Para parar o projeto, pressione Ctrl+C"

# Encerrar com grace
cleanup() {
    echo "🛑 Encerrando serviços..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

# Loop infinito para manter script em execução
while true; do sleep 1; done

