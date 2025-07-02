import random
from app import app, db, Product, CategoryEnum

def run_seed():
    with app.app_context():

        jogos_seed = [
            ("Caravana dos Magos", "Jogo de estratégia onde cada jogador lidera uma caravana de magos em um reino místico, coletando artefatos e enfrentando desafios."),
            ("Labirinto dos Dragões", "Jogo de exploração cooperativa em um labirinto cheio de dragões antigos, com mecânica de escuta e dedução para evitar armadilhas."),
            ("Reinos em Conflito", "Jogo de guerra e diplomacia onde facções medievais disputam territórios através de batalhas e acordos estratégicos."),
            ("Aventuras na Masmorra", "Jogo cooperativo de exploração de masmorras, com heróis que enfrentam monstros e chefes em busca de tesouros."),
            ("Tesouros e Traições", "Jogo de blefe e negociação em um mercado de artefatos, onde aliados podem virar inimigos a qualquer momento."),
            ("Conquista de Aldeias", "Jogo de construção de vilarejos e alianças, com fases de desenvolvimento econômico e conflito entre jogadores."),
            ("Império Antigo", "Jogo de civilização que acompanha o desenvolvimento de uma sociedade desde a Idade da Pedra até a Era do Bronze."),
            ("Comércio Colonial", "Jogo de rotas comerciais em portos coloniais, com foco em transporte de mercadorias e gestão de tripulação."),
            ("Expedição ao Deserto", "Jogo de sobrevivência ambientado em desertos perigosos, com gerenciamento de água e recursos para alcançar o oásis."),
            ("Navegadores do Oceano", "Jogo de exploração marítima para descobrir novas terras e estabelecer rotas, evitando tempestades e piratas."),
            ("Colonizadores da Lua", "Jogo de colonização espacial onde jogadores constroem bases lunares e extraem recursos em um ambiente hostil."),
            ("Batalha das Sombras", "Jogo tático de combate furtivo em ambientes escuros, focado em stealth e ações silenciosas."),
            ("Mistérios de Avalon", "Jogo de dedução e investigação em uma ilha lendária, desvendando segredos antigos através de pistas."),
            ("Corrida das Estrelas", "Jogo de corrida espacial com naves customizáveis, onde velocidade e manobras fazem diferença."),
            ("Ilha Proibida", "Jogo cooperativo de resgate de relíquias em ruínas submersas, evitando o afundamento da ilha."),
            ("Senhores do Tabuleiro", "Jogo de controle de áreas e diplomacia, onde alianças e traições definem o vencedor."),
            ("Mercadores de Veneza", "Jogo de negociação de especiarias e recursos na Renascença, com foco em transporte fluvial."),
            ("Rota da Seda", "Jogo de comércio terrestre pela Rota da Seda, gerenciando caravanas e segurança contra saques."),
            ("Guardião da Floresta", "Jogo de proteção de habitats naturais, onde jogadores cooperam para afastar invasores e poluição."),
            ("Conspiração Real", "Jogo de intrigas palacianas, com cartas de conspiração e alianças secretas para derrubar o rei.")
        ]

            # Insere cada dado sem imagem (image_url vazio)
        for name, desc in jogos_seed :
            prod = Product(
                name=name,
                description=desc,
                price=round(random.uniform(10.0, 100.0), 2),
                category=CategoryEnum.JOGOS,
                image_url=""
            )
            db.session.add(prod)

        db.session.commit()
        print(f"Seeded {len(jogos_seed )} produtos na categoria JOGOS.")

if __name__ == '__main__':
    run_seed()

