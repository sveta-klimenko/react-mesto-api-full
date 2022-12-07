import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `photo-grid__trash ${
    !isOwn && "photo-grid__trash-hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo-grid__like ${
    isLiked && "photo-grid__like_active"
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__element">
      <img
        className="photo-grid__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        aria-label="Удалить изображение"
        onClick={handleDeleteClick}
      ></button>
      <div className="photo-grid__info">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__like-area">
          <button
            className={cardLikeButtonClassName}
            aria-label="Добавить изображение в избранные"
            onClick={handleLikeClick}
          ></button>
          <p className="photo-grid__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
