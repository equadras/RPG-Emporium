import { Col, Row, Typography } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import CreditCardModal from "../../../../components/CreditCardModal"
import { useProducts } from "../../../../hooks/useProducts"

interface IPaymentMethod {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  method: string
}

const PaymentMethod: React.FC<IPaymentMethod> = ({icon, method}) => {
  const { t } = useTranslation()
  const { selectedMethod, setSelectedMethod } = useProducts()

  const [showCreditCardModal, setShowCreditCardModal] = useState(false)
  
  function handleClickInAPaymentMethod() {
    setSelectedMethod(method)
    if (method === 'credit_card') {
     setShowCreditCardModal(true)
    }
  }

  return (
    <>
      {showCreditCardModal && (<CreditCardModal setShowCreditCardModal={setShowCreditCardModal}/>)}
      <Col xs={24} sm={6} className={`checkout-payment-methods ${method === selectedMethod ? 'selected' : ''}`} onClick={handleClickInAPaymentMethod}>
      <div>
        <Row>
          {icon}
        </Row>
        <Row>
          <Typography.Text style={{fontWeight: 600}}>
            {t(method)}
          </Typography.Text>
        </Row>
      </div>
    </Col>
    </>
    
  )
}

export default PaymentMethod