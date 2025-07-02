import random
from app import app, db, Product, CategoryEnum

def run_seed():
    with app.app_context():
        cenarios_seed = [
            ("Grid Modular Florestal",        "Peças de piso hexagonal com relevo de folhas e raízes, ideal para montar caminhos na floresta."),
            ("Torre de Vigia em Ruínas",      "Torre alta partida com janelas quebradas e escada em espiral desmoronada."),
            ("Muralha de Pedra Antiga",       "Seção de muralha com pedras gastas pelo tempo e musgo no topo."),
            ("Ponte de Madeira Suspensa",     "Passarela estreita em tábuas envelhecidas, sustentada por cordas trançadas."),
            ("Altar de Pedra Rúnico",         "Pedestal circular com runas gravadas e brasas frias no centro."),
            ("Portão de Ferro de Masmorra",   "Grande portão pesado com grade reforçada e dobradiças enferrujadas."),
            ("Coluna Coríntia Quebrada",      "Coluna clássica partida ao meio, com capitel ornamentado no chão."),
            ("Pilar Gótico Elevado",          "Pilar estreito em estilo ogival, perfeito para interiores de catedrais."),
            ("Barricada de Barris e Caixas",  "Pilhas de barris lacrados e caixas empilhadas para bloquear passagens."),
            ("Arco Triunfal Desgastado",      "Arco de triunfo com esculturas esculpidas, parcialmente destruído."),
            ("Poço de Pedras Antigas",        "Borda circular de poço com correntes penduradas e água estagnada."),
            ("Cercado de Madeira Rústica",    "Seção de cerca rústica feita com troncos fincados à mão."),
            ("Torre de Muralha Baixa",        "Estrutura defensiva com ameias e pequenas aberturas para arqueiros."),
            ("Pedra de Sinalização",          "Monólito gravado com flechas e símbolos, orienta aventureiros."),
            ("Plataforma Elevada de Madeira", "Deck quadrado com cerca baixa, usado para vigília ou cerimônias."),
            ("Túmulo de Mármore Entalhado",   "Lápide ornamentada com brasão desgastado e grade baixa ao redor."),
            ("Altar de Sacrifício de Pedra",  "Mesa de pedra com sulcos para drenagem de líquidos ritualísticos."),
            ("Pórtico de Entrada Arqueado",   "Portal com arco em ogiva, ladeado por colunas finas e entalhes florais."),
            ("Canaleta de Água Corrente",     "Pequena vala de pedra por onde flui água cristalina – ideal para dioramas de vila."),
            ("Pedra do Dragão Caído",         "Monumento ao ar livre em forma de cabeça de dragão partida, com escamas rachadas.")
        ]

        for name, desc in cenarios_seed:
            prod = Product(
                name=name,
                description=desc,
                price=round(random.uniform(10.0, 100.0), 2),
                category=CategoryEnum.CENARIOS,
                image_url=""
            )
            db.session.add(prod)

        db.session.commit()
        print(f"Seeded {len(cenarios_seed)} produtos na categoria CENARIOS.")

if __name__ == '__main__':
    run_seed()

