import removeIcon from '../images/remove.svg';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  function handlePhotoClick() {
    props.onPhotoClick(props.cardObj);
  }

  function handleLike() {
    props.onCardLike(props.cardObj);
  }

  function handleDelete() {
    props.onCardDelete(props.cardObj)
  }

  return (            
    <li className="place">
    <img src={removeIcon} alt="удалить" className={`place__remove ${currentUser.userId === props.cardObj.owner._id ? '' : 'place__remove_hidden'}`} onClick={handleDelete} />
    <div className="place__photo open-button" onClick={handlePhotoClick} style={{ backgroundImage: `url(${props.cardObj.link})`}} />
    <div className="place__subscription">
      <h2 className="place__name">{props.cardObj.name}</h2>
      <div className="place__likes">
        <button type="button" className={`place__like ${props.cardObj.likes.some(i => i._id === currentUser.userId)? "place__like_active" : ''}`} onClick={handleLike}></button>
        <div className="place__like-counter">{props.cardObj.likes.length}</div>
      </div>
    </div>
    </li> 
  )
}

export default Card;