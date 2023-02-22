import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import '../index.css';
import authApi from '../utils/AuthApi.js';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [isLogged, setIsLogged] = useState(false)
  const [selectedCardPhoto, setSelectedCardPhoto] = useState({});

  const [currentUserEmail, setCurrentUserEmail] = useState('')
  const [currentUser, setCurrentUser] = useState({userName: 'Жак-Ив Кусто', userDescription: 'Исследователь', userAvatar: '', userId: ''});
  const [cards, setCards] = useState([]);


  function handleError() {
    setIsAuthError(true);
    setIsTooltipOpen(true);

  }

  function handleReg(inputData) {
    authApi.singUp(inputData)
    .then(() => {
      setIsAuthError(false);
      setIsTooltipOpen(true);
    })
    .catch(() => {handleError()})
  }

  function handleLog(inputData) {
    authApi.singIn(inputData)
    .then((res) => {
      localStorage.setItem('token', res.token);
    })
    .then(() => {
      setIsLogged(true);
      setCurrentUserEmail(inputData.email);
    })
    .catch(() => {handleError()})
  }

  function handleExit() {
    setIsLogged(false);
    localStorage.removeItem('token');
    setCurrentUserEmail('');
  }

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
    setIsTooltipOpen(false);
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
      .then(() => {closeAllPopUps()})
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
      .then(() => {closeAllPopUps()})
      .catch((err) => {console.log(err)})
  }

  function handleCardAdd(newCard) {
    api.postNewCard(newCard.name, newCard.link)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .then(() => {closeAllPopUps()})
      .catch((err) => {console.log(err)})
  }

  useEffect(() => {
    authApi.checkValid(localStorage.getItem('token'))
    .then((res) => {
      setCurrentUserEmail(res.data.email);
      setIsLogged(true);
    })
    .catch((err) => {console.log(err)})

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
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser} >
        <div className="page">
          <Header email={currentUserEmail} onExit={handleExit} />
          <Routes>
            <Route path="/sing-in" element={<Login isLogged={isLogged} isError={isAuthError} onLog={handleLog}/>} />
            <Route path="/sing-up" element={<Register isError={isAuthError} onReg={handleReg} />} />
            <Route path="/" element={<ProtectedRouteElement
              isLogged={isLogged}
              element={
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
              }
              />} 
            />
          </Routes>
          <InfoTooltip isOpen={isTooltipOpen}
            onClose={closeAllPopUps} isError={isAuthError} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopUps} onAvatarUpdate={handleAvatarUpdate}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopUps} onUserUpdate={handleUserUpdate}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopUps} onCardAdd={handleCardAdd}/>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;