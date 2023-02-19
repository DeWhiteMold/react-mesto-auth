import {useContext} from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    
    <main className="content">
      <section className="profile">
        <div className="profile__info-box">
          <div className="profile__avatar">
            <div className="profile__photo" style={{ backgroundImage: `url(${currentUser.userAvatar})` }} />
            <button type="button" className="profile__change-avatar-btn" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__text">
            <div className="profile__upper-line">
              <h1 className="profile__name">{currentUser.userName}</h1>
              <button type="button" className="profile__edit-button open-button" onClick={props.onEditProfile}></button>              
            </div>
            <p className="profile__description">{currentUser.userDescription}</p>
            </div>
          </div>
        <button type="button" className="profile__add-button open-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__table">
          {props.cards.map((card) => {
            return <Card key={card._id} cardObj={card} onPhotoClick={props.onCardClick}
             onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          })}
        </ul>
      </section>
      <ImagePopup isCardSelected={props.selectedCardPhoto} submitBtnText="Да" onClose={props.closeHandler} />
      <PopupWithForm title="Вы уверены?" name="delete-card" />
    </main>
  );
}

export default Main;