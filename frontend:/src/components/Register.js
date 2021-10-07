import React from "react";
import Form from "./Form";

function Register({ onReg }) {
    const [passwordValue, setPassword] = React.useState("");
    const [emailValue, setEmail] = React.useState("");

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const email = emailValue;
        const password = passwordValue;
        onReg(email, password);
    }

    return (
        <Form
            title="Регистрация"
            submitBtnText="Зарегистрироваться"
            onSubmit={handleSubmit}
        >
            <div className="input">
                <input
                    required
                    minLength="2"
                    maxLength="30"
                    className="popup__input popup__input_for_user"
                    type="email"
                    name="Email"
                    placeholder="Email"
                    autoComplete="on"
                    value={emailValue}
                    onChange={handleChangeEmail}
                />
                <span />
                <input
                    required
                    className="popup__input popup__input_for_user"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    autoComplete="on"
                    value={passwordValue}
                    onChange={handleChangePassword}
                />
                <span />
            </div>
        </Form>
    );
}

export default Register;