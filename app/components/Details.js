import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import translitRusEng from 'translit-rus-eng';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import DOMPurify from 'dompurify';
import { FaPaw, FaTwitter, FaBug, FaLeaf } from 'react-icons/lib/fa';

import settings from '../settings';
import Modal from 'react-awesome-modal';
import { MdModeEdit, MdDeleteForever } from 'react-icons/lib/md';

class ChapterDetails extends Component {

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
      _.isEmpty(nextProps.authState.loading)) && nextProps.authState.chapterItemDetails) {
      this.setState({
        itemDetails: nextProps.authState.chapterItemDetails,
      });
    }
    if ((nextProps.authState.chapterItemDetailsEdited !== this.props.authState.chapterItemDetailsEdited &&
      _.isEmpty(nextProps.authState.loading)) && nextProps.authState.chapterItemDetails) {
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

  detailsNameFocusOut() {
    if (!this.state.detailsSlug || _.isEmpty(this.state.detailsSlug)) {
      this.setState({
        detailsSlug: translitRusEng(this.state.detailsName, "_")
      });
    }
  }

  changeDetailsSlug(event) {
    this.setState({
      detailsSlug : event.target.value
    });
  }

  changeDetailsDescription(value) {
    this.setState({
      detailsDescription : value
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

  dragOverDetailsCover(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  dropDetailsCover(event) {
    if (event.dataTransfer) {
      if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
        _.map(event.dataTransfer.items, (fileObj)=>{
          this.setState({
            chapterCover: fileObj.getAsFile()
          });
        });
      }
      else if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        _.map(event.dataTransfer.files, (fileObj)=>{
          this.setState({
            chapterCover: fileObj.name
          });
        });
      }
    }
    event.stopPropagation();
    event.preventDefault();
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

    if ((!itemDetails || _.isEmpty(itemDetails)) && !_.isEmpty(this.props.authState.loading)) {
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
        {
          (!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
            ? <button
                type="button"
                className={"btn btn-xs edit-details-button"}
                onClick={this.handleEditDetails.bind(this)}
              >
                Редактировать
              </button>
            : ''
        }
        <h4 className="details-title">
          {(itemDetails && itemDetails.title) || 'Нет заголовка'}
        </h4>
        <div className="image-placeholder" style={{backgroundColor: (itemDetails && itemDetails.color) || 'gray'}}>
          {itemDetails && itemDetails.images && !_.isEmpty(itemDetails.images) &&
            <img src={settings.apiUrl + '/uploads/' + itemDetails.images[0].url} />
          }
        </div>
        {itemDetails && itemDetails.description &&
        <div className="details-description">
          <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(itemDetails.description)}}>
            {/*(itemDetails && itemDetails.description) || 'No description'*/}
          </p>
        </div>
        }
        <div className="modal-wrapper">
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
                    onBlur={this.detailsNameFocusOut.bind(this)}
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
                  <div className="wysiwyg-wrapper">
                    место под wysiwyg
                  </div>
                </div>
                <div className="form-group cover-input">
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
                  {!detailsCover &&
                  <div
                    className="cover-preview blank"
                    onClick={()=>{this.refs['details_cover'].click()}}
                    onDrop={this.dropDetailsCover.bind(this)}
                    onDragOver={this.dragOverDetailsCover.bind(this)}
                  >
                    <p className="add-title">
                      Добавить<br/>изображение
                    </p>
                  </div>
                  }
                  {detailsCover &&
                  <div
                    className="cover-preview"
                    onDrop={this.dropDetailsCover.bind(this)}
                    onDragOver={this.dragOverDetailsCover.bind(this)}
                  >
                    <div className="delete-button" onClick={this.changeDetailsCover.bind(this, null)}>
                      <MdDeleteForever />
                    </div>
                    <div className="edit-button" onClick={()=>{this.refs['details_cover'].click()}}>
                      <MdModeEdit />
                    </div>
                    <img src={(typeof detailsCover === 'string') ? detailsCover : window.URL.createObjectURL(detailsCover)} />
                    <p className="preview-title">
                      {typeof detailsCover === 'string'
                        ? detailsCover.split('/')[detailsCover.split('/').length-1]
                        : detailsCover.name.split('/')[detailsCover.name.split('/').length-1]}
                    </p>
                  </div>
                  }
                </div>
                <div className="buttons-wrapper centered">
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
                </div>
              </form>
            </div>
          </Modal>
        </div>
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
