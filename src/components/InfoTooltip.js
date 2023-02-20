import okImg from '../images/LogOk.svg'
import errorImg from '../images/LogErr.svg'
import closeImg from '../images/close.svg'

function InfoTooltip({status}) {
  return (
    <div className="info-tooltip">
    <div className="info-tooltip__box">
      <img src={status ? okImg : errorImg} alt="status" className="info-tooltip__image" />
      <span className="info-tooltip__text">{
        status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
      }</span>
      <button type="button" className="info-tooltip__close-button" onClick={() => {}}>
        <img src={closeImg} alt="закрыть" className="info-tooltip__close-icon" />
      </button>
    </div>
    <div className="info-tooltip__overlay" />
    </div>
  )
}

export default InfoTooltip;