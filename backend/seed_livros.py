import random
from app import app, db, Product, CategoryEnum

def run_seed():
    with app.app_context():

        livros_seed = [
            ("Grimório Arcano Vol. I",           "Compêndio de magias básicas com ilustrações detalhadas."),
            ("Crônicas de Eldoria",              "Saga épica de reinos em guerra e heróis lendários."),
            ("Manual do Guerreiro de Armas Pesadas", "Guia completo de combate corpo a corpo e técnicas de espada."),
            ("Bestiário de Monstros",            "Descrição e estatísticas de mais de 100 criaturas fantásticas."),
            ("Cartografia Antiga",               "Mapas rústicos das terras esquecidas, desenhados à mão."),
            ("Táticas de Batalha",               "Estratégias militares para comandantes audaciosos."),
            ("Enciclopédia de Poções",           "Receitas e ingredientes para efeitos variados e perigosos."),
            ("Histórias Sussurradas",            "Coletânea de contos de horror noturno e lendas urbanas."),
            ("Almanaque do Mercador",            "Tabelas de preços, rotas comerciais e dicas de negociação."),
            ("Rituais de Invocação",             "Rituais proibidos e instruções para convocar entidades."),
            ("Livro dos Dragões",                "Estudos sobre hábitos, habitats e fraquezas de dragões."),
            ("Crônica dos Salões Eternos",       "Relatos de aventuras em masmorras sem fim."),
            ("Arte das Armas Mágicas",           "Como forjar e encantar sua própria espada."),
            ("Poemas da Lua",                    "Coletânea de versos inspiradores sob a luz lunar."),
            ("Guia das Ruínas Perdidas",         "Descendendo em templos antigos e quebrados."),
            ("Tratado de Alquimia",              "Transformações químicas para o alquimista iniciante."),
            ("O Atlas das Estrelas",             "Mapas celestiais para navegadores e magos astrônomos."),
            ("Manual de Ladinos",                "Técnicas de furtividade, arrombamento e disfarce."),
            ("Fantasia & Realidade",             "Discussão filosófica sobre mundo imaginário versus real."),
            ("Relíquias Perdidas",               "Inventário de artefatos lendários e suas localizações.")
        ]

        for name, desc in livros_seed:
            prod = Product(
                name=name,
                description=desc,
                price=round(random.uniform(10.0, 100.0), 2),
                category=CategoryEnum.LIVROS,
                image_url=""
            )
            db.session.add(prod)

        db.session.commit()
        print(f"Seeded {len(livros_seed)} produtos na categoria LIVROS.")

if __name__ == '__main__':
    run_seed()


