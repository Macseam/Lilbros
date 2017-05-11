import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import Modal from 'react-awesome-modal';

class ChapterDetails extends React.Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;
    this.state = {
      itemDetails: null,
      modalVisible : false,
      modalAction: 'edit',
      detailsId: '',
      detailsName: '',
      detailsSlug: '',
      detailsDescription: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chapterItemDetails !== this.state.itemDetails &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemDetails) {
      this.setState({
        itemDetails: nextProps.authState.chapterItemDetails,
      });
    }
    if ((nextProps.authState.chapterItemDetailsEdited !== this.props.authState.chapterItemDetailsEdited &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemDetails) {
      this.actions.getItemDetails(this.props.params.details);
      this.setState({
        itemDetails: nextProps.authState.chapterItemDetails,
      });
    }
  }

  componentDidMount() {
    this.actions.getItemDetails(this.props.params.details);
  }

  getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  handleEditDetails() {
    const { itemDetails } = this.state;
    this.setState({
      modalAction: 'edit',
      modalVisible : true,
      detailsId: itemDetails._id,
      detailsName: itemDetails.title,
      detailsSlug: itemDetails.slug,
      detailsDescription: itemDetails.description,
    });
  }

  changeDetailsName(event) {
    this.setState({
      detailsName : event.target.value
    });
  }

  changeDetailsSlug(event) {
    this.setState({
      detailsSlug : event.target.value
    });
  }

  changeDetailsDescription(event) {
    this.setState({
      detailsDescription : event.target.value
    });
  }

  submitEditModal() {
    const {
      detailsId,
      detailsName,
      detailsSlug,
      detailsDescription
    } = this.state;
    const params = {
      _csrf: this.getCookie('CSRF-TOKEN'),
      id: detailsId,
      body: {
        title: detailsName,
        slug: detailsSlug,
        description: detailsDescription
      }
    };
    this.closeModal();
    this.actions.editItemDetails(params);
  }

  closeModal() {
    this.setState({
      modalAction: 'edit',
      modalVisible : false,
      detailsId: '',
      detailsName: '',
      detailsSlug: '',
      detailsDescription: '',
    });
  }

  handleGoBack() {
    this.context.router.goBack();
  }

  render() {

    const chapterTitle = _.find(this.props.authState.chaptersList, (chapterObj)=>{
      return (chapterObj.slug === this.props.params.chapter);
    });

    const {
      itemDetails,
      modalVisible,
      detailsName,
      detailsSlug,
      detailsDescription
    } = this.state;

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
        <h4>
          {(itemDetails && itemDetails.title) || 'No title'}
          {
            (!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? <span onClick={this.handleEditDetails.bind(this)}> edit link</span>
              : ''
          }
        </h4>
        <div className="image-placeholder" style={{backgroundColor: (itemDetails && itemDetails.color) || 'gray'}}>&nbsp;</div>
        <p>{(itemDetails && itemDetails.description) || 'No description'}</p>
        <Modal
          visible={modalVisible}
          width="70%"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div className="popup-content">
            <h1>
              {
                "Редактировать элемент"
              }
            </h1>
            <form onSubmit={this.closeModal.bind(this)}>
              <div className="form-group">
                <label htmlFor="details_name">Название элемента:</label>
                <input
                  className="form-control"
                  type="text"
                  id="details_name"
                  name="detailsName"
                  value={detailsName}
                  onChange={this.changeDetailsName.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="details_slug">Адрес элемента (латиницей):</label>
                <input
                  className="form-control"
                  type="text"
                  id="details_slug"
                  name="detailsSlug"
                  value={detailsSlug}
                  onChange={this.changeDetailsSlug.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="details_description">Описание элемента:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  id="details_description"
                  name="detailsDescription"
                  value={detailsDescription}
                  onChange={this.changeDetailsDescription.bind(this)}
                />
              </div>
              <button
                type="button"
                onClick={this.submitEditModal.bind(this)}
                disabled={!(detailsName && detailsSlug && detailsDescription)}
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={this.closeModal.bind(this)}
              >
                Отмена
              </button>
            </form>
          </div>
        </Modal>
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
