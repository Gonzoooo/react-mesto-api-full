import React from "react";
import logoMesto from "../images/logo.svg";
import { Route, NavLink } from "react-router-dom";

function Header({ headerEmail, signOut }) {

    return (
        <div>
            <header className="header">
                <img src={logoMesto} alt="Логотип Место" className="header__logo" />
                <div>
                    <Route path="/signup">
                        <NavLink
                            to="/signin"
                            className="header__nav"
                            activeClassName="header__nav_active"
                        >
                            Войти
                        </NavLink>
                    </Route>
                    <Route exact path="/">
                        <NavLink
                            to="/"
                            className="header__nav"
                            activeClassName="header__nav_active"
                        >
                            {headerEmail}
                        </NavLink>
                    </Route>
                    <Route exact path="/">
                        <NavLink
                            onClick={signOut}
                            to="/signin"
                            className="header__nav"
                            activeClassName="header__nav_active"
                        >
                            Выйти
                        </NavLink>
                    </Route>
                    <Route path="/signin">
                        <NavLink
                            to="/signup"
                            className="header__nav"
                            activeClassName="header__nav_active"
                        >
                            Регистрация
                        </NavLink>
                    </Route>
                </div>
            </header>
        </div>
    );
}

export default Header;