import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [isSuccessReg, setIsSuccessReg] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cardToDelete, setCardToDelete] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [headerEmail, setHeaderEmail] = React.useState("");
    const history = useHistory();

    function handleAuthorization(email, password) {
        auth
            .authorize(email, password)
            .then((data) => {
                setLoggedIn(true);
                localStorage.setItem("jwt", data.token);
                history.push("/");
            })
            .catch((e) => {
                console.log(`ошибка при загрузке данных: ${e}`);
            });
    }

    function handleRegistration(email, password) {
        auth
            .register(email, password)
            .then((res) => {
                if (res) {
                    history.push("/signin");
                    setIsSuccessReg(true);
                    setInfoTooltipPopupOpen(true);
                }
            })
            .catch(() => {
                setIsSuccessReg(false);
                setInfoTooltipPopupOpen(true);
            });
    }

    React.useEffect(() => {
        if(localStorage.getItem("jwt")) {
            const token = localStorage.getItem("jwt");
            auth
                .checkToken(token)
                .then(
                    (data) => {
                        setLoggedIn(true);
                        setHeaderEmail(data.data.email);
                        history.push("/");
                    })
                .catch((e) => {
                    console.log(`ошибка при загрузке данных: ${e}`);
                });
        }
    }, [history,loggedIn]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([info, cards]) => {
                setCards(cards);
                setCurrentUser(info);
            })
            .catch((e) => {
                console.log(`ошибка при загрузке данных: ${e}`);
            });
    }, []);

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        history.push("/signin");
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .setLike(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((e) => {
                console.log(`ошибка при загрузке данных: ${e}`);
            });
    }

    function handleCardDelete() {
        api
            .deleteCard(cardToDelete._id)
            .then(() => {
                setCards((cards) => cards.filter((item) => item !== cardToDelete));
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((e) => {
                console.log(`ошибка при загрузке данных: ${e}`);
            });
    }

    function handleUpdateUser(info) {
        api
            .setUserInfo(info)
            .then((info) => {
                setCurrentUser(info);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((e) => {
                console.log(`ошибка при загрузке данных: ${e}`);
            });
    }

    function handleUpdateAvatar(avatar) {
        api
            .addNewAvatar(avatar)
            .then((avatar) => {
                setCurrentUser(avatar);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((e) => {
                console.log(`ошибка при загрузке данных: ${e}`);
            });
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addNewCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((e) => {
                console.log(`ошибка при загрузке данных: ${e}`);
            });
    }

    function handleDeleteCardClick(card) {
        setDeletePopupOpen(true);
        setCardToDelete(card);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setImagePopupOpen(false);
        setDeletePopupOpen(false);
        setInfoTooltipPopupOpen(false);
    }

    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header headerEmail={headerEmail} signOut={handleSignOut}/>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCardClick}
                        cards={cards}
                    />
                    <Route path="/signup">
                        <Register onReg={handleRegistration} />
                    </Route>
                    <Route path="/signin">
                        <Login onAuth={handleAuthorization} />
                    </Route>
                </Switch>
                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <DeletePlacePopup
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    onDeletePlace={handleCardDelete}
                />

                <ImagePopup
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isSuccess={isSuccessReg}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;