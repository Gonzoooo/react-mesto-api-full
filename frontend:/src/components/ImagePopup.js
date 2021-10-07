import React from "react";
import buttonClose from "../images/CloseIcon.svg";

function ImagePopup({name,isOpen,onClose,card}) {
    return (
        <div
            className={`popup popup_type_${name} ${
                isOpen ? "popup_visible" : ""
            }`}
        >
            <div className="overlay" onClick={onClose} />
            <div className="form form_show-image">
                <button
                    aria-label="Close"
                    type="button"
                    onClick={onClose}
                    className="form__close-icon form__close-icon_for_img"
                >
                    <img
                        src={buttonClose}
                        className="form__close"
                        alt="Крестик закрытия окна"
                    />
                </button>
                <img
                    src={card.link}
                    className="form__img"
                    alt={card.name}
                />
                <h2 className="form__title form__title_zoom">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;