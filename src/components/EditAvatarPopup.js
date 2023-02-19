import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = useRef()

  function handelSubmit() {
    props.onAvatarUpdate(avatarInput.current.value)
    avatarInput.current.value = '';
  }

  return (
    <PopupWithForm title="Обновить аватар" name="change-avatar" submitBtnText="Сохранить" 
      isOpen={props.isOpen} onClose={props.onClose} onSubmitClick={handelSubmit} >
      <input ref={avatarInput} type="url" name="avatar"
        className="pop-up__input pop-up__input_type_avatar" placeholder="Ссылка на картинку" required />
      <span className="pop-up__input-error avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;