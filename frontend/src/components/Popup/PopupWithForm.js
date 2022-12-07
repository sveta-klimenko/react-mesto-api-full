function PopupWithForm({
  name,
  title,
  submit,
  onSubmit,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup__${name} ${isOpen && "popup__opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_${name}`} onSubmit={onSubmit}>
          <fieldset className="form__info">
            {children}
            <button className="form__save" type="submit">
              {submit}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
