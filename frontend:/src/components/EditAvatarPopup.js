import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
    const [avatarValue, setAvatarValue] = React.useState("");

    function handleAvatar(e) {
        setAvatarValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const avatar = avatarValue;
        onUpdateAvatar({
            avatar: avatar,
        });
    }

    React.useEffect(() => {
        setAvatarValue("");
    }, [isOpen]);

    return (
        <PopupWithForm
            name="new-avatar"
            title="Обновить аватар"
            onSubmit={handleSubmit}
            submitBtnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            className="form__submit-button"
        >
            <div className="input input_type_new-avatar">
                <input
                    id="popup__input_avatar_link"
                    value={avatarValue}
                    onChange={handleAvatar}
                    required
                    className="popup__input popup__input_avatar_link"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                />
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;