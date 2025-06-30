/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingOutlined } from "@ant-design/icons"
import { Col, Drawer, Row, Typography, Image, Badge, Input, Button } from "antd"

interface ICheckoutSummaryDrawer {
  cartList: any[]
  setVisibleSummaryDrawer: (value: boolean) => void
  deliveryMethod: string
  showPixField: boolean
  inputPromotionalCode: string
  handleChangeInputPromotional: (e: any) => void
  checkIfPromotionalCodeIsValid: () => void
  totalPrice: number
  deliveryValue: number
  validPromotionalCode: {
    code: string;
    value: string;
  }
}


const CheckoutSummaryDrawer: React.FC<ICheckoutSummaryDrawer> = ({validPromotionalCode, deliveryValue, totalPrice, checkIfPromotionalCodeIsValid, handleChangeInputPromotional, inputPromotionalCode, cartList, setVisibleSummaryDrawer, deliveryMethod, showPixField}) => {
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
      onClose={() => setVisibleSummaryDrawer(false)}
      className={cartList?.length > 0 ? 'cart-drawer' : 'cart-drawer-empty'}
    >
        <Col xs={24} className="checkout-cart-summary-drawer">
          <div className="cart-products">
            <div className="cart-images">
              {cartList?.map((product) => {
                return (
                  <Row justify="space-between" style={{alignItems: 'center', marginBottom: 20, width: '100%'}} key={product?.product_code}>
                    <Col xs={5}>
                      <Badge count={product?.product_qty} className="checkout-badge">
                        <Image preview={false} className="checkout-image" src={product?.product_images[0]} style={{width: 70, height: 70}}/>
                      </Badge>
                    </Col>
                    <Col xs={12}>
                      <span style={{fontWeight: 600}}>{product?.product_name}</span>
                      <Row>
                        <Typography.Text style={{fontSize: 11}}>
                          {`Tamanho: ${product?.product_size?.toUpperCase()}`}
                        </Typography.Text>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      {product?.product_discount && (
                        <Row>
                          <Typography.Text style={{fontSize: 14}} className="cart-product-price-with-discount" >
                            {`R$ ${product?.product_price}`}
                          </Typography.Text>
                        </Row>
                      )}
                      <span style={{fontWeight: 600}}>{`R$ ${!product?.product_discount ? product?.product_price : ((product?.product_price - (product?.product_price*product?.product_discount/100)).toFixed(2))}`}</span>
                    </Col>
                  </Row>
                )
              })}
            </div>
            <div className="cart-values" style={{width: '100%', padding: '0px 0px'}}> 
              <Row justify="space-between" style={{width: '100%'}}>
                <Col xs={18}>
                  <Input disabled={showPixField} onChange={handleChangeInputPromotional} className="input-cart-values" maxLength={10} placeholder="Código promocional"/>
                </Col>
                <Button disabled={!(inputPromotionalCode?.length > 0) || showPixField} onClick={checkIfPromotionalCodeIsValid} className="button-cart-values">{'Aplicar'}</Button>
              </Row>
              <div style={{marginTop: 20}}>
                <Row justify="space-between" style={{width: '100%'}}>
                  <Typography.Text style={{fontFamily: 'Inter'}}>{'Subtotal:'}</Typography.Text>
                  <Typography.Text style={{fontFamily: 'Inter'}}>
                    {`R$ ${totalPrice?.toFixed(2)}`}
                  </Typography.Text>
                </Row>
                {deliveryMethod && (
                  <Row justify="space-between" style={{width: '100%'}}>
                    <Typography.Text style={{fontFamily: 'Inter'}}>{'Frete:'}</Typography.Text>
                    <Typography.Text style={{fontFamily: 'Inter'}}>
                      {deliveryValue ? (`R$ ${deliveryValue?.toFixed(2)}`) : ('Grátis')}
                    </Typography.Text>
                  </Row>
                )}
                {validPromotionalCode?.code?.length > 0 && (
                  <Row justify="space-between" style={{width: '100%'}}>
                    <Typography.Text style={{fontFamily: 'Inter', fontWeight: 600, color: 'green'}}>{'Desconto Promocional:'}</Typography.Text>
                    <Typography.Text style={{fontFamily: 'Inter', fontWeight: 600, color: 'green'}}>
                      {`R$ ${validPromotionalCode?.value}.00`}
                    </Typography.Text>
                  </Row>
                )}
                <Row justify="space-between" style={{width: '100%'}}>
                  <span style={{fontWeight: 600, fontSize: 18, fontFamily: 'Inter'}}>{'Total:'}</span>
                  <Typography.Text style={{fontWeight: 600, fontSize: 18, fontFamily: 'Inter'}}>
                    {deliveryValue ? (`R$ ${(totalPrice + Number(deliveryValue) - Number(validPromotionalCode?.value))?.toFixed(2)}`) : (`R$ ${(totalPrice - Number(validPromotionalCode?.value))?.toFixed(2)}`)}
                  </Typography.Text>
                </Row>
              </div>
            </div>
          </div>
        </Col> 
      
    </Drawer>
  )
}

export default CheckoutSummaryDrawer