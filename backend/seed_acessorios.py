import random
from app import app, db, Product, CategoryEnum

def run_seed():
    with app.app_context():
        acessorios_seed = [
            ("Chaveiro Espada Épica",        "Chaveiro em metal prateado no formato de espada medieval com acabamento detalhado."),
            ("Porta Dados em Madeira",       "Suporte em madeira de reflorestamento para manter seu conjunto de dados organizado."),
            ("Tapete de Mesa RPG",           "Tapete de neoprene com grid quadriculado e ilustrações de mapas antigos."),
            ("Bolsa de Aventura",            "Bolsa de lona resistente com vários bolsos para acessórios de RPG."),
            ("Copo D20",                     "Copo de cerâmica com estampa de D20 colorido, ideal para suas bebidas na sessão."),
            ("Estojo de Cartas Pro",         "Estojo em couro sintético para proteger seus cards de trading e RPG."),
            ("Pingente Runa Ancestral",      "Colar com pingente em forma de runa gravada em metal envelhecido."),
            ("Bracelete Dragão",             "Bracelete em liga metálica com detalhes em relevo de dragões."),
            ("Porta Moedas Élfico",          "Bolsa pequena em tecido bordado com símbolos élficos."),
            ("Anel do Mago",                 "Anel ajustável com cabochão de cristal e símbolos arcanos."),
            ("Capa de Livro de Feitiços",    "Capa protetora em veludo preto com fecho em botão metálico."),
            ("Lanterna Steampunk",           "Lanterna de mão com detalhes em bronze e lente de aumento."),
            ("Mapa do Tesouro Rolável",      "Mapa de tecido com estampa antiga que pode ser enrolado e amarrado."),
            ("Marcadores de Turno",          "Conjunto de marcadores em acrílico para acompanhar turnos de batalha."),
            ("Bolsa de Dados em Veludo",     "Bolsa em veludo vermelho com cordão de fechamento reforçado."),
            ("Bandana Guerreira",            "Bandana estampada em algodão com símbolos de batalha."),
            ("Luvas de Couro Aventureiro",   "Luvas sem dedos em couro sintético para manuseio preciso."),
            ("Capa de Chuva Portátil",       "Impermeável, dobra-se em bolsa compacta para suas jornadas."),
            ("Chapéu Aventureiro",           "Chapéu estilo wide-brim em tecido encerado, resistente a água."),
            ("Cinto de Utilidades",          "Cinto com várias bolsas e argolas para pendurar equipamentos.")
        ]


        # Insere cada dado sem imagem (image_url vazio)
        for name, desc in acessorios_seed :
            prod = Product(
                name=name,
                description=desc,
                price=round(random.uniform(10.0, 100.0), 2),
                category=CategoryEnum.ACESSORIOS,
                image_url=""
            )
            db.session.add(prod)

        db.session.commit()
        print(f"Seeded {len(acessorios_seed )} produtos na categoria ACESSORIOS.")

if __name__ == '__main__':
    run_seed()

