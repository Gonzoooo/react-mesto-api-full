import React from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";

function Form({ name, onSubmit, title, children, submitBtnText }) {
    return (
        <form
            className="form form_for_user"
            name={name}
            onSubmit={onSubmit}
        >
            <h2 className="form__title form__title_for_user">{title}</h2>
            {children}
            <button
                className="form__submit-button form__submit-button_for_user"
                type="submit"
                name="button"
            >
                {submitBtnText}
            </button>
            <Route path="/signup">
                <NavLink to="/signin" className="form__login-button">
                    Уже зарегестрированы? Войти
                </NavLink>
            </Route>
        </form>
    );
}

export default Form;