import { useNavigate } from "react-router-dom"

interface IFinishedOrderMessage {
  setIsVisible: (value: boolean) => void
}
const FinishedOrderMessage: React.FC<IFinishedOrderMessage> = ({setIsVisible}) => {
  const navigate = useNavigate()
  function handleCloseMessage() {
    setIsVisible(false)
    navigate('/')
  }
  return (
    <div className="finished-order-overlay">
      <div className="finished-order-message" >
        <button className="dismiss" type="button" onClick={handleCloseMessage}>×</button>
        <div className="header">
          <div className="image">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M20 7L9.00004 18L3.99994 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </div>
          <div className="content">
            <span className="title">{'Compra concluída'}</span>
            <p className="message">
              {"Obrigado por sua compra! Seu pedido foi confirmado e será processado em breve. Você receberá atualizações sobre a entrega em seu e-mail."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinishedOrderMessage
