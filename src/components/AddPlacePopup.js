import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function AddPlacePopup(props) {
  const placeNameInput = useRef();
  const placeImgLinkInput = useRef();

  function handelSubmit() {
    props.onCardAdd({
      name: placeNameInput.current.value,
      link: placeImgLinkInput.current.value
    })
    placeNameInput.current.value = '';
    placeImgLinkInput.current.value = '';
  }

  return (
    <PopupWithForm title="Новое место" name="add-place" submitBtnText="Создать" 
      isOpen={props.isOpen} onClose={props.onClose} onSubmitClick={handelSubmit}>
      <input ref={placeNameInput} type="text" name="place-name" 
        className="pop-up__input pop-up__input_type_place-name" 
        placeholder="Название" required minLength="2" maxLength="30" />
      <span className="pop-up__input-error place-name-error"></span>
      <input ref={placeImgLinkInput} type="url" name="place-image" 
        className="pop-up__input pop-up__input_type_place-image" 
        placeholder="Ссылка на картинку" required />
      <span className="pop-up__input-error place-image-error"></span>
    </PopupWithForm>
  )
} 

export default AddPlacePopup;