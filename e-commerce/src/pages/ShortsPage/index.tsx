import { Row, Typography } from "antd"
import { useTranslation } from "react-i18next"
import ProductsGridCard from "../../components/ProductsGridCard"
import { useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"

const ShortsPage: React.FC = () => {
  const { t } = useTranslation()
  const { searchedProducts } = useProducts()

  const products = searchedProducts?.filter((a) => a?.label === 'shorts')[0]?.products

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  return (
    <>
      <div className="category-header">
        <Row>
          <Typography.Text className="category-product-label">
            {'Categoria'}
          </Typography.Text>
        </Row>
        <Row>
          <Typography.Text className="category-name">
            {t('shorts')}
          </Typography.Text>
        </Row>
      </div>
      <div className="products-view">
        <div className="reduced-view">
          <Row gutter={[16, 16]} justify="center" style={{marginBottom: 50}}> 
              {products?.map((product) => {
                return (
                  <ProductsGridCard product_name={product?.name} product_collection={product?.collection} 
                  product_price={product?.price} product_images={product?.images} product_favorite={product?.favorite}
                  product_code={product?.code} product_category="shorts"
                  />
                )
              })}
          </Row>
        </div>
      </div>
    </>
  )
}

export default ShortsPage