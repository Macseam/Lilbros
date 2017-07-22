'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AlertContainer from 'react-alert'

import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import { MdPresentToAll, MdExitToApp, MdErrorOutline } from 'react-icons/lib/md';

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
      _.isEmpty(nextProps.authState.loading)) {
      this.setState({
        userData: nextProps.authState.userData,
      });
    }
    if ((nextProps.authState.errorMessage !== this.props.authState.errorMessage)
      && !_.isEmpty(nextProps.authState.errorMessage)) {
      this.showAlert(nextProps.authState.errorMessage);
    }
  }

  showAlert(message) {
    this.msg.show(message || 'Тревога! Тревога! Волк унёс зайчат!', {
      time: 8000,
      type: 'error',
      icon: <div className="alert-error-icon"><MdErrorOutline/></div>
    })
  }

  goToLogin() {
    this.context.router.push('/login');
  }

  goHome() {
    if (this.props.location.pathname !== '/') {
      this.context.router.push('/');
    }
  }

  handleLogout() {
    this.actions.sendLogoutCommand();
  }

  render() {
    const {
      children
    } = this.props;

    const alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'light',
      transition: 'fade'
    };

    return (
      <div>
        <AlertContainer
          ref={a => this.msg = a}
          {...alertOptions}
        />
        {!_.isEmpty(this.props.authState.loading) &&
          <div className="loading-indicator-container">
            <div className="mimimi-spinner">
              &nbsp;
            </div>
            <div className="sun-spinner">
              &nbsp;
            </div>
          </div>
        }
        <div className="title-logo">
          <span className="title" onClick={this.goHome.bind(this)}>Lilbros</span>
          <div className="authorization-info">
            <div className="login-icon" >
            {(!this.state.userData && this.props.location.pathname.indexOf('login') === -1) &&
              <MdPresentToAll onClick={this.goToLogin.bind(this)} />
            }
            {(this.state.userData && this.props.location.pathname.indexOf('login') === -1) &&
              <div>
                <span>{this.state.userData || '???'}</span> <MdExitToApp onClick={this.handleLogout.bind(this)} />
              </div>
            }
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(AppContainer);