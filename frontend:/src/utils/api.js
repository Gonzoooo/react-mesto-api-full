class Api {
    constructor(options) {
        this.cohort = options.cohort;
        this.headers = options.headers;
        this.url = options.url;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    //получили информацию
    getUserInfo() {
        return fetch(`${this.url}${this.cohort}/users/me`, {
            method: "GET",
            headers: this.headers,
        }).then(this._handleResponse);
    }

    //получили карточки
    getInitialCards() {
        return fetch(`${this.url}${this.cohort}/cards`, {
            method: "GET",
            headers: this.headers,
        }).then(this._handleResponse);
    }

    //обновили информацию
    setUserInfo(info) {
        return fetch(`${this.url}${this.cohort}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about,
            }),
        }).then(this._handleResponse);
    }

    //добавили новую карточку
    addNewCard(cardElement) {
        return fetch(`${this.url}${this.cohort}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: cardElement.name,
                link: cardElement.link,
            }),
        }).then(this._handleResponse);
    }

    //сменили аватар
    addNewAvatar(avatarElement) {
        return fetch(`${this.url}${this.cohort}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarElement.avatar,
            }),
        }).then(this._handleResponse);
    }

    //лайк
    setLike(cardId, isLiked) {
        return fetch(`${this.url}${this.cohort}/cards/likes/${cardId}`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this.headers,
        }).then(this._handleResponse);
    }

    //удаление карточки
    deleteCard(cardId) {
        return fetch(`${this.url}${this.cohort}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        }).then(this._handleResponse);
    }
}

const api = new Api({
    cohort: "cohort-24",
    headers: {
        authorization: "0970556a-6f94-4e95-aaf4-193fd780acec",
        "Content-Type": "application/json",
    },
    url: "https://mesto.nomoreparties.co/v1/",
});

export default api;