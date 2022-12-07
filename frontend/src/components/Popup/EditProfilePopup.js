import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="personal-info"
      title="Редактировать профиль"
      submit="Сохранить"
      onSubmit={handleSubmit}
      children={
        <>
          <label className="error-label">
            <input
              type="text"
              className="info info_name"
              id="name"
              name="name"
              required
              minLength="2"
              maxLength="40"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
              placeholder="Имя"
            />
            <span className="error" id="name-error"></span>
          </label>
          <label className="error-label">
            <input
              type="text"
              className="info info_description"
              id="description"
              name="about"
              required
              minLength="2"
              maxLength="200"
              onChange={(e) => setDescription(e.target.value)}
              value={description || ""}
              placeholder="Описание"
            />
            <span className="error" id="description-error"></span>
          </label>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default EditProfilePopup;
