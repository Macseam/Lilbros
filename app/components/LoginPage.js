import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import { MdHome } from 'react-icons/lib/md';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.actions = this.props.actions;

    this.state = {
      userName: '',
      userPassword: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authState.userData !== this.props.authState.userData) {
      if (!_.isEmpty(nextProps.authState.userData)) {
        this.context.router.push('/');
      }
      else {
        this.setState({
          userPassword: ''
        });
      }
    }
  }

  handleGoBack() {
    this.context.router.push('');
  }

  changeName(event) {
    this.setState({
      userName: event.target.value || ''
    });
  }

  changePassword(event) {
    this.setState({
      userPassword: event.target.value || ''
    });
  }

  submitForm(event) {
    event.preventDefault();
    this.actions.tryUserLoginPassword({
      data: {
        username: this.state.userName,
        password: this.state.userPassword,
      },
    });
  }

  render() {

    const {
      userName,
      userPassword
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-default btn-xs back-home-button"
          onClick={this.handleGoBack.bind(this)}
        >
          <MdHome />
          Вернуться на главную
        </button>

        <hr/>

        <form className="authorization-form" onSubmit={this.submitForm.bind(this)}>

          <div className="form-group">
            <label htmlFor="entry_name">Имя пользователя:</label>
            <input
              className="form-control"
              type="text"
              id="entry_name"
              name="userName"
              value={userName}
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
              value={userPassword}
              onChange={this.changePassword.bind(this)}
            />
          </div>

          <button type="submit" className="btn btn-success">Войти</button>

        </form>

      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ... authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(LoginPage);
