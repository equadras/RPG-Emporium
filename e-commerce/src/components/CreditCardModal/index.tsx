import { Col, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import { EloCardFlag, MastercardCardFlag, VisaCardFlag } from "../../../public/assets/CardsFlags"
import { EllipsisOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import { cpfMask } from "../../util/cpfMask"
import { getCardBrand } from "../../util/getCardBrand"
import CreditCardForm from "./CreditCardForm"
import { useProducts } from "../../hooks/useProducts"


interface ICreditCardModal {
  setShowCreditCardModal: (value: boolean) => void
}
const CreditCardModal: React.FC<ICreditCardModal> = ({setShowCreditCardModal}) => {
  const { paymentCheckoutForm, validatedValues, setValidatedValues } = useProducts()
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiration, setCardExpiration] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cpfInputValue, setCpfInputValue] = useState('')
  const [isFlipped, setIsFlipped] = useState(false)
  const editMode = validatedValues?.credit_card_number?.length > 0 || false

  useEffect(() => {
    if (validatedValues) {
      setCardNumber(validatedValues?.credit_card_number)
      setCardName(validatedValues?.credit_card_name)
      setCardExpiration(dayjs(validatedValues?.credit_card_expiration_date).format('MM/YY'))
      setCardCvv(validatedValues?.credit_card_cvv?.slice(0, 3))
    }
  }, [])
  
  function handleChangeFormValue() {
    const formFields = paymentCheckoutForm?.getFieldsValue()
    setCardNumber(formFields?.credit_card_number)
    setCardName(formFields?.credit_card_name)
    setCardExpiration(dayjs(formFields?.credit_card_expiration_date).format('MM/YY'))
    setCardCvv(formFields?.credit_card_cvv?.slice(0, 3))
    paymentCheckoutForm.setFieldsValue({ credit_card_cvv: formFields?.credit_card_cvv?.slice(0, 3) })
  }

  async function handleRegisterNewCreditCard() {
    try {
      const validated = await paymentCheckoutForm.validateFields()
      if (validated) {
        setValidatedValues(validated)
        setShowCreditCardModal(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleChangeCpfValue(e: React.ChangeEvent<HTMLInputElement>) {
    const maskedCpf = cpfMask(e.target.value)
    setCpfInputValue(maskedCpf)
    paymentCheckoutForm.setFieldsValue({ credit_card_cpf: maskedCpf })
  }

  function renderCardFlag() {
    const flag = getCardBrand(cardNumber)
    switch (flag) {
      case 'Visa':
        return <VisaCardFlag size={80} />
      case 'Mastercard': 
        return <MastercardCardFlag size={80} />
      case 'Elo':
        return <EloCardFlag size={80}/>
      default:
        return <VisaCardFlag size={80} />
    }
  }

  function handleCancelCreditCardModal() {
    setShowCreditCardModal(false)
    if (!editMode) {
      paymentCheckoutForm.resetFields()
    }
  }
  
  return (
    <Modal 
      open 
      onCancel={handleCancelCreditCardModal} 
      className="credit-card-modal"
      cancelText="Cancelar"
      okText={editMode ? "Atualizar cadastro" : "Cadastrar cartão"}
      onOk={handleRegisterNewCreditCard}
    >
      <div className="credit-card-wrap">
        <Row justify="center">
          <Col xs={24} lg={24} style={{display: 'flex', justifyContent: 'center'}}>
            <div className="credit-card-container">
              <div className={`credit-card ${isFlipped ? "flipped" : ""}`}>
                <div className="credit-card-front">
                  <Row justify="space-between" className="credit-card-first-row">
                    <div>
                      <EllipsisOutlined style={{ fontSize: 25, color: "white" }} />
                    </div>
                    <div className="credit-card-flag">
                      {renderCardFlag()}
                    </div>
                  </Row>
                  <div style={{ backgroundColor: "transparent", height: 130 }} />
                  <Row justify="space-between" className="credit-card-second-row">
                    <div className="card-name">{cardName?.length > 0 ? cardName : "João da Silva"}</div>
                    <div className="card-expiration">{cardExpiration?.length > 0 ? cardExpiration : "01/30"}</div>
                  </Row>
                  <Row className="credit-card-third-row">
                    <div className="card-number">
                      {cardNumber?.length > 0 ? cardNumber?.match(/.{1,4}/g)?.join(" ") : "1234 5678 9123 4567"}
                    </div>
                  </Row>
                </div>
                <div className="credit-card-back">
                  <div className="black-strip" style={{ width: "100%", height: "40px", background: "#000", marginBottom: "10px" }} />
                  <div className="cvv-box" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ color: "#aaa", fontSize: "12px" }}>CVV</span>
                    <div style={{ background: "black", color: "white", padding: "5px 15px", borderRadius: "5px", fontSize: "18px", fontWeight: "bold", letterSpacing: 6 }}>
                      <span style={{marginRight: -5, display: 'flex'}}>
                        {cardCvv?.length > 0 ? cardCvv : '***'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <CreditCardForm form={paymentCheckoutForm} setIsFlipped={setIsFlipped} handleChangeFormValue={handleChangeFormValue} cpfInputValue={cpfInputValue} handleChangeCpfValue={handleChangeCpfValue}/>
      </div>
    </Modal>
  )
}

export default CreditCardModal