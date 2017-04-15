'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navigation } from 'react-router';

class AppContainer extends Component {

  constructor(props) {
    super(props);
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
        <p onClick={this.goToLogin.bind(this)}>Войти</p>
        {children}
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(AppContainer);