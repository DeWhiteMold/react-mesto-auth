import closeImg from '../images/close.svg'

function PopupWithForm(props) {

  function handelSubmit(e) {
    e.preventDefault();
    props.onSubmitClick();
  }

  return ( 
    <section className={`pop-up pop-up_${props.name} ${props.isOpen ? '' : 'pop-up_visability'}`}>
      <div className="pop-up__box">
        <h2 className="pop-up__heading">{props.title}</h2>
        <form name={props.name} className={`pop-up__form pop-up__form_type_${props.name}`} noValidate onSubmit={handelSubmit}>
          {props.children}
          <button type="submit" className="pop-up__save-button">{props.submitBtnText}</button>
        </form>
        <button type="button" className="pop-up__close-button pop-up__close-button_edit" onClick={props.onClose}>
          <img src={closeImg} alt="закрыть" className="pop-up__close-icon" />
        </button>
      </div>
      <div className="pop-up__overlay"></div>
    </section>
  )
}

export default PopupWithForm;
