import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="entry_form_container">

        <div className="entry_form_window">

          <form className="entry_form">

            <div className="logo"></div>

            {/*<div className="entry_title active">Вход на сайт</div>
            <div className="register_title">Регистрация</div>*/}

            {/*<hr className="margin"/>*/}

            <input type="hidden" name="someName" value="someValue" />

            <label htmlFor="entry_name">Имя пользователя:</label>
            <span className="error_empty">Заполните поле, поручик Голицын</span>

            <input type="text" id="entry_name" name="userName" />

            <label htmlFor="entry_password">Пароль:</label>
            <span className="error_empty">Корнет Оболенскый, введите пароль</span>

            <input type="password" id="entry_password" name="userPassword" />

            <label htmlFor="entry_password_repeat">Повтор пароля:</label>
            <span className="error_empty">Пароль не совпадает</span>

            <input type="password" id="entry_password_repeat" name="entry_password_repeat" />

            <input id="entry_submit" type="submit" value="Войти" name="entry_submit" />

            {/*<input id="register_submit" type="submit" value="Зарегистрироваться" name="register_submit" />*/}

            <div className="entry_confirmation">Спасибо! У вас всё получилось!</div>

          </form>

        </div>

      </div>
    );
  }
}

export default connect(state => state)(LoginPage);
