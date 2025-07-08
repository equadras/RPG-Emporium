# RPG Emporium - E-commerce

Um e-commerce completo para produtos de RPG com backend em Python e frontend em React.

## 🚀 Configuração Rápida

### Pré-requisitos
- Git
- Espaço em disco
- 
### Instalação Automática

1. **Clone o repositório:**
```bash
git clone https://github.com/equadras/RPG-Emporium.git
cd RPG-Emporium
```

2. **Execute o script de inicialização:**
```bash
chmod +x start_project.sh
./start_project.sh
```

O script irá:
- ✅ Instalar e configurar PostgreSQL
- ✅ Criar o banco de dados `rpg_emporium`
- ✅ Executar o script `setup.sql` com os produtos
- ✅ Instalar e configurar Python e o ambiente virtual venv
- ✅ Instalar e configurar Node.js
- ✅ Instalar dependências do backend e frontend
- ✅ Iniciar ambos os serviços

### Acessos
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## 📋 Configuração Manual

### 1. Banco de Dados

```bash
# Instalar PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Criar banco de dados
sudo -u postgres psql -c "CREATE DATABASE rpg_emporium;"

# Executar setup
sudo -u postgres psql -d rpg_emporium -f setup.sql
```

### 2. Backend

```bash
cd backend

# Criar ambiente virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp config.env .env
# Edite o arquivo .env se necessário

# Executar
python app.py
```

### 3. Frontend

```bash
cd e-commerce

# Instalar dependências
npm install

# Criar arquivo de ambiente
echo "VITE_API_BASE_URL=http://localhost:5000" > .env

# Executar
npm run dev
```

## 🗄️ Estrutura do Banco de Dados

O banco contém as seguintes tabelas:

- **`user`** - Usuários do sistema
- **`product`** - Produtos do e-commerce
- **`product_image`** - Imagens dos produtos
- **`order`** - Pedidos
- **`order_item`** - Itens dos pedidos
- **`cart_item`** - Carrinho de compras

### Categorias de Produtos
- 📚 **livros** - Livros de RPG
- 🎲 **dados** - Dados para jogos
- 🎮 **jogos** - Jogos de tabuleiro
- 🎨 **miniaturas** - Miniaturas para RPG
- 🏰 **cenarios** - Cenários e mapas
- 🛠️ **acessorios** - Acessórios diversos

## 🔧 API Endpoints

### Produtos
- `GET /products` - Listar todos os produtos
- `GET /products/<id>` - Obter produto específico
- `POST /products` - Criar produto (admin)
- `PUT /products/<id>` - Atualizar produto (admin)
- `DELETE /products/<id>` - Deletar produto (admin)

### Autenticação
- `POST /register` - Registrar usuário
- `POST /login` - Fazer login
- `GET /profile` - Perfil do usuário

### Carrinho
- `GET /cart` - Obter carrinho
- `POST /cart` - Adicionar ao carrinho
- `PUT /cart/<id>` - Atualizar item do carrinho
- `DELETE /cart/<id>` - Remover do carrinho

### Pedidos
- `GET /orders` - Listar pedidos
- `POST /orders` - Criar pedido
- `PUT /orders/<id>/status` - Atualizar status

## 🎨 Frontend

O frontend está organizado em:

- **`/src/components/`** - Componentes reutilizáveis
- **`/src/pages/`** - Páginas da aplicação
- **`/src/contexts/`** - Contextos do React
- **`/src/services/`** - Serviços de API
- **`/src/hooks/`** - Hooks customizados

  
