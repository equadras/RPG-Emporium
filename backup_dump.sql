--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)

-- Started on 2025-07-02 19:19:06 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 833 (class 1247 OID 25032)
-- Name: categoryenum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.categoryenum AS ENUM (
    'LIVROS',
    'DADOS',
    'JOGOS',
    'MINIATURAS',
    'CENARIOS',
    'ACESSORIOS'
);


--
-- TOC entry 836 (class 1247 OID 25046)
-- Name: orderstatusenum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.orderstatusenum AS ENUM (
    'PROCESSING',
    'SHIPPED',
    'DELIVERED'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 25096)
-- Name: cart_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_item (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer,
    added_at timestamp without time zone
);


--
-- TOC entry 217 (class 1259 OID 25095)
-- Name: cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 217
-- Name: cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_item_id_seq OWNED BY public.cart_item.id;


--
-- TOC entry 216 (class 1259 OID 25084)
-- Name: order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status public.orderstatusenum NOT NULL,
    created_at timestamp without time zone
);


--
-- TOC entry 215 (class 1259 OID 25083)
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 215
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- TOC entry 220 (class 1259 OID 25113)
-- Name: order_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 25112)
-- Name: order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_item_id_seq OWNED BY public.order_item.id;


--
-- TOC entry 212 (class 1259 OID 25063)
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    category public.categoryenum NOT NULL,
    image_url character varying(1024),
    created_at timestamp without time zone
);


--
-- TOC entry 211 (class 1259 OID 25062)
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 211
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- TOC entry 214 (class 1259 OID 25072)
-- Name: product_image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_image (
    id integer NOT NULL,
    product_id integer NOT NULL,
    url character varying(255) NOT NULL,
    created_at timestamp without time zone
);


--
-- TOC entry 213 (class 1259 OID 25071)
-- Name: product_image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 213
-- Name: product_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_image_id_seq OWNED BY public.product_image.id;


--
-- TOC entry 210 (class 1259 OID 25054)
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    full_name character varying(120) NOT NULL,
    email character varying(120) NOT NULL,
    password_hash character varying(128) NOT NULL,
    created_at timestamp without time zone
);


--
-- TOC entry 209 (class 1259 OID 25053)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3204 (class 2604 OID 25099)
-- Name: cart_item id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item ALTER COLUMN id SET DEFAULT nextval('public.cart_item_id_seq'::regclass);


--
-- TOC entry 3203 (class 2604 OID 25087)
-- Name: order id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- TOC entry 3205 (class 2604 OID 25116)
-- Name: order_item id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_item_id_seq'::regclass);


--
-- TOC entry 3201 (class 2604 OID 25066)
-- Name: product id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- TOC entry 3202 (class 2604 OID 25075)
-- Name: product_image id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_image ALTER COLUMN id SET DEFAULT nextval('public.product_image_id_seq'::regclass);


--
-- TOC entry 3200 (class 2604 OID 25057)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3374 (class 0 OID 25096)
-- Dependencies: 218
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_item (id, user_id, product_id, quantity, added_at) FROM stdin;
\.


--
-- TOC entry 3372 (class 0 OID 25084)
-- Dependencies: 216
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."order" (id, user_id, status, created_at) FROM stdin;
\.


--
-- TOC entry 3376 (class 0 OID 25113)
-- Dependencies: 220
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item (id, order_id, product_id, quantity, unit_price) FROM stdin;
\.


--
-- TOC entry 3368 (class 0 OID 25063)
-- Dependencies: 212
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product (id, name, description, price, category, image_url, created_at) FROM stdin;
1	Grid Modular Florestal	Peças de piso hexagonal com relevo de folhas e raízes, ideal para montar caminhos na floresta.	77.10	CENARIOS		2025-07-02 21:40:05.076762
2	Torre de Vigia em Ruínas	Torre alta partida com janelas quebradas e escada em espiral desmoronada.	21.40	CENARIOS		2025-07-02 21:40:05.076765
3	Muralha de Pedra Antiga	Seção de muralha com pedras gastas pelo tempo e musgo no topo.	64.60	CENARIOS		2025-07-02 21:40:05.076766
4	Ponte de Madeira Suspensa	Passarela estreita em tábuas envelhecidas, sustentada por cordas trançadas.	90.90	CENARIOS		2025-07-02 21:40:05.076767
5	Altar de Pedra Rúnico	Pedestal circular com runas gravadas e brasas frias no centro.	21.74	CENARIOS		2025-07-02 21:40:05.076768
6	Portão de Ferro de Masmorra	Grande portão pesado com grade reforçada e dobradiças enferrujadas.	94.47	CENARIOS		2025-07-02 21:40:05.076769
7	Coluna Coríntia Quebrada	Coluna clássica partida ao meio, com capitel ornamentado no chão.	23.79	CENARIOS		2025-07-02 21:40:05.076769
8	Pilar Gótico Elevado	Pilar estreito em estilo ogival, perfeito para interiores de catedrais.	21.21	CENARIOS		2025-07-02 21:40:05.07677
9	Barricada de Barris e Caixas	Pilhas de barris lacrados e caixas empilhadas para bloquear passagens.	63.14	CENARIOS		2025-07-02 21:40:05.07677
10	Arco Triunfal Desgastado	Arco de triunfo com esculturas esculpidas, parcialmente destruído.	50.51	CENARIOS		2025-07-02 21:40:05.076771
11	Poço de Pedras Antigas	Borda circular de poço com correntes penduradas e água estagnada.	17.43	CENARIOS		2025-07-02 21:40:05.076771
12	Cercado de Madeira Rústica	Seção de cerca rústica feita com troncos fincados à mão.	13.80	CENARIOS		2025-07-02 21:40:05.076772
13	Torre de Muralha Baixa	Estrutura defensiva com ameias e pequenas aberturas para arqueiros.	50.44	CENARIOS		2025-07-02 21:40:05.076772
14	Pedra de Sinalização	Monólito gravado com flechas e símbolos, orienta aventureiros.	45.70	CENARIOS		2025-07-02 21:40:05.076773
15	Plataforma Elevada de Madeira	Deck quadrado com cerca baixa, usado para vigília ou cerimônias.	62.43	CENARIOS		2025-07-02 21:40:05.076774
16	Túmulo de Mármore Entalhado	Lápide ornamentada com brasão desgastado e grade baixa ao redor.	45.35	CENARIOS		2025-07-02 21:40:05.076774
17	Altar de Sacrifício de Pedra	Mesa de pedra com sulcos para drenagem de líquidos ritualísticos.	57.78	CENARIOS		2025-07-02 21:40:05.076775
18	Pórtico de Entrada Arqueado	Portal com arco em ogiva, ladeado por colunas finas e entalhes florais.	74.69	CENARIOS		2025-07-02 21:40:05.076776
19	Canaleta de Água Corrente	Pequena vala de pedra por onde flui água cristalina – ideal para dioramas de vila.	34.02	CENARIOS		2025-07-02 21:40:05.076776
20	Pedra do Dragão Caído	Monumento ao ar livre em forma de cabeça de dragão partida, com escamas rachadas.	21.64	CENARIOS		2025-07-02 21:40:05.076777
21	Dado Esmeralda D6	Dado de seis faces em resina verde esmeralda translúcida, acabamento polido.	70.84	DADOS		2025-07-02 21:40:17.441332
22	Dado Ônix D20	Dado de vinte faces em ônix sintético, com numeração gravada a laser.	48.93	DADOS		2025-07-02 21:40:17.441335
23	Dado Coral D10	Dado de dez faces em acrílico corais vibrantes, ideal para combos.	34.34	DADOS		2025-07-02 21:40:17.441336
24	Dado Safira Blue D8	Dado de oito faces em azul safira metálico, brilho perolado.	79.49	DADOS		2025-07-02 21:40:17.441336
25	Dado Citrino D12	Dado de doze faces em resina amarela citrina, efeito marmorizado.	35.13	DADOS		2025-07-02 21:40:17.441336
26	Dado Grafite D4	Dado de quatro faces em plástico grafite, leve e resistente.	17.56	DADOS		2025-07-02 21:40:17.441337
27	Dado Aurora D20	Dado de vinte faces com pigmento que muda de cor conforme a luz.	51.45	DADOS		2025-07-02 21:40:17.441337
28	Dado Nebulosa D6	Conjunto D6 com padrão galáctico em azul e roxo turbilhonante.	18.33	DADOS		2025-07-02 21:40:17.441337
29	Dado Rubi Flamejante D10	Dado de dez faces em vermelho rubi com inserções que lembram chamas.	39.19	DADOS		2025-07-02 21:40:17.441337
30	Dado Jade Imperial D8	Dado de oito faces em verde jade escuro, acabamento acetinado.	10.18	DADOS		2025-07-02 21:40:17.441338
31	Dado Lunar D12	Dado de doze faces com numeração prateada sobre fundo azul perolado.	11.19	DADOS		2025-07-02 21:40:17.441338
32	Dado Eclipse Solar D4	D4 em preto opaco, com detalhes em amarelo ouro para simular um eclipse.	91.91	DADOS		2025-07-02 21:40:17.441338
33	Dado Prisma Arco-íris D20	D20 com faces prateadas refletivas, cria arco-íris ao girar.	68.99	DADOS		2025-07-02 21:40:17.441339
34	Dado Cristal Gélido D6	D6 translúcido em tom gelo, sensação de frescor ao toque.	95.27	DADOS		2025-07-02 21:40:17.441339
35	Dado Madeira Rúnico D10	D10 em polímero imitando madeira, com runas gravadas em relevo.	94.12	DADOS		2025-07-02 21:40:17.441339
36	Dado Pérola D8	D8 perolado, brilho sutil que muda conforme o ângulo.	63.16	DADOS		2025-07-02 21:40:17.44134
37	Dado Oníricon D12	D12 em preto fosco com numeração luminosa que brilha no escuro.	63.06	DADOS		2025-07-02 21:40:17.44134
38	Dado Safira Solar D4	D4 em azul profundo com numeração em dourado intenso.	37.24	DADOS		2025-07-02 21:40:17.44134
39	Dado Espectral D20	D20 com acabamento holográfico, prismas que dançam de cor.	75.11	DADOS		2025-07-02 21:40:17.441341
40	Dado Ametista D6	D6 em tom ametista, translucidez rica e acabamento acetinado.	34.15	DADOS		2025-07-02 21:40:17.441341
41	Caravana dos Magos	Jogo de estratégia onde cada jogador lidera uma caravana de magos em um reino místico, coletando artefatos e enfrentando desafios.	45.17	JOGOS		2025-07-02 21:40:36.471728
42	Labirinto dos Dragões	Jogo de exploração cooperativa em um labirinto cheio de dragões antigos, com mecânica de escuta e dedução para evitar armadilhas.	21.19	JOGOS		2025-07-02 21:40:36.47173
43	Reinos em Conflito	Jogo de guerra e diplomacia onde facções medievais disputam territórios através de batalhas e acordos estratégicos.	51.91	JOGOS		2025-07-02 21:40:36.471731
44	Aventuras na Masmorra	Jogo cooperativo de exploração de masmorras, com heróis que enfrentam monstros e chefes em busca de tesouros.	44.73	JOGOS		2025-07-02 21:40:36.471731
45	Tesouros e Traições	Jogo de blefe e negociação em um mercado de artefatos, onde aliados podem virar inimigos a qualquer momento.	11.14	JOGOS		2025-07-02 21:40:36.471731
46	Conquista de Aldeias	Jogo de construção de vilarejos e alianças, com fases de desenvolvimento econômico e conflito entre jogadores.	64.53	JOGOS		2025-07-02 21:40:36.471732
47	Império Antigo	Jogo de civilização que acompanha o desenvolvimento de uma sociedade desde a Idade da Pedra até a Era do Bronze.	71.43	JOGOS		2025-07-02 21:40:36.471732
48	Comércio Colonial	Jogo de rotas comerciais em portos coloniais, com foco em transporte de mercadorias e gestão de tripulação.	76.60	JOGOS		2025-07-02 21:40:36.471732
49	Expedição ao Deserto	Jogo de sobrevivência ambientado em desertos perigosos, com gerenciamento de água e recursos para alcançar o oásis.	19.74	JOGOS		2025-07-02 21:40:36.471733
50	Navegadores do Oceano	Jogo de exploração marítima para descobrir novas terras e estabelecer rotas, evitando tempestades e piratas.	19.24	JOGOS		2025-07-02 21:40:36.471733
51	Colonizadores da Lua	Jogo de colonização espacial onde jogadores constroem bases lunares e extraem recursos em um ambiente hostil.	85.77	JOGOS		2025-07-02 21:40:36.471733
52	Batalha das Sombras	Jogo tático de combate furtivo em ambientes escuros, focado em stealth e ações silenciosas.	45.31	JOGOS		2025-07-02 21:40:36.471734
53	Mistérios de Avalon	Jogo de dedução e investigação em uma ilha lendária, desvendando segredos antigos através de pistas.	84.65	JOGOS		2025-07-02 21:40:36.471734
54	Corrida das Estrelas	Jogo de corrida espacial com naves customizáveis, onde velocidade e manobras fazem diferença.	62.13	JOGOS		2025-07-02 21:40:36.471734
55	Ilha Proibida	Jogo cooperativo de resgate de relíquias em ruínas submersas, evitando o afundamento da ilha.	91.32	JOGOS		2025-07-02 21:40:36.471734
56	Senhores do Tabuleiro	Jogo de controle de áreas e diplomacia, onde alianças e traições definem o vencedor.	61.95	JOGOS		2025-07-02 21:40:36.471735
57	Mercadores de Veneza	Jogo de negociação de especiarias e recursos na Renascença, com foco em transporte fluvial.	65.28	JOGOS		2025-07-02 21:40:36.471735
58	Rota da Seda	Jogo de comércio terrestre pela Rota da Seda, gerenciando caravanas e segurança contra saques.	78.45	JOGOS		2025-07-02 21:40:36.471735
59	Guardião da Floresta	Jogo de proteção de habitats naturais, onde jogadores cooperam para afastar invasores e poluição.	21.63	JOGOS		2025-07-02 21:40:36.471736
60	Conspiração Real	Jogo de intrigas palacianas, com cartas de conspiração e alianças secretas para derrubar o rei.	36.73	JOGOS		2025-07-02 21:40:36.471736
61	Miniatura Cavaleiro de Prata	Cavaleiro em armadura prateada, esculpido em resina com detalhes finos.	22.62	MINIATURAS		2025-07-02 21:41:05.927418
62	Miniatura Dragão Carmesim	Dragão alado em pose de ataque, pintado em tons de vermelho profundo.	66.53	MINIATURAS		2025-07-02 21:41:05.927422
63	Miniatura Elfa Arqueira	Figura de elfa arqueira segurando arco e flecha, base texturizada com folhas.	45.67	MINIATURAS		2025-07-02 21:41:05.927423
64	Miniatura Mago Arcano	Mago com cajado ornamentado e manto esvoaçante, detalhes em dourado.	93.74	MINIATURAS		2025-07-02 21:41:05.927423
65	Miniatura Goblin Risonho	Goblin malévolo com adagas curvas, escultura em resina verde vibrante.	72.50	MINIATURAS		2025-07-02 21:41:05.927424
66	Miniatura Bárbaro Selvagem	Guerreiro musculoso empunhando machado duplo, base rochosa gravada.	68.06	MINIATURAS		2025-07-02 21:41:05.927425
67	Miniatura Paladino Sagrado	Paladino em armadura dourada com espada flamejante e escudo cruzado.	71.07	MINIATURAS		2025-07-02 21:41:05.927425
68	Miniatura Vampiro Noturno	Figura sombria de vampiro com capa e presas expostas, acabamento fosco.	63.89	MINIATURAS		2025-07-02 21:41:05.927426
69	Miniatura Fada da Floresta	Pequena fada com asas translúcidas, flores esculpidas à sua volta.	94.21	MINIATURAS		2025-07-02 21:41:05.927426
70	Miniatura Necromante	Feiticeiro levantando esqueletos, base adornada com crânios.	11.88	MINIATURAS		2025-07-02 21:41:05.927427
71	Miniatura Arqueiro Anão	Anão arqueiro armado com besta, barba trançada em alto relevo.	19.80	MINIATURAS		2025-07-02 21:41:05.927427
72	Miniatura Monge Zen	Monge em pose de meditação, base com flores de lótus e rochas.	45.09	MINIATURAS		2025-07-02 21:41:05.927428
73	Miniatura Troll das Cavernas	Troll enorme com clava, pele texturizada e detalhes de musgo.	73.06	MINIATURAS		2025-07-02 21:41:05.927429
74	Miniatura Dragão de Gelo	Dragão em tons azul-gelo, asas translúcidas e garras afiadas.	32.66	MINIATURAS		2025-07-02 21:41:05.927429
75	Miniatura Caçadora de Demônios	Guerreira ágil com correntes e adagas cerimoniais.	99.12	MINIATURAS		2025-07-02 21:41:05.92743
76	Miniatura Senhor das Sombras	Figura encapuzada com foices curvas, aura nebulosa esculpida.	46.18	MINIATURAS		2025-07-02 21:41:05.927431
77	Miniatura Guardião da Torre	Cavaleiro vitoriano com lança e escudo, base de torre em ruínas.	86.90	MINIATURAS		2025-07-02 21:41:05.927431
78	Miniatura Inquisidor	Clérigo imponente com maça e livro sagrado em punho.	51.72	MINIATURAS		2025-07-02 21:41:05.927432
79	Miniatura Centauro Guerreiro	Centauro empunhando espada longa, crina esculpida em movimento.	35.68	MINIATURAS		2025-07-02 21:41:05.927433
80	Miniatura Fênix Renascida	Pássaro mitológico com asas abertas e detalhes de chamas.	76.63	MINIATURAS		2025-07-02 21:41:05.927433
81	Chaveiro Espada Épica	Chaveiro em metal prateado no formato de espada medieval com acabamento detalhado.	40.85	ACESSORIOS		2025-07-02 21:41:35.571971
82	Porta Dados em Madeira	Suporte em madeira de reflorestamento para manter seu conjunto de dados organizado.	25.36	ACESSORIOS		2025-07-02 21:41:35.571974
83	Tapete de Mesa RPG	Tapete de neoprene com grid quadriculado e ilustrações de mapas antigos.	50.11	ACESSORIOS		2025-07-02 21:41:35.571975
84	Bolsa de Aventura	Bolsa de lona resistente com vários bolsos para acessórios de RPG.	73.18	ACESSORIOS		2025-07-02 21:41:35.571975
85	Copo D20	Copo de cerâmica com estampa de D20 colorido, ideal para suas bebidas na sessão.	46.33	ACESSORIOS		2025-07-02 21:41:35.571976
86	Estojo de Cartas Pro	Estojo em couro sintético para proteger seus cards de trading e RPG.	97.01	ACESSORIOS		2025-07-02 21:41:35.571976
87	Pingente Runa Ancestral	Colar com pingente em forma de runa gravada em metal envelhecido.	65.55	ACESSORIOS		2025-07-02 21:41:35.571977
88	Bracelete Dragão	Bracelete em liga metálica com detalhes em relevo de dragões.	29.17	ACESSORIOS		2025-07-02 21:41:35.571977
89	Porta Moedas Élfico	Bolsa pequena em tecido bordado com símbolos élficos.	94.43	ACESSORIOS		2025-07-02 21:41:35.571977
90	Anel do Mago	Anel ajustável com cabochão de cristal e símbolos arcanos.	21.87	ACESSORIOS		2025-07-02 21:41:35.571978
91	Capa de Livro de Feitiços	Capa protetora em veludo preto com fecho em botão metálico.	95.15	ACESSORIOS		2025-07-02 21:41:35.571978
92	Lanterna Steampunk	Lanterna de mão com detalhes em bronze e lente de aumento.	44.51	ACESSORIOS		2025-07-02 21:41:35.571979
93	Mapa do Tesouro Rolável	Mapa de tecido com estampa antiga que pode ser enrolado e amarrado.	46.70	ACESSORIOS		2025-07-02 21:41:35.571979
94	Marcadores de Turno	Conjunto de marcadores em acrílico para acompanhar turnos de batalha.	82.40	ACESSORIOS		2025-07-02 21:41:35.571979
95	Bolsa de Dados em Veludo	Bolsa em veludo vermelho com cordão de fechamento reforçado.	95.88	ACESSORIOS		2025-07-02 21:41:35.57198
96	Bandana Guerreira	Bandana estampada em algodão com símbolos de batalha.	39.01	ACESSORIOS		2025-07-02 21:41:35.57198
97	Luvas de Couro Aventureiro	Luvas sem dedos em couro sintético para manuseio preciso.	94.44	ACESSORIOS		2025-07-02 21:41:35.571981
98	Capa de Chuva Portátil	Impermeável, dobra-se em bolsa compacta para suas jornadas.	58.03	ACESSORIOS		2025-07-02 21:41:35.571981
99	Chapéu Aventureiro	Chapéu estilo wide-brim em tecido encerado, resistente a água.	19.32	ACESSORIOS		2025-07-02 21:41:35.571982
100	Cinto de Utilidades	Cinto com várias bolsas e argolas para pendurar equipamentos.	39.67	ACESSORIOS		2025-07-02 21:41:35.571982
101	Grimório Arcano Vol. I	Compêndio de magias básicas com ilustrações detalhadas.	54.04	LIVROS		2025-07-02 21:41:52.665866
102	Crônicas de Eldoria	Saga épica de reinos em guerra e heróis lendários.	84.47	LIVROS		2025-07-02 21:41:52.665869
103	Manual do Guerreiro de Armas Pesadas	Guia completo de combate corpo a corpo e técnicas de espada.	26.18	LIVROS		2025-07-02 21:41:52.665869
104	Bestiário de Monstros	Descrição e estatísticas de mais de 100 criaturas fantásticas.	75.15	LIVROS		2025-07-02 21:41:52.66587
105	Cartografia Antiga	Mapas rústicos das terras esquecidas, desenhados à mão.	10.33	LIVROS		2025-07-02 21:41:52.66587
106	Táticas de Batalha	Estratégias militares para comandantes audaciosos.	39.47	LIVROS		2025-07-02 21:41:52.665871
107	Enciclopédia de Poções	Receitas e ingredientes para efeitos variados e perigosos.	54.03	LIVROS		2025-07-02 21:41:52.665871
108	Histórias Sussurradas	Coletânea de contos de horror noturno e lendas urbanas.	26.96	LIVROS		2025-07-02 21:41:52.665871
109	Almanaque do Mercador	Tabelas de preços, rotas comerciais e dicas de negociação.	25.28	LIVROS		2025-07-02 21:41:52.665871
110	Rituais de Invocação	Rituais proibidos e instruções para convocar entidades.	68.77	LIVROS		2025-07-02 21:41:52.665872
111	Livro dos Dragões	Estudos sobre hábitos, habitats e fraquezas de dragões.	31.60	LIVROS		2025-07-02 21:41:52.665872
112	Crônica dos Salões Eternos	Relatos de aventuras em masmorras sem fim.	72.78	LIVROS		2025-07-02 21:41:52.665872
113	Arte das Armas Mágicas	Como forjar e encantar sua própria espada.	81.70	LIVROS		2025-07-02 21:41:52.665873
114	Poemas da Lua	Coletânea de versos inspiradores sob a luz lunar.	20.41	LIVROS		2025-07-02 21:41:52.665873
115	Guia das Ruínas Perdidas	Descendendo em templos antigos e quebrados.	77.02	LIVROS		2025-07-02 21:41:52.665873
116	Tratado de Alquimia	Transformações químicas para o alquimista iniciante.	33.27	LIVROS		2025-07-02 21:41:52.665874
117	O Atlas das Estrelas	Mapas celestiais para navegadores e magos astrônomos.	69.32	LIVROS		2025-07-02 21:41:52.665874
118	Manual de Ladinos	Técnicas de furtividade, arrombamento e disfarce.	51.79	LIVROS		2025-07-02 21:41:52.665874
119	Fantasia & Realidade	Discussão filosófica sobre mundo imaginário versus real.	99.50	LIVROS		2025-07-02 21:41:52.665875
120	Relíquias Perdidas	Inventário de artefatos lendários e suas localizações.	31.33	LIVROS		2025-07-02 21:41:52.665875
\.


--
-- TOC entry 3370 (class 0 OID 25072)
-- Dependencies: 214
-- Data for Name: product_image; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_image (id, product_id, url, created_at) FROM stdin;
1	1	http://172.18.150.40:5000/static/uploads/1.jpg	2025-07-02 21:46:05.700874
2	2	http://172.18.150.40:5000/static/uploads/2.jpg	2025-07-02 21:49:59.571749
3	3	http://172.18.150.40:5000/static/uploads/3.webp	2025-07-02 21:50:38.578352
4	4	http://172.18.150.40:5000/static/uploads/4.png	2025-07-02 21:51:29.257852
5	5	http://172.18.150.40:5000/static/uploads/5.webp	2025-07-02 21:52:13.093688
6	6	http://172.18.150.40:5000/static/uploads/6.webp	2025-07-02 21:52:50.74009
7	7	http://172.18.150.40:5000/static/uploads/7.avif	2025-07-02 21:53:21.154014
8	8	http://172.18.150.40:5000/static/uploads/8.jpg	2025-07-02 21:54:05.198065
9	9	http://172.18.150.40:5000/static/uploads/9.jpg	2025-07-02 21:54:28.373857
10	10	http://172.18.150.40:5000/static/uploads/10.png	2025-07-02 21:56:39.018873
11	11	http://172.18.150.40:5000/static/uploads/11.webp	2025-07-02 21:57:02.83437
12	12	http://172.18.150.40:5000/static/uploads/12.jpg	2025-07-02 21:58:08.883178
13	13	http://172.18.150.40:5000/static/uploads/13.jpg	2025-07-02 21:59:00.334014
14	14	http://172.18.150.40:5000/static/uploads/14.jpg	2025-07-02 21:59:33.571916
15	15	http://172.18.150.40:5000/static/uploads/15.webp	2025-07-02 21:59:57.708775
16	16	http://172.18.150.40:5000/static/uploads/16.jpg	2025-07-02 22:00:27.935431
17	17	http://172.18.150.40:5000/static/uploads/17.webp	2025-07-02 22:00:49.911875
18	18	http://172.18.150.40:5000/static/uploads/18.jpg	2025-07-02 22:01:39.150296
19	19	http://172.18.150.40:5000/static/uploads/19.jpg	2025-07-02 22:02:12.610856
20	20	http://172.18.150.40:5000/static/uploads/20.jpg	2025-07-02 22:02:55.022729
21	21	http://172.18.150.40:5000/static/uploads/21.png	2025-07-02 22:04:51.254008
22	22	http://172.18.150.40:5000/static/uploads/22.webp	2025-07-02 22:05:15.966185
23	23	http://172.18.150.40:5000/static/uploads/23.jpg	2025-07-02 22:05:38.374592
24	24	http://172.18.150.40:5000/static/uploads/24.webp	2025-07-02 22:06:08.300995
25	25	http://172.18.150.40:5000/static/uploads/25.jpg	2025-07-02 22:06:39.60423
26	26	http://172.18.150.40:5000/static/uploads/26.jpg	2025-07-02 22:07:21.608251
27	27	http://172.18.150.40:5000/static/uploads/27.webp	2025-07-02 22:07:45.54752
28	28	http://172.18.150.40:5000/static/uploads/28.webp	2025-07-02 22:08:16.704408
29	29	http://172.18.150.40:5000/static/uploads/29.jpg	2025-07-02 22:08:37.89897
30	30	http://172.18.150.40:5000/static/uploads/30.webp	2025-07-02 22:09:10.559539
31	31	http://172.18.150.40:5000/static/uploads/31.webp	2025-07-02 22:09:45.719671
32	32	http://172.18.150.40:5000/static/uploads/32.webp	2025-07-02 22:10:36.360047
33	33	http://172.18.150.40:5000/static/uploads/33.webp	2025-07-02 22:11:02.556164
34	34	http://172.18.150.40:5000/static/uploads/34.jpg	2025-07-02 22:11:42.361502
35	35	http://172.18.150.40:5000/static/uploads/35.jpg	2025-07-02 22:12:09.828873
36	36	http://172.18.150.40:5000/static/uploads/36.jpg	2025-07-02 22:12:43.253208
37	37	http://172.18.150.40:5000/static/uploads/37.webp	2025-07-02 22:13:08.174656
38	38	http://172.18.150.40:5000/static/uploads/38.jpg	2025-07-02 22:13:53.590336
39	39	http://172.18.150.40:5000/static/uploads/39.webp	2025-07-02 22:14:15.382852
40	40	http://172.18.150.40:5000/static/uploads/40.webp	2025-07-02 22:14:40.167342
\.


--
-- TOC entry 3366 (class 0 OID 25054)
-- Dependencies: 210
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, full_name, email, password_hash, created_at) FROM stdin;
\.


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 217
-- Name: cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_item_id_seq', 1, false);


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 215
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_item_id_seq', 1, false);


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 211
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_id_seq', 120, true);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 213
-- Name: product_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_image_id_seq', 40, true);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 3217 (class 2606 OID 25101)
-- Name: cart_item cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 25118)
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 25089)
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 25077)
-- Name: product_image product_image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_image
    ADD CONSTRAINT product_image_pkey PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 25070)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 25061)
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- TOC entry 3209 (class 2606 OID 25059)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 25107)
-- Name: cart_item cart_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- TOC entry 3222 (class 2606 OID 25102)
-- Name: cart_item cart_item_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3224 (class 2606 OID 25119)
-- Name: order_item order_item_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- TOC entry 3225 (class 2606 OID 25124)
-- Name: order_item order_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- TOC entry 3221 (class 2606 OID 25090)
-- Name: order order_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3220 (class 2606 OID 25078)
-- Name: product_image product_image_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_image
    ADD CONSTRAINT product_image_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


-- Completed on 2025-07-02 19:19:06 -03

--
-- PostgreSQL database dump complete
--

