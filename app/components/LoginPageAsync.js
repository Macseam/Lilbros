import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

class LoginPageAsync extends Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    require.ensure([], (require) => {
      const Component = require('./LoginPage').default;
      this.setState({
        component: Component
      });
    });
  }

  render() {
    if (this.state.component) {
      return <this.state.component/>
    }
    return (<div>Идет загрузка</div>);
  }
}

export default connect(state => state)(LoginPageAsync);
