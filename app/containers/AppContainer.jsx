'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;

    this.state = {
      userData: this.props.authState.userData
    };
  }

  componentDidMount() {
    this.actions.getHeaderAuthToken();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.userData !== this.state.userData) &&
      nextProps.authState.loaded) {
      this.setState({
        userData: nextProps.authState.userData,
      });
    }
  }

  goToLogin() {
    this.context.router.push('login');
  }

  handleLogout() {
    this.actions.sendLogoutCommand();
  }

  render() {
    const {
      children
    } = this.props;
    return (
      <div>
        {!this.state.userData || this.state.userData === 'guest user' ?
          <p onClick={this.goToLogin.bind(this)}>Войти</p> :
          <p>{this.state.userData} <span onClick={this.handleLogout.bind(this)}>Выйти</span></p>
        }
        {children}
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(AppContainer);