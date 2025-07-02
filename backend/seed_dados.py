# backend/seed.py
import random
from app import app, db, Product, CategoryEnum

def run_seed():
    with app.app_context():
        dados_seed = [
            ("Dado Esmeralda D6",          "Dado de seis faces em resina verde esmeralda translúcida, acabamento polido."),
            ("Dado Ônix D20",              "Dado de vinte faces em ônix sintético, com numeração gravada a laser."),
            ("Dado Coral D10",             "Dado de dez faces em acrílico corais vibrantes, ideal para combos."),
            ("Dado Safira Blue D8",        "Dado de oito faces em azul safira metálico, brilho perolado."),
            ("Dado Citrino D12",           "Dado de doze faces em resina amarela citrina, efeito marmorizado."),
            ("Dado Grafite D4",            "Dado de quatro faces em plástico grafite, leve e resistente."),
            ("Dado Aurora D20",            "Dado de vinte faces com pigmento que muda de cor conforme a luz."),
            ("Dado Nebulosa D6",           "Conjunto D6 com padrão galáctico em azul e roxo turbilhonante."),
            ("Dado Rubi Flamejante D10",   "Dado de dez faces em vermelho rubi com inserções que lembram chamas."),
            ("Dado Jade Imperial D8",      "Dado de oito faces em verde jade escuro, acabamento acetinado."),
            ("Dado Lunar D12",             "Dado de doze faces com numeração prateada sobre fundo azul perolado."),
            ("Dado Eclipse Solar D4",      "D4 em preto opaco, com detalhes em amarelo ouro para simular um eclipse."),
            ("Dado Prisma Arco-íris D20",  "D20 com faces prateadas refletivas, cria arco-íris ao girar."),
            ("Dado Cristal Gélido D6",     "D6 translúcido em tom gelo, sensação de frescor ao toque."),
            ("Dado Madeira Rúnico D10",    "D10 em polímero imitando madeira, com runas gravadas em relevo."),
            ("Dado Pérola D8",             "D8 perolado, brilho sutil que muda conforme o ângulo."),
            ("Dado Oníricon D12",          "D12 em preto fosco com numeração luminosa que brilha no escuro."),
            ("Dado Safira Solar D4",       "D4 em azul profundo com numeração em dourado intenso."),
            ("Dado Espectral D20",         "D20 com acabamento holográfico, prismas que dançam de cor."),
            ("Dado Ametista D6",           "D6 em tom ametista, translucidez rica e acabamento acetinado.")
        ]

        # Insere cada dado sem imagem (image_url vazio)
        for name, desc in dados_seed:
            prod = Product(
                name=name,
                description=desc,
                price=round(random.uniform(10.0, 100.0), 2),
                category=CategoryEnum.DADOS,
                image_url=""
            )
            db.session.add(prod)

        db.session.commit()
        print(f"Seeded {len(dados_seed)} produtos na categoria DADOS.")

if __name__ == '__main__':
    run_seed()

