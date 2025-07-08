import { Button, Checkbox, Col, Form, Input, Row, Select, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import { allCountries } from "../../../util/productFields"

const { Option } = Select

const CheckoutAddress: React.FC = () => {
  const [checkoutForm] = Form.useForm()
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (value: any) => {
    const country = allCountries?.find((c) => c.value === value)
    checkoutForm?.setFieldsValue({
      checkout_country: `${country?.flag} ${country?.label}`
    })
  };

  async function handleClickSaveAndContinue() {
    try {
      const validated = await checkoutForm.validateFields()
      if (validated) {
        navigate('/checkout/delivery', {state: {formValues: validated}})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form form={checkoutForm} layout="vertical" requiredMark={false}>
      <Row gutter={[16, 0]}>
        <Col xs={24}>
            <Row justify="space-between">
              <Typography.Text style={{ fontSize: 16, marginBottom: 10}}>
                {'E-mail de contato'}
              </Typography.Text>
            </Row>
          <Form.Item className="checkout-fields" label="" name="checkout_email" rules={[{required: true, message: 'Por favor, informe o e-mail'}]}>
            <Input type="email" placeholder="E-mail" className="checkout-email-input"/>
          </Form.Item>
        </Col>
        <Col xs={24} >
          <Checkbox className="checkout-checkbox">
            {'Receber notificações'}
          </Checkbox>
        </Col>
        <Col xs={24}>
          <Typography.Text style={{ fontSize: 16, marginBottom: 10}}>
            {'Endereço para envio'}
          </Typography.Text>
          <Form.Item style={{marginTop: 10}} className="checkout-fields" label="País" name="checkout_country" rules={[{required: true, message: 'Por favor, informe o país'}]}>
            <Select 
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
              className="checkout-country" placeholder="País"
            >
              {allCountries?.map((country) => (
                <Option key={country?.value} value={country?.value}>
                  {country?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item className="checkout-fields" label="Primeiro nome" name="checkout_first_name" rules={[{required: true, message: 'Por favor, informe o primeiro nome'}]}>
            <Input placeholder="Primeiro nome" className="checkout-first-name"/>
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item className="checkout-fields" label="Sobrenome" name="checkout_last_name" rules={[{required: true, message: 'Por favor, informe o sobrenome'}]}>
            <Input placeholder="Sobrenome" className="checkout-last-name"/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="checkout-fields" label="Endereço" name="checkout_address" rules={[{required: true, message: 'Por favor, informe o endereco'}]}>
            <Input placeholder="Rua, número" className="checkout-address"/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="checkout-fields" label="Complemento" name="checkout_complement" rules={[{required: false}]}>
            <Input placeholder="Casa, apartamento (opcional)" className="checkout-complement"/>
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item className="checkout-fields" label="City" name="checkout_city" rules={[{required: true, message: 'Por favor, informe a cidade'}]}>
            <Input placeholder="Cidade" className="checkout-city"/>
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item className="checkout-fields" label="State" name="checkout_state" rules={[{required: true, message: 'Por favor, informe o estado'}]}>
            <Input placeholder="Estado" className="checkout-state"/>
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item className="checkout-fields" label="CEP" name="checkout_cep" rules={[{required: true, message: 'Por favor, informe o cep'}]}>
            <Input placeholder="CEP" className="checkout-cep"/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="checkout-fields" label="Celular" name="checkout_phone" rules={[{required: false}]}>
            <Input placeholder="Número (opcional)" className="checkout-phone"/>
          </Form.Item>
        </Col>
        <Col xs={24} style={{display: 'flex', justifyContent: 'end'}}>
          <Button className="checkout-button" onClick={handleClickSaveAndContinue}>
            {'Salvar e Continuar'}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CheckoutAddress