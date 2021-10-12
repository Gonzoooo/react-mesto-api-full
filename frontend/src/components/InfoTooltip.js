import React from "react";
import ImgSuccessReg from "../images/CheckMark.svg";
import ImgBadReg from "../images/Cross.svg";
import buttonClose from "../images/CloseIcon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    return (
        <div className={`popup popup_type_info-tooltip ${
            isOpen ? "popup_visible" : ""
        }`}>
            <div className="overlay" onClick={onClose} />
            <div className="form form_for_info-tooltip">
                <img
                    src={isSuccess ? ImgSuccessReg : ImgBadReg}
                    alt={
                        isSuccess
                            ? "Вы успешно зарегестрировались!"
                            : "Что-то пошло не так! Попробуйте ещё раз."
                    }
                />
                <h2 className="form__title form__title_for_info-tooltip">{
                    isSuccess
                        ? "Вы успешно зарегестрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."
                }</h2>
                <button
                    aria-label="Close"
                    type="button"
                    className="form__close-icon"
                    onClick={onClose}
                >
                    <img
                        src={buttonClose}
                        className="form__close"
                        alt="Крестик закрытия окна"
                    />
                </button>
            </div>
        </div>
    );
}

export default InfoTooltip;
