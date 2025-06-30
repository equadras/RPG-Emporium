import React from 'react'
import { useProducts } from '../../hooks/useProducts'
import CommerceContent, { ICommerceCard } from '../../components/CommerceContent' 
import { Button, Col, Row, Typography } from 'antd'

const bannerImage = '/e-commerce/assets/danti-banner.png'

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
              BEM-VINDO À DANTI!
            </Typography.Text>
          </Row>
          <Row>
            <Typography.Text className="info-description-2">
              Vista-se com autenticidade. Vista-se com DANTI.
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
                  BEM-VINDO À DANTI!
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text className="info-description">
                  Descubra uma nova forma de expressar sua personalidade
                  através da moda. Na DANTI, unimos conforto e estilo para
                  oferecer peças que acompanham você em todos os momentos.
                  Explore nossa coleção exclusiva e encontre o look perfeito
                  para seu dia a dia.
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text className="info-description-2">
                  Vista-se com autenticidade. Vista-se com DANTI.
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
                      Descubra um Estilo Único
                    </Typography.Text>
                  </Row>
                  <Row justify="center">
                    <Typography.Text className="mid-description">
                      Renove seu guarda-roupa com peças versáteis que
                      combinam conforto e sofisticação.
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
                      Tendências Que Inspiram
                    </Typography.Text>
                  </Row>
                  <Row justify="center">
                    <Typography.Text className="mid-description">
                      Explore as últimas novidades da moda e encontre peças
                      que combinem com seu estilo.
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
