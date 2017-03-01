import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import _ from 'lodash';

class ChapterDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoBack() {
    this.context.router.goBack();
  }

  render() {
    const listItems = [
      {name: 'Тестовое название', path: 'test-path'},
      {name: 'Еще тестовое название', path: 'other-test-path'},
      {name: 'И еще одно тестовое название', path: 'another-test-path'}
    ];
    return (
      <div>
        <p onClick={this.handleGoBack.bind(this)}>Вернуться в корневой раздел</p>
        <h4>{this.props.params.name}</h4>
        <div className="top-level-menu-item">
          <span>Картинка</span>
        </div>
      </div>
    );
  }
}

ChapterDetails.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(ChapterDetails);
