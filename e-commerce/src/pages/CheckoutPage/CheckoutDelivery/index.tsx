import { Button, Card, Col, Divider, Row, Typography } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { MdCircle, MdOutlineBrightness1 } from "react-icons/md";
import { useState } from "react";

const CheckoutDelivery: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const values = location?.state?.formValues
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('')
  

  function handleClickSaveAndContinue() {
    if (selectedDeliveryMethod) {
      navigate('/checkout/payment', {state: {formValues: values, deliveryMethod: selectedDeliveryMethod}})
    }
  }

  const deliveryMethods = [
    {enterprise: 'blueRabbit', delivery_modality: 'Padrão', value: 15.50, shipping_util_days: '2 a 3'},
    {enterprise: 'redFox', delivery_modality: 'Gratuita', value: 0, shipping_util_days: '4 a 5'},
  ]

  return (
    <Row>
      <div className="checkout-delivery-container">
        <Col xs={24}>
          <Card 
          className="checkout-delivery-card"
          title={
            <div style={{display: 'inline-flex', fontSize: 14, fontWeight: 400}}>
              <div style={{marginRight: 20}}>{'Contato'}</div>
              <div>{values?.checkout_email}</div>
            </div>
          } extra={<span style={{cursor: 'pointer', fontSize: 12}} onClick={() => navigate('/checkout/address')}>{'Editar'}</span>}>
            <Divider style={{marginTop: -20}} />
            <Row justify="space-between" style={{display: 'flex', alignItems: 'center'}}>
              <div style={{display: 'inline-flex'}}>
                <div style={{marginRight: 20}}>{'Endereço de entrega'}</div>
                <div>{values?.checkout_address}</div>
              </div>
              <span style={{cursor: 'pointer', fontSize: 12}} onClick={() => navigate('/checkout/address')}>{'Editar'}</span>
            </Row>
          </Card>
        </Col>
        {deliveryMethods?.map((method) => {
          return (
            <Col xs={24} style={{marginTop: 20, cursor: 'pointer'}} key={`${method?.enterprise}_${method?.delivery_modality}`}>
              <Typography.Text>{`Entrega feita por ${method?.enterprise}`}</Typography.Text>
              <div className={`checkout-radio ${selectedDeliveryMethod?.split(' ')[0] === method?.enterprise ? 'selected' : ''}`} onClick={() => setSelectedDeliveryMethod(`${method?.enterprise} - ${method?.delivery_modality} ${method?.value > 0 ? `R$ ${method?.value?.toFixed(2)}`: ''}`)}>
                <Row justify="space-between" >
                  <Typography.Text style={{display: 'flex', alignItems: 'center'}}>
                    {selectedDeliveryMethod?.split(' ')[0] === method?.enterprise ? (
                      <MdCircle size={16} style={{marginBottom: 3, marginRight: 10}}/>
                    ) : (
                      <MdOutlineBrightness1 size={16} style={{marginBottom: 3, marginRight: 10}}/>
                    )}
                    
                    {`${method?.delivery_modality} - ${method?.shipping_util_days} dias úteis`}
                  </Typography.Text>
                  <Typography.Text>
                    {method?.value > 0 ? `R$ ${method?.value?.toFixed(2)}` : 'Grátis'}
                  </Typography.Text>
                </Row>
              </div>
            </Col>
          )
        })}
        <Col xs={24} style={{display: 'flex', justifyContent: 'end'}}>
          <Button className="checkout-button" onClick={handleClickSaveAndContinue}>
            {'Salvar e Continuar'}
          </Button>
        </Col>
      </div>
    </Row>
  )
}

export default CheckoutDelivery