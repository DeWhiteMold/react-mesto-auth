import okImg from '../images/LogOk.svg'
import errorImg from '../images/LogErr.svg'
import closeImg from '../images/close.svg'

function InfoTooltip({isError, isOpen, onClose}) {
  return (
    <div className={`info-tooltip ${isOpen ? '' : "info-tooltip_hidden"}`}>
    <div className="info-tooltip__box">
      <img src={isError ? errorImg : okImg} alt="status" className="info-tooltip__image" />
      <span className="info-tooltip__text">{
        isError ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'
      }</span>
      <button type="button" className="info-tooltip__close-button" onClick={onClose}>
        <img src={closeImg} alt="закрыть" className="info-tooltip__close-icon" />
      </button>
    </div>
    <div className="info-tooltip__overlay" />
    </div>
  )
}

export default InfoTooltip;