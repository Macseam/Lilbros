import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../stylesheets/main.scss";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => state)(App);
