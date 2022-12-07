import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="change-icon"
      title="Сменить аватар"
      submit="Сохранить"
      onSubmit={handleSubmit}
      children={
        <label className="error-label">
          <input
            type="url"
            className="info info_icon"
            id="avatar"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
            ref={avatarRef}
          />
          <span className="error" id="avatar-error"></span>
        </label>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default EditAvatarPopup;
