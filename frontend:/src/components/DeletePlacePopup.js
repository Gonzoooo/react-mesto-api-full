import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeletePlacePopup({onDeletePlace,isOpen,onClose}) {
    function handleSubmit(e) {
        e.preventDefault();
        onDeletePlace();
    }

    return (
        <PopupWithForm
            name="delete-img"
            title="Вы уверены?"
            submitBtnText="Да"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            className='form__submit-button'
        />
    );
}

export default DeletePlacePopup;