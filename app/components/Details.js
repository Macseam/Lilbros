import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertFromHTML
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import translitRusEng from 'translit-rus-eng';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import DOMPurify from 'dompurify';
import { FaPaw, FaTwitter, FaBug, FaLeaf } from 'react-icons/lib/fa';

import settings from '../settings';
import { MdModeEdit, MdDeleteForever } from 'react-icons/lib/md';

class MyEditor extends Component {
  constructor(props) {
    super(props);
    const blocksFromHTML = convertFromHTML(this.props.articleText);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    this.state = {
      editorState: EditorState.createWithContent(state),
      styleMap: {
        'STRIKETHROUGH': {
          textDecoration: 'line-through',
        }
      }
    };
    this.onChange = (editorState) => this.setState({editorState});
  }
  componentWillReceiveProps(nextProps) {
    const blocksFromHTML = convertFromHTML(nextProps.articleText);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    this.setState({
      editorState: EditorState.createWithContent(state)
    });
  }
  makeBold() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  makeItalic() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }
  makeQuote() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'blockquote'
    ))
  }
  getContent() {
    return (stateToHTML(this.state.editorState.getCurrentContent()));
  }
  render() {
    return (
      <div>
        <button
          type="button"
          className="editor-button"
          onClick={this.makeBold.bind(this)}
        >
          bold
        </button>
        <button
          type="button"
          className="editor-button"
          onClick={this.makeItalic.bind(this)}
        >
          italic
        </button>
        <button
          type="button"
          className="editor-button"
          onClick={this.makeQuote.bind(this)}
        >
          blockquote
        </button>
        <Editor
          customStyleMap={this.state.styleMap}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

class ChapterDetails extends Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;
    this.state = {
      itemDetails: null,
      modalVisible : this.props.authState.detailsEditable,
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
      const itemDetails = nextProps.authState.chapterItemDetails;
      this.setState({
        itemDetails,
        detailsId: itemDetails._id,
        detailsName: itemDetails.title,
        detailsSlug: itemDetails.slug,
        detailsDescription: itemDetails.description,
        detailsCover: (itemDetails.images && !_.isEmpty(itemDetails.images)) ? settings.apiUrl + '/uploads/' + itemDetails.images[0].url : ''
      }, ()=>{
        if (this.props.params.details !== this.state.detailsSlug) {
          this.context.router.push('/' + this.props.params.chapter + '/' + this.state.detailsSlug);
        }
      });
    }
    if (nextProps.authState.detailsEditable !== this.props.authState.detailsEditable) {
      this.setState({
        modalVisible: nextProps.authState.detailsEditable,
      });
    }
    if ((nextProps.authState.chapterItemDetailsEdited !== this.props.authState.chapterItemDetailsEdited &&
      _.isEmpty(nextProps.authState.loading)) && nextProps.authState.chapterItemDetails) {
      if (this.props.params.details !== this.state.detailsSlug) {
        this.actions.getItemDetails(this.state.detailsSlug);
      }
      else {
        this.actions.getItemDetails(this.props.params.details);
      }
      this.closeModal();
      this.setState({
        itemDetails: nextProps.authState.chapterItemDetails,
      });
      this.actions.getItemsList(this.props.params.chapter);
      this.actions.setDetailsEditable(false);
    }
  }

  componentDidMount() {
    this.actions.getItemDetails(this.props.params.details);
  }

  componentWillUnmount() {
    this.actions.setDetailsEditable(false);
  }

  getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  handleEditDetails() {
    this.actions.setDetailsEditable(!this.state.modalVisible);
    const { itemDetails } = this.state;
    this.setState({
      modalAction: 'edit',
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
        detailsSlug: translitRusEng(this.state.detailsName, true)
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
            detailsCover: fileObj.getAsFile()
          });
        });
      }
      else if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        _.map(event.dataTransfer.files, (fileObj)=>{
          this.setState({
            detailsCover: fileObj.name
          });
        });
      }
    }
    event.stopPropagation();
    event.preventDefault();
  }

  submitEditModal() {
    const editorContent = this.refs['wysiwyg-editor'].getContent();
    const {
      detailsId,
      detailsName,
      detailsSlug,
      detailsCover
    } = this.state;
    const formData = new FormData();
    formData.append("body", JSON.stringify({
      title: detailsName,
      slug: detailsSlug,
      description: editorContent,
    }));
    formData.append("cover", detailsCover);
    this.actions.editItemDetails({
      auth: this.getCookie('auth'),
      id: detailsId,
      body: formData
    });
  }

  closeModal() {
    this.actions.setDetailsEditable(false);
  }

  handleGoBack() {
    this.context.router.push('/' + this.props.params.chapter);
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
        {(!!this.props.authState.userData && this.props.authState.userData !== 'guest user') &&
          <span>
            {
              modalVisible
                ? <button
                    type="button"
                    className={"btn btn-xs edit-details-button"}
                    onClick={this.handleEditDetails.bind(this)}
                  >
                    Просмотр
                  </button>
                : <button
                    type="button"
                    className={"btn btn-xs edit-details-button"}
                    onClick={this.handleEditDetails.bind(this)}
                  >
                    Редактировать
                  </button>
            }
          </span>
        }
        {
          modalVisible
            ? <div className="form-group">
                <label htmlFor="details_name">Название:</label>
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
            : <h4 className="details-title">
                {(detailsName) || 'Нет заголовка'}
              </h4>
        }
        {
          modalVisible &&
          <div className="form-group">
            <label htmlFor="details_slug">Адрес в строке браузера (латиницей):</label>
            <input
              className="form-control"
              type="text"
              id="details_slug"
              name="detailsSlug"
              value={detailsSlug}
              onChange={this.changeDetailsSlug.bind(this)}
            />
          </div>
        }
        <div className="image-placeholder">
          {
            modalVisible
              ? <div className="form-group cover-input">
                  <label htmlFor="details_cover">Фото:</label>
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
              : <div className="image-container">
                  {itemDetails && itemDetails.images && !_.isEmpty(itemDetails.images) &&
                    <img src={settings.apiUrl + '/uploads/' + itemDetails.images[0].url} />
                  }
                </div>
          }
        </div>
        {
          modalVisible
            ? <div className="form-group">
                <label htmlFor="details_description">Описание:</label>
                <div className="wysiwyg-wrapper">
                  <MyEditor ref="wysiwyg-editor" articleText={detailsDescription} />
                </div>
              </div>
            : <div className="details-description">
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(detailsDescription)}}>{}</p>
              </div>
        }
        {
          modalVisible &&
          <div className="buttons-wrapper centered bottom-margined">
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
        }
      </div>
    );
  }
}

ChapterDetails.contextTypes = {
  router: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(ChapterDetails);
