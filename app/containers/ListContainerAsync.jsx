import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import PropTypes from 'prop-types';

class ListContainerAsync extends Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    require.ensure([], (require) => {
      const Component = require('./ListContainer').default;
      this.setState({
        component: Component
      });
    });
  }

  handleGoBack() {
    this.context.router.push('');
  }

  render() {
    if (this.state.component) {
      return <this.state.component {... this.props} />
    }
    return (
      <div>
        <button
          type="button"
          className="btn btn-default btn-xs back-home-button list-home-button loading-mockup"
          onClick={this.handleGoBack.bind(this)}
        >
          Вернуться на главную
        </button>
        <div className="chapter-items-list-wrapper loading-mockup">
          <h3 className="items-list-title">Загружается</h3>
          <div className="bs-callout bs-callout-info list-item">&nbsp;</div>
          <div className="bs-callout bs-callout-info list-item">&nbsp;</div>
        </div>
      </div>
    );
  }
}

ListContainerAsync.contextTypes = {
  router: PropTypes.object,
};

export default connect(state => state)(ListContainerAsync);