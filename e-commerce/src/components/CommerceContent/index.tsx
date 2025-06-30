import { Layout, Typography } from 'antd';
import CommerceCard from '../CommerceCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Content } = Layout;

export interface ICommerceCard {
  name: string
  collection: string
  price: number
  images: string[]
  favorite: boolean
  code: number
  discount?: number
}

interface ICommerceContent {
  category: string
  products: ICommerceCard[]
}

const CommerceContent: React.FC<ICommerceContent> = ({category, products}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleClickCategory () {
    navigate(category)
  }
  
  return (
    <Content className='content-main-layout' >
      <div id="category_label"><br/></div>
      <Typography.Text className={'category-label'} onClick={handleClickCategory} id="category_label">{t(category)}</Typography.Text>
      <div className='content-wrap' >
        {products?.map((product) => {
          return (
            <CommerceCard  key={product.code} product_name={product?.name} product_collection={product?.collection} 
            product_price={product?.price} product_images={product?.images} product_favorite={product?.favorite} product_discount={product?.discount}
            product_code={product?.code} product_category={category}
            />
          )
        })}
      </div>
    </Content>
  )
}

export default CommerceContent