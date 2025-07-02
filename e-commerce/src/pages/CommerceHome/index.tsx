import React from 'react'
import { useProducts } from '../../hooks/useProducts'
import CommerceContent, { ICommerceCard } from '../../components/CommerceContent' 
import { Button, Col, Row, Typography } from 'antd'

const bannerImage = '/e-commerce/assets/emporium-banner.png'

const CommerceHome: React.FC = () => {
  const { searchedProducts, favoriteProductsIds } = useProducts()

  const scrollToCategory = () => {
    const element = document.getElementById('category_label')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Reduced banner */}
      <div
        className="danti-banner-reduced"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="banner-information-reduced">
          <Row>
            <Typography.Text className="info-title">
              BEM-VINDO À RPG EMPORIUM!
            </Typography.Text>
          </Row>
          <Row>
            <Typography.Text className="info-description-2">
              Jogue com autenticidade. Jogue com RPG EMPORIUM.
            </Typography.Text>
          </Row>
          <Row>
            <Button className="info-button" onClick={scrollToCategory}>
              COMPRAR AGORA
            </Button>
          </Row>
        </div>
      </div>

      {/* Full banner */}
      <div
        className="danti-banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <Row>
          <Col xs={12}>
            <div className="banner-information">
              <Row>
                <Typography.Text className="info-title">
                  BEM-VINDO À RPG EMPORIUM!
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text className="info-description">
                  Descubra uma nova forma de viver o RPG dentro e fora das mesas. 
                  Unimos paixão pelo jogo e qualidade para oferecer produtos que refletem seu estilo de aventura. 
                  Explore nossa coleção exclusiva e encontre os itens perfeitos para tornar cada sessão ainda mais épica.
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text className="info-description-2">
                  Jogue com autenticidade. Jogue com RPG EMPORIUM.
                </Typography.Text>
              </Row>
              <Row>
                <Button className="info-button" onClick={scrollToCategory}>
                  COMPRAR AGORA
                </Button>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <br />

      {searchedProducts.map((category, index) => {
        // 1) Map ProductDTO[] → ICommerceCard[]
        const cards: ICommerceCard[] = category.products.map(p => ({
          name:       p.name,
          collection: category.label,              // or use p.description if preferred
          price:      Number(p.price),
          images:     p.images,
          favorite:   favoriteProductsIds.includes(p.id.toString()),
          code:       p.id,
          category:   category.label,
          // product_discount:   /* add here if you have discount info */
        }))

        return (
          <React.Fragment key={category.label}>
            {/* mid-banner after 2nd category */}
            {index === 2 && (
              <div className="danti-mid-banner">
                <div className="danti-mid-banner-content">
                  <Row justify="center">
                    <Typography.Text className="mid-title">
                      Descubra uma Aventura Única
                    </Typography.Text>
                  </Row>
                  <Row justify="center">
                    <Typography.Text className="mid-description">
                      Descubra novos itens para sua 
                      historia ficar ainda mais completa!
                    </Typography.Text>
                  </Row>
                </div>
              </div>
            )}

            {/* mid-banner after 4th category */}
            {index === 4 && (
              <div className="danti-mid-banner-2">
                <div className="danti-mid-banner-content">
                  <Row justify="center">
                    <Typography.Text className="mid-title">
                      Aventuras Que Inspiram
                    </Typography.Text>
                  </Row>
                  <Row justify="center">
                    <Typography.Text className="mid-description">
                      Explore as últimas novidades e encontre acessorios
                      que combinem com seu grupo.
                    </Typography.Text>
                  </Row>
                </div>
              </div>
            )}

            {/* 2) Pass the newly shaped cards array */}
            <CommerceContent
              category={category.label}
              products={cards}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}

export default CommerceHome
