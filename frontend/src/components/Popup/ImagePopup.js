function ImagePopup({ link, title, isOpen, onClose }) {
  return (
    <div className={`popup popup_show-picture ${isOpen && "popup__opened"}`}>
      <div className="popup__image-container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={link} alt={title} />
        <p className="popup__description">{title}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
