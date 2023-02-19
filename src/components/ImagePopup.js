import closeImg from '../images/close.svg'

function ImagePopup(props) {

  return (
    <section className={`pop-up photo-pop-up ${props.isCardSelected._id ? '' : 'pop-up_visability'}`}>
        <div className="photo-pop-up__box">
          <div className="photo-pop-up__image" style={{ backgroundImage: `url(${props.isCardSelected.link})` }} />
          <h3 className="photo-pop-up__description">{props.isCardSelected.name}</h3>
          <button type="button" className="photo-pop-up__close-button pop-up__close-button pop-up__close-button_photo" onClick={props.onClose}>
            <img src={closeImg} alt="закрыть" className="photo-pop-up__close-icon pop-up__close-icon" />
          </button>
        </div>
        <div className="pop-up__overlay photo-pop-up__overlay"></div>
      </section>
  )
}

export default ImagePopup;
