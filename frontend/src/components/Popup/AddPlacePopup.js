import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    linkRef.current.value = "";
    nameRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      link: linkRef.current.value,
      name: nameRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="add-picture"
      title="Новое место"
      submit="Сохранить"
      onSubmit={handleSubmit}
      children={
        <>
          <label className="error-label">
            <input
              type="text"
              className="info info_place-name"
              id="place-name"
              name="name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
              ref={nameRef}
            />
            <span className="error" id="place-name-error"></span>
          </label>
          <label className="error-label">
            <input
              type="url"
              className="info info_place-link"
              id="place-link"
              name="link"
              placeholder="Ссылка на картинку"
              required
              ref={linkRef}
            />
            <span className="error" id="place-link-error"></span>
          </label>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default AddPlacePopup;
