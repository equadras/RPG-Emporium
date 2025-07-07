-- Apagar tabelas na ordem certa (para evitar problemas de FK)
DROP TABLE IF EXISTS cart_item CASCADE;
DROP TABLE IF EXISTS order_item CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS product_image CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Apagar enums
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_enum') THEN
        DROP TYPE category_enum;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status_enum') THEN
        DROP TYPE order_status_enum;
    END IF;
END $$;

-- Recriar enums
CREATE TYPE category_enum AS ENUM ('dados', 'miniaturas', 'livros', 'acessorios', 'jogos', 'cenarios');
CREATE TYPE order_status_enum AS ENUM ('em processamento', 'enviado', 'entregue');

-- Tabelas
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    category category_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) NOT NULL,
    status order_status_enum NOT NULL DEFAULT 'em processamento',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_item (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES "order"(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL
);

CREATE TABLE cart_item (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    product_id INTEGER REFERENCES product(id),
    quantity INTEGER DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_product_name ON product(name);
CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_order_user_id ON "order"(user_id);
CREATE INDEX idx_order_item_order_id ON order_item(order_id);
CREATE INDEX idx_cart_item_user_id ON cart_item(user_id);
CREATE INDEX idx_product_image_product_id ON product_image(product_id);

-- Inserir produtos (5 por categoria)
-- LIVROS
INSERT INTO product (name, description, price, category) VALUES
('Livro Aventura Épica', 'Um livro de aventuras clássicas.', 49.99, 'livros'),
('Guia do Mestre', 'Guia completo para mestres.', 59.99, 'livros'),
('Bestiário RPG', 'Lista de criaturas e monstros.', 69.99, 'livros'),
('Manual do Herói', 'Tudo sobre os heróis.', 39.99, 'livros'),
('Magias Básicas', 'Coleção de magias básicas.', 45.99, 'livros');

-- DADOS
INSERT INTO product (name, description, price, category) VALUES
('Kit Dados Dorian', 'Conjunto de dados D6 opacos Dorian storm.', 19.99, 'dados'),
('Kit Dados Imogen', 'Kit translúcidos de daods imogen.', 7.99, 'dados'),
('Kit Dados Fearn', 'Kit completo em metal da fearn.', 89.99, 'dados'),
('Kit Dados Dagger Heart', 'Dados de dagger heart.', 15.99, 'dados'),
('Kit Dados FCG', 'Dados com inscrições rúnicas do personagem FCG.', 24.99, 'dados');

-- MINIATURAS
INSERT INTO product (name, description, price, category) VALUES
('Miniatura Guerreiro', 'Figura de um guerreiro.', 29.99, 'miniaturas'),
('Dragão Vermelho', 'Miniatura de dragão.', 49.99, 'miniaturas'),
('Arqueiro Élfico', 'Miniatura de elfo arqueiro.', 34.99, 'miniaturas'),
('Orc Brutamontes', 'Miniatura de orc.', 32.99, 'miniaturas'),
('Mago Arcano', 'Miniatura de mago.', 39.99, 'miniaturas');

-- CENARIOS
INSERT INTO product (name, description, price, category) VALUES
('Token personagens', 'Tokens para personagens de rpg.', 99.99, 'cenarios'),
('Grid de mapa', 'Grid de mapa.', 59.99, 'cenarios'),
('Tokens inimigos', 'Tokens para cenarios.', 29.99, 'cenarios'),
('Floresta Densa', 'Peças de floresta modular.', 49.99, 'cenarios'),
('Torres de fogo', 'Torres de fogo.', 79.99, 'cenarios');

-- ACESSORIOS
INSERT INTO product (name, description, price, category) VALUES
('Escudo do Mestre', 'Escudo dobrável.', 25.99, 'acessorios'),
('', 'Bolsa para guardar dados.', 14.99, 'acessorios'),
('Mapas Laminados', 'Kit de mapas.', 34.99, 'acessorios'),
('Marcadores Personagem', 'Marcadores práticos.', 12.99, 'acessorios'),
('Kit Canetas', 'Canetas para mapas.', 9.99, 'acessorios');

-- JOGOS
INSERT INTO product (name, description, price, category) VALUES
('Jogo RPG Inferno', 'Cartas de magias diversas.', 199.99, 'jogos'),
('Jogo RPG SCREAM', 'Jogo de RPG para um de terror.', 39.99, 'jogos'),
('The Gonnies', 'Jogo base de RPG para crianças.', 159.99, 'jogos'),
('Eclipse: Perseguidores', 'Jogo completo iniciante.', 149.99, 'jogos'),
('Jogo ROAM', 'Mix de dados e cartas.', 129.99, 'jogos');

-- Inserir imagens na tabela product_image
-- LIVROS (IDs 1-5)
INSERT INTO product_image (product_id, url) VALUES
(1, 'https://shop.critrole.com/cdn/shop/files/M9OV1-CoverStanding2.png?v=1696353959'),
(2, 'https://cdn-prod.scalefast.com/public/assets/img/resized/wizardsofthecoast-dnd-beyond/7273faabc6cf1b88f666d400c28b5ec6_495_KR.png'),
(3, 'https://cdn-prod.scalefast.com/public/assets/img/resized/wizardsofthecoast-dnd-beyond/ef5914070ec3f5aed7f00ec2a95d8667_495_KR.png'),
(4, 'https://cdn-prod.scalefast.com/public/assets/img/resized/wizardsofthecoast-dnd-beyond/88bde9fa3268ec0a0131b9f8dbe74177_1920_KR.png'),
(5, 'https://cdn-prod.scalefast.com/public/assets/img/resized/wizardsofthecoast-dnd-beyond/839b8abc84571e2c346f8bc9364b4bbd_495_KR.png');

-- DADOS (IDs 6-10)
INSERT INTO product_image (product_id, url) VALUES
(6, 'https://shop.critrole.com/cdn/shop/files/dorian_dice_set_0000_dice.png?v=1713475339'),
(7, 'https://shop.critrole.com/cdn/shop/files/criticalrole_dicebag3.png?v=1701366469'),
(8, 'https://shop.critrole.com/cdn/shop/files/criticalrole_3.png?v=1701366523'),
(9, 'https://shop.critrole.com/cdn/shop/files/DH_dice_set_1200x1200_on-white_0003_stacked.png?v=1749067710'),
(10, 'https://shop.critrole.com/cdn/shop/files/hi_res-9a-CriticalRole_r1_ATX_9762_fcg_dice.png?v=1688667678');

-- MINIATURAS (IDs 11-15)
INSERT INTO product_image (product_id, url) VALUES
(11, 'https://images.tcdn.com.br/img/img_prod/599593/the_dark_druid_humano_druida_miniatura_sem_pintura_para_rpg_25465895_1_cf629c02aa7d359603d68685f423f7f3.jpeg'),
(12, 'https://images.tcdn.com.br/img/img_prod/599593/zari_gladiador_da_lava_dragonborn_barbaro_media_miniatura_sem_pintura_para_rpg_25465893_1_d4466ea5d65067aa59a1d1b724ee7462.jpg'),
(13, 'https://images.tcdn.com.br/img/img_prod/599593/kadrus_anao_paladino_media_miniatura_sem_pintura_para_rpg_25465887_1_aac98a8759622da2843eafa192f31403.jpg'),
(14, 'https://images.tcdn.com.br/img/img_prod/599593/koven_o_arquiteto_louco_anao_paladino_media_miniatura_sem_pintura_para_rpg_25465885_1_5f98b4a3925606c3dd36fc30a97e2587.jpg'),
(15, 'https://images.tcdn.com.br/img/img_prod/599593/caveira_flamejante_gigante_3_morto_vivo_media_miniatura_sem_pintura_para_rpg_25465883_1_5825192216102bbb008e0db93cc27d10.jpg');

-- CENARIOS (IDs 16-20)
INSERT INTO product_image (product_id, url) VALUES
(16, 'https://images.tcdn.com.br/img/img_prod/599593/kit_6_tokens_de_personagens_para_rpg_25mm_25466171_1_b441cdf7956c9e6f76bbf3453d06b7c4.jpg'),
(17, 'https://images.tcdn.com.br/img/img_prod/599593/kit_6_tokens_e_4_grids_9x9_com_caneta_25466173_5_dc04dccdd42a1df5c871d4d55d5a5b8f.jpg'),
(18, 'https://images.tcdn.com.br/img/img_prod/599593/grimorio_magico_da_conjuracao_estatuera_de_decoracao_acessorios_para_rpg_25464537_1_79c0b6d2b37873e4bebbfaf2a56092a0.jpg'),
(19, 'https://images.tcdn.com.br/img/img_prod/599593/bau_mimico_lingua_de_sogra_colorido_estatueta_decoracao_mercado_rpg_25464539_1_0be96caa79c992572eb941ea345e3dd4.jpg'),
(20, 'https://images.tcdn.com.br/img/img_prod/599593/armadilha_de_lanca_chamas_cenario_miniatura_com_pintura_para_rpg_25462311_1_2b2400083a19853d63b5b4c04a4b5cfb_20240410115836.jpg');

-- ACESSORIOS (IDs 21-25)
INSERT INTO product_image (product_id, url) VALUES
(21, 'https://images.tcdn.com.br/img/img_prod/599593/aneis_coloridos_de_condicoes_d_amp_d_rpg_25465775_4_66b60cca59a77f601e4b7c52d0c30249.jpg'),
(22, 'https://images.tcdn.com.br/img/img_prod/599593/controlador_de_inspiracao_de_bardo_rpg_25465771_1_644128663747d6d0c7b716b4d97ad47e.png'),
(23, 'https://images.tcdn.com.br/img/img_prod/599593/dados_metalicos_com_case_de_bolso_vintage_dracarys_gold_25466297_2_04954bcf5b07866f39fe03a6241bf12b.jpg'),
(24, 'https://images.tcdn.com.br/img/img_prod/599593/contador_de_pontos_de_vida_de_0_a_399_rpg_branco_25464605_1_6bf8c0da61a4079e3c74502cbd8d9dea.jpg'),
(25, 'https://images.tcdn.com.br/img/img_prod/599593/chaveiro_dado_d20_runas_vermelho_acessorios_para_rpg_25464597_1_f1c816e8e5c80e5db8dff3c6b41b69d8.jpg');

-- JOGOS (IDs 26-30)
INSERT INTO product_image (product_id, url) VALUES
(26, 'https://images.tcdn.com.br/img/img_prod/1152477/inferno_3542_1_d61aad839fa2c9559d3fdaafe0e5d1c4.jpg'),
(27, 'https://images.tcdn.com.br/img/img_prod/1152477/scream_the_game_edicao_em_ingles_4178_1_a17f82a47f8e8a4c8a3256f054534f4e.jpg'),
(28, 'https://images.tcdn.com.br/img/img_prod/1152477/the_goonies_never_say_die_edicao_em_ingles_4176_1_0404185d99ba5b49dd65b894ddda5b7a.jpg'),
(29, 'https://images.tcdn.com.br/img/img_prod/1152477/eclipse_perseguidores_4280_1_d833428de0790a3dc6cdd98d9252df51.jpg'),
(30, 'https://images.tcdn.com.br/img/img_prod/1152477/roam_4272_1_5c73d24cded8355760444e97042837fb.jpg');
