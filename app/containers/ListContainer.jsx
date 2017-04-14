'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import ItemsList from "../components/ListPage/ItemsList";

class ListContainer extends Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;
    this.state = {
      chapterItems: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chapterItemsList !== this.state.chapterItems &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemsList) {
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
  }

  componentDidMount() {
    if (_.isEmpty(this.props.authState.chapterItemsList)) {
      this.actions.getChaptersList();
    }
    this.actions.getItemsList(this.props.params.chapter);
  }

  handleGoToItem(id) {
    this.context.router.push(id);
  }

  handleGoBack() {
    this.context.router.push('');
  }

  render() {
    const {
      chapterItems
    } = this.state;

    const chapterTitle = _.find(this.props.authState.chaptersList, (chapterObj)=>{
      return (chapterObj.slug === this.props.params.chapter);
    });

    if (this.props.params.details) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }

    return (
      <div>
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Go back to main menu
        </button>
        {chapterItems && !_.isEmpty(chapterItems) &&
          <ItemsList
            goToItem={this.handleGoToItem.bind(this)}
            chapterItems={chapterItems}
            chapterSlug={this.props.params.chapter}
            chapterTitle={(!_.isEmpty(chapterTitle) && chapterTitle) ? chapterTitle.title : 'No title'}
          />
        }
        {_.isEmpty(chapterItems)
        && this.props.authState.chapterItemsList !== null
        && !this.props.authState.loading &&
          <h5>No items available in current chapter</h5>
        }
        {_.isEmpty(chapterItems)
        && this.props.authState.loading &&
        <h5>...</h5>
        }
      </div>
    );
  }
}

ListContainer.contextTypes = {
  router: React.PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(ListContainer);