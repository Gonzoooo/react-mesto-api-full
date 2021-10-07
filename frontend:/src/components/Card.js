import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__trash ${
        isOwn ? "element__trash-visible" : "element__trash"
    }`;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${
        isLiked ? "element__like_active" : "element__like"
    }`;

    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <div className="element__container">
                <button
                    aria-label="Trash"
                    type="button"
                    className={cardDeleteButtonClassName}
                    onClick={handleDeleteClick}
                />
                <img
                    src={card.link}
                    alt={card.name}
                    className="element__img"
                    onClick={handleClick}
                />
                <div className="element__group">
                    <h2 className="element__text">{card.name}</h2>
                    <button
                        aria-label="Like"
                        type="button"
                        onClick={handleLikeClick}
                        className={cardLikeButtonClassName}
                    />
                    <div className="element__like-count">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;