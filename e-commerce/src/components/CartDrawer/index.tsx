import { CloseOutlined, MinusOutlined, PlusOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Drawer, Row, Typography, Image, Col, Button, message } from "antd"
import { useEffect, useState } from "react"
import { useCartContent } from "../../hooks/useCardContent"
import { useNavigate } from "react-router-dom"

interface ICartDrawer {
  setVisibleCartDrawer: (value: boolean) => void
}
const CartDrawer: React.FC<ICartDrawer> = ({setVisibleCartDrawer}) => {
  const entries = Object.entries(localStorage)
  const navigate = useNavigate()
  const [cartList, setCartList] = useState(entries?.map((a) => {
    if (a[0]?.includes("@Danti:Cart_Products")) {
      const parsed_product = JSON.parse(a[1])     
      return parsed_product
    }
  })?.filter(b => b))
  const [totalPrice, setTotalPrice] = useState(0)
  const { totalItemsInCard, setTotalItemsInCard } = useCartContent()
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    cartList?.map((product) => {
      setTotalPrice(state => state + 
        (!product?.product_discount ? product?.product_price* product?.product_qty : ((product?.product_price - (product?.product_price*product?.product_discount/100)) * product?.product_qty)
      ))
    })
  }, [])

  function handleClickRemoveFromCart(product_name: string, product_code: number) {
    const formattedName = product_name?.toLowerCase()?.replace(" ", "-")
    localStorage.removeItem(`@Danti:Cart_Products_${formattedName}_${product_code}`)
    const productToRemove = cartList?.filter((p) => p?.product_code === product_code)[0]
    setCartList(cartList?.filter((p) => p?.product_code !== product_code))
    success()
    setTotalItemsInCard(totalItemsInCard - 1)
    setTotalPrice(state => state - 
      (!productToRemove?.product_discount ? productToRemove?.product_price* productToRemove?.product_qty : ((productToRemove?.product_price - (productToRemove?.product_price*productToRemove?.product_discount/100)) * productToRemove?.product_qty)
    ))
  }

  function handleGoToCheckoutPage() {
    setVisibleCartDrawer(false)
    navigate('/checkout/address', {state: {products_list: cartList}})
  }

  const success= () => {
    messageApi.open({
      type: 'success',
      content: 'Produto removido do carrinho!'
    });
  };

  return (
    <Drawer 
      title={
        <Row justify="space-between">
          <div />
          <Typography.Text style={{fontSize: 20, fontWeight: 300, fontFamily: 'Inter'}}>
            {'Meu carrinho'}
          </Typography.Text>
          <ShoppingOutlined style={{fontSize: 20}} />
        </Row>
      }
      open 
      width={700}
      onClose={() => setVisibleCartDrawer(false)}
      className={cartList?.length > 0 ? 'cart-drawer' : 'cart-drawer-empty'}
      footer={
        <>
          {cartList?.length > 0 ? (
            <div className="cart-drawer-footer">
              <Row>
                <Typography.Text className="cart-checkout-taxes">
                  {'Valor de compra e taxas calculados na finalização'}
                </Typography.Text>
              </Row>
              <Row justify="space-between">
                <Typography.Text className="cart-total-label">
                  {'TOTAL'}
                </Typography.Text>
                <Typography.Text className="cart-total-price">
                  {`R$ ${totalPrice?.toFixed(2)}`}
                </Typography.Text>
              </Row>
              <Row justify="center">
                <Button className="cart-checkout-button" onClick={handleGoToCheckoutPage}>
                  {'FINALIZAR COMPRA'}
                </Button>
              </Row>
            </div>
          ) : (<></>)}
        </>
      }
    >
      {cartList?.length > 0 ? (
        <>
          {contextHolder}
          {cartList?.map((product) => {
            return (
              <div className="cart-product-view" key={`${product?.product_name?.toLowerCase()?.replace(" ", "-")}_${product?.product_code}`}>
                <Row  style={{width: '100%'}}>
                  <Col xs={8} lg={6}>
                    <Image preview={false} src={`${product?.product_images[0]}`} className="cart-image"/>
                  </Col>
                  <Col xs={15} lg={18}>
                    <Row justify="space-between">
                      <Typography.Text className="cart-product-name" ellipsis>
                        {product?.product_name}
                      </Typography.Text>
                      <CloseOutlined style={{marginRight: 10}} onClick={() => handleClickRemoveFromCart(product?.product_name, product?.product_code)}/>
                    </Row>
                    <Row>
                      <Typography.Text className="cart-product-price">{
                        <>
                        {product?.product_discount && (
                          <Typography.Text className="cart-product-price-with-discount" >
                            {`R$ ${product?.product_price}`}
                          </Typography.Text>
                        )}
                        {`R$ ${!product?.product_discount ? product?.product_price : ((product?.product_price - (product?.product_price*product?.product_discount/100)).toFixed(2))}`}
                        </>
                      }</Typography.Text>
                    </Row>
                    <Row justify="space-between" className="cart-product-quantity-input">
                      <MinusOutlined className="quantity-operator" onClick={() => alert('diminuiu')}/>
                        {product?.product_qty}
                      <PlusOutlined className="quantity-operator" onClick={() => alert('aumentou')}/>
                    </Row>
                  </Col>
                </Row>
              </div>
            )
          })}
          
        </>
      ) : 
      (
        <div style={{textAlign: 'center'}}>
        <ShoppingOutlined style={{fontSize: 60, color: 'rgb(0 0 0 / 48%)'}} /><br/>
        <Typography.Text style={{fontSize: 30, color: 'rgb(0 0 0 / 48%)'}}>{'Seu carrinho está vazio'}</Typography.Text><br/>
        </div>
      )}
      
    </Drawer>
  )
}

export default CartDrawer