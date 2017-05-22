'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import { MdPresentToAll } from 'react-icons/lib/md';

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
        <div className="title-logo">
          <span>Lilbros</span>
          <div className="authorization-info">
            {!this.state.userData
              ? <div className="login-icon" onClick={this.goToLogin.bind(this)}>
                  <MdPresentToAll />
                </div>
              : <p>{this.state.userData} <span onClick={this.handleLogout.bind(this)}>Выйти</span></p>
            }
          </div>
        </div>
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