import regFail from "../../images/reg-fail.png";
import regSuccess from "../../images/reg-success.png";

function InfoTooltip({ name, isOpen, onClose, isRegSuccess }) {
  return (
    <div className={`popup popup__${name} ${isOpen && "popup__opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        {isRegSuccess ? (
          <>
            <img
              className="popup__reg-image"
              alt="Регистрация успешна"
              src={regSuccess}
            />
            <h2 className="popup__reg-message">
              Вы успешно зарегистрировались!
            </h2>
          </>
        ) : (
          <>
            <img
              className="popup__reg-image"
              alt="Регистрация неуспешна"
              src={regFail}
            />
            <h2 className="popup__reg-message">
              Что-то пошло не так! Попробуйте ещё раз.
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
