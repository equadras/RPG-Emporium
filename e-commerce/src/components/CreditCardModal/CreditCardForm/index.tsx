/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, DatePicker, Form, FormInstance, Input, Row } from "antd"
import { validateCpf } from "../../../util/validateCpf"

interface ICreditCardForm {
  setIsFlipped?: (value: boolean) => void
  handleChangeFormValue?: () => void
  handleChangeCpfValue?: (value: any) => void
  cpfInputValue?: string
  form: FormInstance
  onlyRead?: boolean
}
const CreditCardForm: React.FC<ICreditCardForm> = ({setIsFlipped, form, handleChangeFormValue, handleChangeCpfValue, cpfInputValue, onlyRead}) => {  
  return (
    <Row justify="start" className="credit-card-form" style={{width: '100%'}}>
      <Form preserve layout="vertical" form={form} requiredMark={false} style={{width: '100%'}} disabled={onlyRead}>
        <Col xs={24}>
          <Form.Item label="Número do cartão" name="credit_card_number" rules={[{required: true, message: 'Por favor, informe o número do cartão'}]}>
            <Input maxLength={16} placeholder="1234 5678 9123 4567" className="credit-card-input" onChange={() => handleChangeFormValue && handleChangeFormValue()}/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="form-credit-card-name" label="Nome presente no cartão" name="credit_card_name" rules={[{required: true, message: 'Por favor, informe o nome presente no cartão'}]}>
            <Input maxLength={16} placeholder="João da Silva" className="credit-card-input" onChange={() => handleChangeFormValue && handleChangeFormValue()}/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="form-credit-card-cpf" label="Cpf do titular do cartão" name="credit_card_cpf" rules={[
            {required: true, message:''},
            {validator: (_, value) => {
              if (value?.length < 11) {
                return Promise.reject('Insira um cpf válido')
              } else {
                const isAValidCpf = validateCpf(value)
                if (!isAValidCpf) {
                  return Promise.reject('Cpf inválido')
                }
                return Promise.resolve()
              }
            } }
            
            ]}>
            <Input maxLength={14} placeholder="122.123.124-67" className="credit-card-input" onChange={handleChangeCpfValue}
              value={cpfInputValue}
            />
          </Form.Item>
        </Col>
        <Row gutter={[16,16]} justify="space-between" style={{alignItems: 'center'}}>
          <Col xs={12}>
            <Form.Item  label="Data de expiração" name="credit_card_expiration_date" rules={[{required: true, message: 'Por favor, informe a data de expiração do cartão'}]}>
              <DatePicker format={"MM/YY"} picker="month" className="credit-card-input" onChange={() => handleChangeFormValue && handleChangeFormValue()}/>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="CVV" name="credit_card_cvv" rules={[{required: true, message: ''},
              {
                validator: async (_, value) => {
                  if (!value || value?.length < 3 || value?.length > 3) {
                    return Promise.reject("Informe um CVV válido")
                  }
                }
              }
            ]}>
              <Input type="number" min={1} onClick={() => setIsFlipped && setIsFlipped(true)} onBlur={() => setIsFlipped && setIsFlipped(false)} maxLength={3} placeholder="111" className="credit-card-input" onChange={() => handleChangeFormValue && handleChangeFormValue()}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Row>
  )
}

export default CreditCardForm