import random
from app import app, db, Product, CategoryEnum

def run_seed():
    with app.app_context():
        miniaturas_seed = [
            ("Miniatura Cavaleiro de Prata",       "Cavaleiro em armadura prateada, esculpido em resina com detalhes finos."),
            ("Miniatura Dragão Carmesim",          "Dragão alado em pose de ataque, pintado em tons de vermelho profundo."),
            ("Miniatura Elfa Arqueira",            "Figura de elfa arqueira segurando arco e flecha, base texturizada com folhas."),
            ("Miniatura Mago Arcano",              "Mago com cajado ornamentado e manto esvoaçante, detalhes em dourado."),
            ("Miniatura Goblin Risonho",           "Goblin malévolo com adagas curvas, escultura em resina verde vibrante."),
            ("Miniatura Bárbaro Selvagem",         "Guerreiro musculoso empunhando machado duplo, base rochosa gravada."),
            ("Miniatura Paladino Sagrado",         "Paladino em armadura dourada com espada flamejante e escudo cruzado."),
            ("Miniatura Vampiro Noturno",          "Figura sombria de vampiro com capa e presas expostas, acabamento fosco."),
            ("Miniatura Fada da Floresta",         "Pequena fada com asas translúcidas, flores esculpidas à sua volta."),
            ("Miniatura Necromante",               "Feiticeiro levantando esqueletos, base adornada com crânios."),
            ("Miniatura Arqueiro Anão",            "Anão arqueiro armado com besta, barba trançada em alto relevo."),
            ("Miniatura Monge Zen",                "Monge em pose de meditação, base com flores de lótus e rochas."),
            ("Miniatura Troll das Cavernas",       "Troll enorme com clava, pele texturizada e detalhes de musgo."),
            ("Miniatura Dragão de Gelo",           "Dragão em tons azul-gelo, asas translúcidas e garras afiadas."),
            ("Miniatura Caçadora de Demônios",     "Guerreira ágil com correntes e adagas cerimoniais."),
            ("Miniatura Senhor das Sombras",       "Figura encapuzada com foices curvas, aura nebulosa esculpida."),
            ("Miniatura Guardião da Torre",        "Cavaleiro vitoriano com lança e escudo, base de torre em ruínas."),
            ("Miniatura Inquisidor",               "Clérigo imponente com maça e livro sagrado em punho."),
            ("Miniatura Centauro Guerreiro",       "Centauro empunhando espada longa, crina esculpida em movimento."),
            ("Miniatura Fênix Renascida",          "Pássaro mitológico com asas abertas e detalhes de chamas.")
        ]

        for name, desc in miniaturas_seed :
            prod = Product(
                name=name,
                description=desc,
                price=round(random.uniform(10.0, 100.0), 2),
                category=CategoryEnum.MINIATURAS,
                image_url=""
            )
            db.session.add(prod)

        db.session.commit()
        print(f"Seeded {len(miniaturas_seed )} produtos na categoria MINIATURAS.")

if __name__ == '__main__':
    run_seed()

