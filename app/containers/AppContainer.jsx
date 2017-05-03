'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navigation } from 'react-router';

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.authState.userData
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.userData !== this.props.authState.userData) &&
      nextProps.authState.loaded) {
      this.setState({
        userData: nextProps.authState.userData,
      });
    }
  }

  goToLogin() {
    this.context.router.push('login');
  }

  render() {
    const {
      children
    } = this.props;
    return (
      <div>
        {!this.state.userData || this.state.userData === 'guest user' ?
          <p onClick={this.goToLogin.bind(this)}>Войти</p> :
          <p>{this.state.userData}</p>
        }
        {children}
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(AppContainer);