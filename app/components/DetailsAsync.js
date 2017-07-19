import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import PropTypes from 'prop-types';

class ChapterDetailsAsync extends Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    require.ensure([], (require) => {
      const Component = require('./Details').default;
      this.setState({
        component: Component
      });
    });
  }

  handleGoBack() {
    this.context.router.push('/list/' + this.props.params.chapter);
  }

  render() {
    if (this.state.component) {
      return <this.state.component {... this.props} />
    }
    return (
      <div className="item-details-wrapper">
        <button
          type="button"
          className={"btn btn-xs back-home-button loading-mockup"}
          onClick={this.handleGoBack.bind(this)}
        >
          Вернуться
        </button>
        <h4 className="details-title loading-mockup">
          Загружаем статью
        </h4>
        <div className="image-placeholder">
          <div className="image-container loading-mockup">&nbsp;</div>
        </div>
      </div>
    );
  }
}

ChapterDetailsAsync.contextTypes = {
  router: PropTypes.object,
};

export default connect(state => state)(ChapterDetailsAsync);
