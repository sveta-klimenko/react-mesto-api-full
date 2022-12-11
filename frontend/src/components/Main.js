import React, { useContext, useState, useEffect } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__avatar-edit"
            onClick={onEditAvatar}
          ></button>
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Аватар пользователя"
          />
          <div className="profile__id">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
          <button
            className="profile__change-info"
            aria-label="Сменить информацию в профиле"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-picture"
          aria-label="Добавить фотографию"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="photos">
        <ul className="photo-grid">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
