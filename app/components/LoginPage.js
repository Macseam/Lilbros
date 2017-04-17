import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

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

  componentWillMount() {
    this.actions.getHeaderAuthToken();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.authToken !== this.state.tokenData &&
      nextProps.authState.loaded)) {
      this.setState({
        tokenData: nextProps.authState.authToken,
      });
    }
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
      username: this.state.userName,
      _csrf: this.state.tokenData
    });
    console.log('username: ' + this.state.userName);
    console.log('password: ' + this.state.userPassword);
    console.log('token: ' + this.state.tokenData);
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

        <form action="http://localhost:8080/api/sendauthinfo" method="POST" onSubmit={this.submitForm.bind(this)}>

          <input type="hidden" name="_csrf" value={this.state.tokenData || 'noData'} />

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
