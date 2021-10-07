import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({onUpdateUser,isOpen,onClose}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            submitBtnText="Сохранить"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            className='form__submit-button'
        >
            <div className="input input_type_edit-profile">
                <input
                    id="popup__input_text_name"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ""}
                    onChange={handleChangeName}
                    className="popup__input popup__input_text_name"
                    type="text"
                    name="name"
                    placeholder="Имя"
                />
                <span id="popup__input_text_name--error" />
                <input
                    id="popup__input_text_job"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ""}
                    onChange={handleChangeDescription}
                    className="popup__input popup__input_text_job"
                    type="text"
                    name="about"
                    placeholder="О себе"
                />
                <span id="popup__input_text_job--error" />
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;