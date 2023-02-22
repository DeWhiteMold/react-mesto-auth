import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import ProfileNameInput from "./ProfileNameInput";
import ProfileDescriptionInput from "./ProfileDescriptionInput";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [userInfo, setUserInfo] = useState(currentUser);
  const [updatedInfo, setUpdatedInfo] = useState({});

  function handleSubmit() {
    props.onUserUpdate(updatedInfo);
  }

  function getNewName(value) {
    setUpdatedInfo({
      userName: value,
      userDescription: updatedInfo.userDescription || userInfo.userDescription
    });
  }

  function getNewDescription(value) {
    setUpdatedInfo({
      userName: updatedInfo.userName || userInfo.userName,
      userDescription: value
    })
  }

  function onClose () {
    setUserInfo({
      userName: currentUser.userName || '',
      userDescription: currentUser.userDescription || ''
    })
    props.onClose()
  }

  useEffect(() => {
    setUserInfo({
      userName: currentUser.userName || '',
      userDescription: currentUser.userDescription || ''
    })
  }, [currentUser, props.isOpen])

  return (
    <PopupWithForm title="Редактировать профиль" name="edit-profile" submitBtnText="Сохранить" 
      isOpen={props.isOpen} onClose={props.onClose} onSubmitClick={handleSubmit} >
      <ProfileNameInput userName={userInfo.userName} onInput={getNewName} isOpen={props.isOpen}/>
      <span className="pop-up__input-error name-error"></span>
      <ProfileDescriptionInput userDescription={userInfo.userDescription} onInput={getNewDescription}/>
      <span className="pop-up__input-error description-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;