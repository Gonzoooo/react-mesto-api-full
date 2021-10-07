import React from "react";
import buttonAdd from "../images/Addbutton.svg";
import buttonEdit from "../images/Editbutton.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
                  onEditAvatar,
                  onEditProfile,
                  onAddPlace,
                  onCardDelete,
                  onCardLike,
                  onCardClick,
                  cards,
              }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-button" onClick={onEditAvatar} />
                <img
                    src={currentUser.avatar}
                    className="profile__avatar"
                    alt="Аватар"
                />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    >
                        <img src={buttonEdit} alt="Кнопка редактировани" />
                    </button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>

                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                >
                    <img src={buttonAdd} alt="Кнопка добавления" />
                </button>
            </section>

            <ul className="elements">
                {cards.map((card) => (
                    <Card
                        onCardDelete={onCardDelete}
                        onCardLike={onCardLike}
                        key={card._id}
                        onCardClick={onCardClick}
                        card={card}
                    />
                ))}
            </ul>
        </main>
    );
}

export default Main;