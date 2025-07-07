import { Row, Typography } from "antd"
import { useTranslation } from "react-i18next"
import ProductsGridCard from "../../components/ProductsGridCard"
import { useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"

const WishListPage: React.FC = () => {
  const { t } = useTranslation()
  const { searchedProducts } = useProducts()
  const storagedFavorites = localStorage.getItem('@Danti:FavoriteProducts')?.split(',') || []
  const wishListProducts = searchedProducts.flatMap(category => 
    category?.products?.filter(product => storagedFavorites?.includes(product.id.toString())) || []
  ) || []

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  return (
    <>
      <div className="category-header">
        <Row>
          <Typography.Text className="category-name">
            {t('Minha lista de desejos')}
          </Typography.Text>
        </Row>
      </div>
      <div className="products-view">
        <div className="reduced-view">
          <Row gutter={[16, 16]} justify="center" style={{marginBottom: 50}}> 
              {wishListProducts?.map((product) => {
                return (
                  <ProductsGridCard 
                    product_name={product?.name} 
                    product_collection={product?.category} 
                    product_price={product?.price} 
                    product_images={product?.images} 
                    product_favorite={storagedFavorites?.includes(product.id.toString())} 
                    product_discount={undefined}
                    product_code={product?.id}
                  />
                )
              })}
          </Row>
        </div>
      </div>
    </>
  )
}

export default WishListPage