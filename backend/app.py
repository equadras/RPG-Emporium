import os
from enum import Enum
from datetime import datetime
from functools import wraps

from flask import url_for
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# -----------------| setp |----------------------
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']    = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']                 = os.getenv('SECRET_KEY')

db     = SQLAlchemy(app)
bcrypt = Bcrypt(app)

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get('Origin')
    allowed_origins = [
        'http://localhost:5173',
        f'https://5173-{os.getenv("CODESPACE_NAME", "")}.' + os.getenv('GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN', 'app.github.dev'),
        f'https://5000-{os.getenv("CODESPACE_NAME", "")}.' + os.getenv('GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN', 'app.github.dev'),
    ]
    if origin in allowed_origins or origin is None:
        response.headers['Access-Control-Allow-Origin'] = origin or '*'
    else:
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response


# -----------------| enums |----------------------
class CategoryEnum(Enum):
    LIVROS      = 'livros'
    DADOS       = 'dados'
    JOGOS       = 'jogos'
    MINIATURAS  = 'miniaturas'
    CENARIOS    = 'cenarios'
    ACESSORIOS  = 'acessorios'
    

class OrderStatusEnum(Enum):
    PROCESSING = 'em processamento'
    SHIPPED    = 'enviado'
    DELIVERED  = 'entregue'


# -----------------| models |----------------------
class User(db.Model):
    __tablename__ = 'user'
    id            = db.Column(db.Integer,   primary_key=True)
    full_name     = db.Column(db.String(120), nullable=False)
    email         = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at    = db.Column(db.DateTime,    default=datetime.utcnow)

    @property
    def password(self):
        raise AttributeError("senha não pode ser lida")

    @password.setter
    def password(self, raw):
        self.password_hash = bcrypt.generate_password_hash(raw).decode()

    def check_password(self, raw):
        return bcrypt.check_password_hash(self.password_hash, raw)

    def to_dict(self):
        return {
                'id': self.id,
                'full_name': self.full_name,
                'email': self.email,
                'created_at': self.created_at.isoformat()
                }


class Product(db.Model):
    __tablename__ = 'product'
    id           = db.Column(db.Integer,      primary_key=True)
    name         = db.Column(db.String(120),  nullable=False)
    description  = db.Column(db.Text)
    price        = db.Column(db.Numeric(10,2), nullable=False)
    category     = db.Column(db.Enum(CategoryEnum, values_callable=lambda x: [e.value for e in x]), nullable=False) 
    created_at   = db.Column(db.DateTime,     default=datetime.utcnow)

    def to_dict(self):
        return {
                'id': self.id,
                'name': self.name,
                'description': self.description,
                'price': str(self.price),
                'category': self.category.value,
                'images': [img.url for img in self.images],
                'created_at': self.created_at.isoformat()
                }

class ProductImage(db.Model):
    __tablename__ = 'product_image'
    id         = db.Column(db.Integer,      primary_key=True)
    product_id = db.Column(db.Integer,      db.ForeignKey('product.id'), nullable=False)
    url        = db.Column(db.String(255),  nullable=False)   # pode ser caminho local ou URL externa
    created_at = db.Column(db.DateTime,     default=datetime.utcnow)

    product    = db.relationship('Product', backref=db.backref('images', cascade='all, delete-orphan'))

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }


class Order(db.Model):
    __tablename__ = 'order'
    id         = db.Column(db.Integer,      primary_key=True)
    user_id    = db.Column(db.Integer,      db.ForeignKey('user.id'), nullable=False)
    status     = db.Column(db.Enum(OrderStatusEnum, values_callable=lambda x: [e.value for e in x]),
            default=OrderStatusEnum.PROCESSING,
            nullable=False)          
    created_at = db.Column(db.DateTime,     default=datetime.utcnow)

    user       = db.relationship('User', backref='orders')

    def to_dict(self):
        return {
                'id': self.id,
                'user_id': self.user_id,
                'status': self.status.value,
                'created_at': self.created_at.isoformat(),
                'items': [item.to_dict() for item in self.items]
                }


class OrderItem(db.Model):
    __tablename__ = 'order_item'
    id         = db.Column(db.Integer,      primary_key=True)
    order_id   = db.Column(db.Integer,      db.ForeignKey('order.id'),   nullable=False)
    product_id = db.Column(db.Integer,      db.ForeignKey('product.id'), nullable=False)
    quantity   = db.Column(db.Integer,      nullable=False, default=1)
    unit_price = db.Column(db.Numeric(10,2), nullable=False)            # preço no momento do pedido (RC03)

    order      = db.relationship('Order',   backref=db.backref('items', cascade='all, delete-orphan'))
    product    = db.relationship('Product')

    def to_dict(self):
        return {
                'id': self.id,
                'product': self.product.to_dict(),
                'quantity': self.quantity,
                'unit_price': str(self.unit_price),
                'subtotal': str(self.unit_price * self.quantity)
                }


class CartItem(db.Model):
    __tablename__ = 'cart_item'
    id         = db.Column(db.Integer,   primary_key=True)
    user_id    = db.Column(db.Integer,   db.ForeignKey('user.id'),    nullable=False)
    product_id = db.Column(db.Integer,   db.ForeignKey('product.id'), nullable=False)
    quantity   = db.Column(db.Integer,   default=1)
    added_at   = db.Column(db.DateTime,  default=datetime.utcnow)

    user       = db.relationship('User',    backref='cart_items')
    product    = db.relationship('Product')

    def to_dict(self):
        return {
                'id': self.id,
                'product': self.product.to_dict(),
                'quantity': self.quantity
                }

# -----------------| auth decorator |----------------------
def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'message':'Not logged in'}), 401
        return fn(*args, **kwargs)
    return wrapper


# -----------------| rotas auth |----------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not all(k in data for k in ('full_name','email','password')):
        return jsonify({'message':'Missing fields: full_name, email, password'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message':'User with that email already exists'}), 409

    u = User(full_name=data['full_name'], email=data['email'])
    u.password = data['password']
    db.session.add(u)
    db.session.commit()
    return jsonify({'message':'User created'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not all(k in data for k in ('email','password')):
        return jsonify({'message':'Missing fields: email, password'}), 400

    u = User.query.filter_by(email=data['email']).first()
    if not u or not u.check_password(data['password']):
        return jsonify({'message':'Invalid credentials'}), 401

    session['user_id'] = u.id
    return jsonify({'message':'Logged in','user':u.to_dict()}), 200


@app.route('/profile', methods=['GET'])
@login_required
def profile():
    u = User.query.get(session['user_id'])
    return jsonify(u.to_dict()), 200

# -----------------| rotas produtos |----------------------
@app.route('/products', methods=['GET'])
def list_products():
    return jsonify([p.to_dict() for p in Product.query.all()]), 200



@app.route('/products', methods=['OPTIONS'])
def products_options():
    return '', 200

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    p = Product.query.get_or_404(id)
    return jsonify(p.to_dict()), 200


@app.route('/products', methods=['POST'])
@login_required
def create_product():
    d = request.get_json()
    if not all(k in d for k in ('name','price','category')):
        return jsonify({'message':'Campos obrigatórios: name, price, category'}), 400

    try:
        cat = CategoryEnum(d['category'])
    except ValueError:
        return jsonify({'message':'Categoria inválida'}), 400

    p = Product(
            name        = d['name'],
            description = d.get('description',''),
            price       = d['price'],
            category    = cat
            )
    db.session.add(p)
    db.session.flush()  # popula p.id

    for url in d.get('image_urls', []):
        img = ProductImage(product_id=p.id, url=url)
        db.session.add(img)

    db.session.commit()
    return jsonify(p.to_dict()), 201


@app.route('/products/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    p = Product.query.get_or_404(id)
    d = request.get_json()

    if 'category' in d:
        try:
            p.category = CategoryEnum(d['category'])
        except ValueError:
            return jsonify({'message':'Categoria inválida'}), 400

    # atualiza os demais campos, mantendo valores anteriores se não vierem
    p.name        = d.get('name',        p.name)
    p.description = d.get('description', p.description)
    p.price       = d.get('price',       p.price)

    db.session.commit()
    return jsonify(p.to_dict()), 200


@app.route('/products/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    p = Product.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({'message':'Deleted'}), 200


# -----------------| rotas pedidos |----------------------

@app.route('/orders', methods=['GET'])
@login_required
def list_orders():
    """Listar todos os pedidos do usuário logado."""
    orders = Order.query.filter_by(user_id=session['user_id']).all()
    return jsonify([o.to_dict() for o in orders]), 200


@app.route('/orders/<int:order_id>', methods=['GET'])
@login_required
def get_order(order_id):
    """Detalhes de um pedido específico."""
    order = Order.query.filter_by(id=order_id, user_id=session['user_id']).first_or_404()
    return jsonify(order.to_dict()), 200


@app.route('/orders', methods=['POST'])
@login_required
def create_order():
    """
    Cria um pedido a partir dos itens que estão no carrinho do usuário.
    - Move cada CartItem para OrderItem
    - Usa o preço atual do produto como unit_price
    - Limpa o carrinho do usuário
    """
    # pega itens do carrinho
    cart_items = CartItem.query.filter_by(user_id=session['user_id']).all()
    if not cart_items:
        return jsonify({'message': 'Carrinho vazio'}), 400

    # cria pedido
    order = Order(user_id=session['user_id'])
    db.session.add(order)
    db.session.flush()  # popula order.id

    # converte cada item do carrinho em item de pedido
    for ci in cart_items:
        oi = OrderItem(
                order_id   = order.id,
                product_id = ci.product_id,
                quantity   = ci.quantity,
                unit_price = ci.product.price
                )
        db.session.add(oi)
        db.session.delete(ci)  # remove do carrinho

    db.session.commit()
    return jsonify(order.to_dict()), 201


@app.route('/orders/<int:order_id>/status', methods=['PUT'])
@login_required
def update_order_status(order_id):
    """
    Atualiza o status de um pedido.
    Exemplo de JSON body: { "status": "enviado" }
    """
    order = Order.query.filter_by(id=order_id, user_id=session['user_id']).first_or_404()
    data = request.get_json()
    try:
        order.status = OrderStatusEnum(data['status'])
    except ValueError:
        return jsonify({'message':'Status inválido'}), 400

    db.session.commit()
    return jsonify(order.to_dict()), 200


@app.route('/orders/<int:order_id>', methods=['DELETE'])
@login_required
def cancel_order(order_id):
    """
    Cancela (deleta) um pedido. Só pedidos em processamento podem ser cancelados.
    """
    order = Order.query.filter_by(id=order_id, user_id=session['user_id']).first_or_404()
    if order.status != OrderStatusEnum.PROCESSING:
        return jsonify({'message':'Só pedidos em processamento podem ser cancelados'}), 400

    db.session.delete(order)
    db.session.commit()
    return jsonify({'message':'Pedido cancelado'}), 200


# -----------------| rotas carrinho |----------------------
@app.route('/cart', methods=['GET'])
@login_required
def get_cart():
    items = CartItem.query.filter_by(user_id=session['user_id']).all()
    return jsonify([i.to_dict() for i in items]), 200


@app.route('/cart', methods=['POST'])
@login_required
def add_to_cart():
    d = request.get_json()
    prod = Product.query.get_or_404(d['product_id'])
    qty  = d.get('quantity',1)

    item = CartItem.query.filter_by(
            user_id=session['user_id'],
            product_id=prod.id
            ).first()

    if item:
        item.quantity += qty
    else:
        item = CartItem(user_id=session['user_id'], product_id=prod.id, quantity=qty)
        db.session.add(item)

    db.session.commit()
    return jsonify(item.to_dict()), 201


@app.route('/cart/<int:item_id>', methods=['PUT'])
@login_required
def update_cart(item_id):
    item = CartItem.query.filter_by(
            id=item_id, user_id=session['user_id']
            ).first_or_404()
    item.quantity = request.get_json().get('quantity', item.quantity)
    db.session.commit()
    return jsonify(item.to_dict()), 200


@app.route('/cart/<int:item_id>', methods=['DELETE'])
@login_required
def delete_cart(item_id):
    item = CartItem.query.filter_by(
            id=item_id, user_id=session['user_id']
            ).first_or_404()
    db.session.delete(item); db.session.commit()
    return jsonify({'message':'Removed'}), 200


# -------------------------| imagens |--------------------------
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'uploads')

@app.route('/products/<int:id>/images', methods=['POST'])
@login_required
def upload_product_image(id):
    product = Product.query.get_or_404(id)
    if 'image' not in request.files:
        return jsonify({'message':'Nenhuma imagem enviada'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # gera URL pública (ajuste conforme servir seus estáticos)
    public_url = url_for('static', filename=f'uploads/{filename}', _external=True)

    img = ProductImage(product_id=id, url=public_url)
    db.session.add(img)
    db.session.commit()
    return jsonify(img.to_dict()), 201

@app.route('/products/<int:id>/images', methods=['GET'])
def list_product_images(id):
    product = Product.query.get_or_404(id)
    return jsonify([img.to_dict() for img in product.images]), 200

# -----------------| main |----------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # CRIA todas as tabelas conforme seus novos modelos

    #isso foi pra rodar para abrir o flask do wsl pro windows
    app.run(debug=True, host='0.0.0.0', port=5000)

