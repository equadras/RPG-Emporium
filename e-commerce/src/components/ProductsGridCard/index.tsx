import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { Card, Col, message, Row, Typography } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"

interface ICommerceCard {
  product_name: string
  product_collection: string
  product_price: number
  product_images: string[]
  product_favorite: boolean
  product_code: number
  product_category?: string
  product_discount?: number
}
const ProductsGridCard: React.FC<ICommerceCard> = ({product_name, product_collection, product_price, product_images, product_favorite, product_discount, product_code, product_category}) => {
   
  const [favoriteProduct, setFavoriteProduct] = useState(() => {
    const storagedValues = localStorage.getItem('@Danti:FavoriteProducts')
    const splitted = storagedValues?.split(',') as string[] || []
    return storagedValues && splitted?.includes(product_code.toString())
  })
  const [heartHover, setHeartHover] = useState(false)
  const { setFavoriteProductsIds } = useProducts()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();

  
  function handleClickToViewProduct() {
    navigate(`/products/${product_name?.toLowerCase()?.replace(" ", "-")}`, {state: {
      product_name, product_collection, product_price, product_images, product_favorite, product_discount, product_code, product_category
    }})
  }

  const addToWishList= () => {
    messageApi.open({
      type: 'success',
      content: 'Produto adicionado a lista de desejos!'
    });
  };

  const removeFromWishList= () => {
    messageApi.open({
      type: 'success',
      content: 'Produto removido da lista de desejos!'
    });
  };

  async function handleClickFavoriteProduct(event: React.MouseEvent) {
    event.stopPropagation(); 
    const storagedValues = localStorage.getItem('@Danti:FavoriteProducts')
    const splitted = storagedValues?.split(',') as string[] || []
    if (storagedValues && splitted?.includes(product_code.toString())) {
      const filteredValues = splitted?.filter(a => Number(a) !== product_code)
      setFavoriteProductsIds(filteredValues)
      setFavoriteProduct(false)
      removeFromWishList()
      localStorage.setItem("@Danti:FavoriteProducts", filteredValues?.join(','))
    } else {
      const newFavoriteValues = [...splitted, product_code?.toString()]
      setFavoriteProduct(true)
      addToWishList()
      localStorage.setItem("@Danti:FavoriteProducts", newFavoriteValues?.join(','))
    }
  }
  
  return (
    <Col xs={12} sm={10} md={8} xxl={6} className="product-in-category-card" >
      {contextHolder}
      <Card className="product-view-card" onClick={handleClickToViewProduct}> 
        <Row style={{marginBottom: '-25px'}}>
          <img
            alt={product_name}
            src={product_images[0]}
            className="product-card-image"
          />
          <div onMouseEnter={() => setHeartHover(true)} onMouseLeave={() => setHeartHover(false)}>
            {heartHover || favoriteProduct ? (<HeartFilled onClick={handleClickFavoriteProduct} className="product-show-favorite-icon"/>) : (
              <HeartOutlined onClick={handleClickFavoriteProduct} className='product-show-favorite-icon'/>
            )}
          </div>
        </Row>
        <Row>
          <Typography.Text ellipsis={{tooltip: product_name}} className="product-name">
            {product_name}
          </Typography.Text>
        </Row>
        <Row>
          <Typography.Text ellipsis={{tooltip: product_collection}} className="product-collection">
            {product_collection}
          </Typography.Text>
        </Row>
        <Row>
          {product_discount ? (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Typography.Text className="product-price-with-discount">
              {`R$ ${product_price}`}
              </Typography.Text>
              <Typography.Text className="product-price-without-discount">
                {`R$ ${(product_price - (product_price*product_discount/100)).toFixed(2)}`}
              </Typography.Text>
            </div>
          ) : (
            <Typography.Text className="product-price-without-discount">
              {`R$ ${product_price}`}
            </Typography.Text>
          )}
          
        </Row>
      </Card>
    </Col>
  )
}

export default ProductsGridCard