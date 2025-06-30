import { Button, Card, Col, Divider, Row, Typography, Image, Progress, Spin } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { formatTime } from "../../../util/secondToMinutes"
import FinishedOrderMessage from "../../../components/FinishedOrderMessage"
import { useTranslation } from "react-i18next"
import { useCartContent } from "../../../hooks/useCardContent"

const CheckoutConfirm: React.FC = () => {
  const { t } = useTranslation()
  const { setTotalItemsInCard, showPixField, setShowPixField } = useCartContent()
  const navigate = useNavigate()
  const location = useLocation()
  const deliveryMethod = location?.state?.deliveryMethod
  const formValues = location?.state?.values
  const paymentMethod = location?.state?.paymentMethod
  const [decrementCounter, setDecrementCounter] = useState(0)
  const [secondsCounter, setSecondsCounter] = useState(300)
  const [counterPercentage, setCounterPercentage] = useState(100)
  
  const [showFinishedOrderMessage, setShowFinishedOrderMessage] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (showPixField && secondsCounter > 0) {
      setTimeout(() => setSecondsCounter(state => state - 1), 1000)
      setTimeout(() => setDecrementCounter(state => state + 1), 1000)
    } else if (secondsCounter === 0) {
      setTimeout(() => {
        setShowFinishedOrderMessage(true)
        cleanCart()
      }, 1000)
    }
  }, [showPixField, secondsCounter])

  useEffect(() => {
    if (secondsCounter > 0 && decrementCounter > 0 && decrementCounter % 3 === 0) {
      setCounterPercentage(state => state - 1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decrementCounter])

  const mockedMethod = paymentMethod || 'pix'

  function cleanCart() {
    const storagedKeys = Object.keys(localStorage)
    storagedKeys?.map((key) => {
      if (key?.includes("Cart_Products")) {
        localStorage.removeItem(key)
      }
    })
    setTotalItemsInCard(0)
  }

  function handleFinishShopping() {
    setLoading(true)
    setTimeout(() => {
      switch(mockedMethod) {
        case 'pix':
          setShowPixField(true)
          setLoading(false)
          break
        case 'credit_card':
          setShowFinishedOrderMessage(true) 
          cleanCart()
          setLoading(false)
          break
        default:
          alert('Ocorreu um problema') 
      }
    }, 2000)
  }


  return (
    <>
      {showFinishedOrderMessage && <FinishedOrderMessage setIsVisible={setShowFinishedOrderMessage} />}
      <Row>
        <div className="checkout-delivery-container">
          <Col xs={24}>
            <Card 
            className="checkout-delivery-card"
            title={
              <div style={{display: 'inline-flex', fontSize: 14, fontWeight: 400}}>
                <div style={{marginRight: 20}}>{'Contato'}</div>
                <div>{formValues?.checkout_email}</div>
              </div>
            } extra={<span style={{cursor: 'pointer', fontSize: 12}} onClick={() => navigate('/checkout/address')}>{!loading && !showPixField ? 'Editar': ''}</span>}>
              <Divider style={{marginTop: -20}} />
              <Row justify="space-between" style={{display: 'flex', alignItems: 'center'}}>
                <div style={{display: 'inline-flex'}}>
                  <div style={{marginRight: 20}}>{'Endereço de entrega'}</div>
                  <div>{formValues?.checkout_address}</div>
                </div>
                <span style={{cursor: 'pointer', fontSize: 12}} onClick={() => navigate('/checkout/address')}>{!loading && !showPixField ? 'Editar': ''}</span>
              </Row>
              <Divider />
              <Row justify="space-between" style={{display: 'flex', alignItems: 'center'}}>
                <div style={{display: 'inline-flex'}}>
                  <div style={{marginRight: 20}}>{'Método de entrega'}</div>
                  <div>{deliveryMethod}</div>
                </div>
                <span style={{cursor: 'pointer', fontSize: 12}} onClick={() => navigate('/checkout/address')}>{!loading && !showPixField ? 'Editar': ''}</span>
              </Row>
              <Divider />
              <Row justify="space-between" style={{display: 'flex', alignItems: 'center'}}>
                <div style={{display: 'inline-flex'}}>
                  <div style={{marginRight: 20}}>{'Método de pagamento'}</div>
                  <div>{t(paymentMethod)}</div>
                </div>
                <span style={{cursor: 'pointer', fontSize: 12}} onClick={() => navigate('/checkout/address')}>{!loading && !showPixField ? 'Editar': ''}</span>
              </Row>
            </Card>
          </Col>
          <Col xs={24} style={{marginTop: 20}}>
            <Row justify="space-between" style={{display: 'flex', alignItems: 'end'}}>
              <Col xs={24} sm={14}>
                <Row>
                  <Typography.Text style={{fontSize: 16, fontWeight: 600}}>{'Confirmar informações'}</Typography.Text>
                </Row>
                <Typography.Text type="secondary" style={{fontSize: 12}}>{'Ao confirmar, você reconhece concordar com os Termos de Uso'}</Typography.Text>
              </Col>
              <Col xs={24} sm={8} style={{display: 'flex', justifyContent: 'end'}}>
                <Button className="checkout-button" disabled={loading || showPixField || showFinishedOrderMessage} onClick={handleFinishShopping}>
                  {loading && (<Spin size="small"/>)}
                  {'Finalizar compra'}
                </Button>
              </Col>
            </Row>
          </Col>
          {showPixField && (
            <Row style={{display: 'flex'}}>
              <Col xs={24}>
                <Card className="pix-qrcode-card">
                  <Image src={"/e-commerce/assets/qrcode-pix.png"} className="qrcode"/>
                  <Typography.Text className="pix-description">
                    {'Você possui 5 minutos para concluir o pagamento via pix utilizando o QR Code ao lado, caso contrário, a compra será cancelada automaticamente'}
                    <Progress style={{width: '100%', marginTop: 30}} size={130} type="circle" percent={counterPercentage} strokeColor={"#000"} format={() => formatTime(secondsCounter)} />
                  </Typography.Text>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </Row>
    </>
  )
}

export default CheckoutConfirm