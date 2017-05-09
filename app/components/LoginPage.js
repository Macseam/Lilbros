import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.actions = this.props.actions;

    this.state = {
      userName: null,
      userPassword: null,
      tokenData: null,
    };
  }

  componentDidMount() {
    this.setState({
      tokenData: this.getCookie('CSRF-TOKEN'),
    });
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.userData !== this.props.authState.userData) &&
      nextProps.authState.loaded && !_.isEmpty(nextProps.authState.userData)) {
      this.context.router.push('/');
    }
    this.setState({
      tokenData: this.getCookie('CSRF-TOKEN'),
    });
  }

  handleGoBack() {
    this.context.router.push('');
  }

  changeName(event) {
    this.setState({
      userName: event.target.value || null
    });
  }

  changePassword(event) {
    this.setState({
      userPassword: event.target.value || null
    });
  }

  submitForm(event) {
    event.preventDefault();
    this.actions.tryUserLoginPassword({
      data: {
        username: this.state.userName,
        password: this.state.userPassword,
      },
      _csrf: this.state.tokenData
    });
  }

  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Go back to main menu
        </button>

        <hr/>

        <form onSubmit={this.submitForm.bind(this)}>

          <div className="form-group">
            <label htmlFor="entry_name">Имя пользователя:</label>
            <input
              className="form-control"
              type="text"
              id="entry_name"
              name="userName"
              defaultValue={this.state.userName}
              onChange={this.changeName.bind(this)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="entry_password">Пароль:</label>
            <input
              className="form-control"
              type="password"
              id="entry_password"
              name="userPassword"
              defaultValue={this.state.userPassword}
              onChange={this.changePassword.bind(this)}
            />
          </div>

          <button type="submit" className="btn btn-default">Войти</button>

        </form>

      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ... authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(LoginPage);
