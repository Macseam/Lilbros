import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import _ from 'lodash';

class ChapterList extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoToDetails(path) {
    this.context.router.push(this.props.params.chapter + '/' + path);
  }

  handleGoBack() {
    this.context.router.push('');
  }

  render() {
    const { children } = this.props;
    const listItems = [
      {name: 'Тестовое название', path: 'test-path'},
      {name: 'Еще тестовое название', path: 'other-test-path'},
      {name: 'И еще одно тестовое название', path: 'another-test-path'}
    ];
    if (this.props.params.name) {
      return (
        <div>
          {children}
        </div>
      );
    }
    return (
      <div>
        <p onClick={this.handleGoBack.bind(this)}>Вернуться в главное меню</p>
        <h4>{this.props.routeParams.chapter}</h4>
        <ul>
          {_.map(listItems, (listItem, key)=>{
            return (
              <li key={'listItem' + key} onClick={this.handleGoToDetails.bind(this, listItem.path)}>
                {listItem.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

ChapterList.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(ChapterList);
