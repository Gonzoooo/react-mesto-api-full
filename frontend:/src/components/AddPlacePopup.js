import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
    const [cardNameValue, setCardNameValue] = React.useState("");
    const [cardImgValue, setCardImgValue] = React.useState("");

    function handleChangeCardName(e) {
        setCardNameValue(e.target.value);
    }

    function handleChangeCardImg(e) {
        setCardImgValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const cardName = cardNameValue;
        const cardImg = cardImgValue;
        onAddPlace({
            name: cardName,
            link: cardImg,
        });
    }

    React.useEffect(() => {
        setCardNameValue("");
        setCardImgValue("");
    }, [isOpen]);

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            onSubmit={handleSubmit}
            submitBtnText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            className="form__submit-button"
        >
            <div className="input input_type_add-card">
                <input
                    id="popup__input_place_name"
                    value={cardNameValue}
                    onChange={handleChangeCardName}
                    required
                    minLength="2"
                    maxLength="30"
                    className="popup__input popup__input_place_name"
                    type="text"
                    name="name"
                    placeholder="Название"
                />
                <span id="popup__input_place_name--error" />
                <input
                    id="popup__input_place_link"
                    value={cardImgValue}
                    onChange={handleChangeCardImg}
                    required
                    className="popup__input popup__input_place_link"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                />
                <span id="popup__input_place_link--error" />
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;