import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

class ChapterDetails extends React.Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;
    this.state = {
      itemDetails: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chapterItemDetails !== this.state.itemDetails &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemDetails) {
      this.setState({
        itemDetails: nextProps.authState.chapterItemDetails,
      });
    }
  }

  componentDidMount() {
    this.actions.getItemDetails(this.props.params.details);
  }

  handleGoBack() {
    this.context.router.goBack();
  }

  render() {

    const chapterTitle = _.find(this.props.authState.chaptersList, (chapterObj)=>{
      return (chapterObj.slug === this.props.params.chapter);
    });

    const { itemDetails } = this.state;

    if ((!itemDetails || _.isEmpty(itemDetails)) && this.props.authState.loading) {
      return (
        <div className="item-details-wrapper">
          <button
            type="button"
            className="btn btn-default btn-xs"
            onClick={this.handleGoBack.bind(this)}
          >
            Go back to items list
          </button>
          <h5>...</h5>
        </div>
      );
    }

    return (
      <div className="item-details-wrapper">
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={this.handleGoBack.bind(this)}
        >
          Go back to items list
        </button>
        <h4>{(itemDetails && itemDetails.title) || 'No title'}</h4>
        <div className="image-placeholder" style={{backgroundColor: (itemDetails && itemDetails.color) || 'gray'}}>&nbsp;</div>
        <p>{(itemDetails && itemDetails.description) || 'No description'}</p>
      </div>
    );
  }
}

ChapterDetails.contextTypes = {
  router: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(ChapterDetails);
