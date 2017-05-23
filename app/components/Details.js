import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import { FaPaw, FaTwitter, FaBug, FaLeaf } from 'react-icons/lib/fa';

import settings from '../settings';
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
      detailsCover: '',
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
      this.actions.getItemsList(this.props.params.chapter);
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
      detailsCover: (itemDetails.images && !_.isEmpty(itemDetails.images)) ? settings.apiUrl + '/uploads/' + itemDetails.images[0].url : ''
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

  changeDetailsCover(event) {
    if (event && event.target.files[0] && (event.target.files[0].type.indexOf('image/') !== -1) && event.target.files[0].size !== 0) {
      this.setState({
        detailsCover: event.target.files[0]
      });
    }
    else {
      this.setState({
        detailsCover: null
      });
      this.refs.details_cover.value = '';
    }
  }

  submitEditModal() {
    const {
      detailsId,
      detailsName,
      detailsSlug,
      detailsDescription,
      detailsCover
    } = this.state;
    const formData = new FormData();
    formData.append("body", JSON.stringify({
      title: detailsName,
      slug: detailsSlug,
      description: detailsDescription,
    }));
    formData.append("cover", detailsCover);
    this.closeModal();
    this.actions.editItemDetails({
      auth: this.getCookie('auth'),
      id: detailsId,
      body: formData
    });
  }

  closeModal() {
    this.setState({
      modalAction: 'edit',
      modalVisible : false,
      detailsId: '',
      detailsName: '',
      detailsSlug: '',
      detailsDescription: '',
      detailsCover: '',
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
      detailsDescription,
      detailsCover
    } = this.state;

    let backButtonClass = "btn-default";

    if (this.props.params && this.props.params.chapter) {
      if (this.props.params.chapter === 'animals') {
        backButtonClass = 'btn-warning';
      }
      else if (this.props.params.chapter === 'birds') {
        backButtonClass = 'btn-info';
      }
      else if (this.props.params.chapter === 'insects') {
        backButtonClass = 'btn-danger';
      }
      else if (this.props.params.chapter === 'plants') {
        backButtonClass = 'btn-green';
      }
    }

    if ((!itemDetails || _.isEmpty(itemDetails)) && this.props.authState.loading) {
      return (
        <div className="item-details-wrapper">
          <button
            type="button"
            className={"btn btn-default btn-xs back-home-button" + " " + backButtonClass}
            onClick={this.handleGoBack.bind(this)}
          >
            {this.props.params.chapter === 'animals' &&
              <FaPaw />
            }
            {this.props.params.chapter === 'birds' &&
              <FaTwitter />
            }
            {this.props.params.chapter === 'insects' &&
              <FaBug />
            }
            {this.props.params.chapter === 'plants' &&
              <FaLeaf />
            }
            Вернуться к списку{(!_.isEmpty(chapterTitle) && chapterTitle) ? ' "' + chapterTitle.title + '"' : ''}
          </button>
          <h5>...</h5>
        </div>
      );
    }

    return (
      <div className="item-details-wrapper">
        <button
          type="button"
          className={"btn btn-xs back-home-button" + " " + backButtonClass}
          onClick={this.handleGoBack.bind(this)}
        >
          {this.props.params.chapter === 'animals' &&
          <FaPaw />
          }
          Вернуться к списку{(!_.isEmpty(chapterTitle) && chapterTitle) ? ' "' + chapterTitle.title + '"' : ''}
        </button>
        <h4>
          {(itemDetails && itemDetails.title) || 'No title'}
          {
            (!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? <span onClick={this.handleEditDetails.bind(this)}> edit link</span>
              : ''
          }
        </h4>
        <div className="image-placeholder" style={{backgroundColor: (itemDetails && itemDetails.color) || 'gray'}}>
          {itemDetails && itemDetails.images && !_.isEmpty(itemDetails.images) &&
            <img src={settings.apiUrl + '/uploads/' + itemDetails.images[0].url} />
          }
        </div>
        <p>{(itemDetails && itemDetails.description) || 'No description'}</p>
        <Modal
          visible={modalVisible}
          width="70%"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div className="popup-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal.bind(this)}>&#215;</button>
              <h4 className="modal-title">Редактировать элемент</h4>
            </div>
            <form className="popup-form" onSubmit={this.closeModal.bind(this)}>
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
              <div className="form-group">
                <label htmlFor="details_cover">Обложка раздела:</label>
                <input
                  ref="details_cover"
                  className="form-control"
                  type="file"
                  accept="image/*"
                  id="details_cover"
                  name="detailsCover"
                  defaultValue={detailsCover}
                  onChange={this.changeDetailsCover.bind(this)}
                />
              </div>
              {detailsCover &&
              <div className="cover-preview">
                <div className="delete-button" onClick={this.changeDetailsCover.bind(this, null)}>delete link</div>
                <img src={(typeof detailsCover === 'string') ? detailsCover : window.URL.createObjectURL(detailsCover)} />
              </div>
              }
              <button
                className="btn btn-success"
                type="button"
                onClick={this.submitEditModal.bind(this)}
                disabled={!(detailsName && detailsSlug && detailsDescription)}
              >
                Сохранить
              </button>
              <button
                className="btn btn-default margined-left"
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
