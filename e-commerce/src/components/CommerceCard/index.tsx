import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { Card, message, Row, Typography } from "antd"
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
  product_category: string
  product_discount?: number
}

const CommerceCard:React.FC<ICommerceCard> = ({product_name, product_collection, product_price, product_images, product_favorite, product_discount, product_code, product_category }) => {
  
  const imgSrc = product_images && product_images.length > 0 ? product_images[0]: 'public/placeholder.png' 

  const [favoriteProduct, setFavoriteProduct] = useState(() => {
    const storagedValues = localStorage.getItem('@Danti:FavoriteProducts')
    const splitted = storagedValues?.split(',') as string[] || []
    return storagedValues && splitted?.includes(product_code.toString())
  })
  const [heartHover, setHeartHover] = useState(false)
  const navigate = useNavigate()
  const { setFavoriteProductsIds } = useProducts()
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
      removeFromWishList()
      setFavoriteProduct(false)
      localStorage.setItem("@Danti:FavoriteProducts", filteredValues?.join(','))
    } else {
      const newFavoriteValues = [...splitted, product_code?.toString()]
      addToWishList()
      setFavoriteProduct(true)
      localStorage.setItem("@Danti:FavoriteProducts", newFavoriteValues?.join(','))
    }
  }

  return (
    <Card
      className="product-card"
      onClick={handleClickToViewProduct}
    > 
      {contextHolder}
      <Row style={{marginBottom: '-25px'}}>
        <img
          alt={product_name}
           src={imgSrc}
          className="card-image"
        />
        <div onMouseEnter={() => setHeartHover(true)} onMouseLeave={() => setHeartHover(false)}>
          {heartHover || favoriteProduct ? (<HeartFilled onClick={handleClickFavoriteProduct} className="main-product-favorite-icon" />) : (
            <HeartOutlined onClick={handleClickFavoriteProduct} className='main-product-favorite-icon'/>
          )}
        </div>
      </Row>
      <Row>
        <Typography.Text ellipsis={{tooltip: product_name}} className="product-name" >
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
  )
}

export default CommerceCard