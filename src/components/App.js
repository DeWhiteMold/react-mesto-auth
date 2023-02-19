import { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import '../index.css';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCardPhoto, setSelectedCardPhoto] = useState({});

  const [currentUser, setCurrentUser] = useState({userName: 'Жак-Ив Кусто', userDescription: 'Исследователь', userAvatar: '', userId: ''});
  const [cards, setCards] = useState([]);

  function handleAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCardPhoto(card);
  }

  function closeAllPopUps() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCardPhoto({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.userId);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {console.log(err)});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {console.log(err)});
  }

  function handleAvatarUpdate(newAvatar) {
    api.updateUserAvatar(newAvatar)
      .then((res) => {
        setCurrentUser({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar,
          userId: res._id
        })
      })
      .catch((err) => {console.log(err)})
  }

  function handleUserUpdate(updatedInfo) {
    api.updateUsetInfo(updatedInfo.userName, updatedInfo.userDescription)
      .then((res) => {
        setCurrentUser({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar,
          userId: res._id
        })
      })
      .catch((err) => {console.log(err)})
  }

  function handleCardAdd(newCard) {
    api.postNewCard(newCard.name, newCard.link)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((err) => {console.log(err)})
  }

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar,
          userId: res._id
        })
      })
      .catch((err) => {console.log(err)})

      api.getInitialCards()
        .then((res) => {
          setCards([...cards, ...res]);
        })
        .catch((err) => {console.log(err)})
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <Header />
        <Main 
          cards={cards}

          onEditAvatar={handleAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}

          onCardClick={handleCardClick}
          selectedCardPhoto={selectedCardPhoto}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}

          closeHandler={closeAllPopUps}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopUps} onAvatarUpdate={handleAvatarUpdate}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopUps} onUserUpdate={handleUserUpdate}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopUps} onCardAdd={handleCardAdd}/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;