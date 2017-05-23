'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import Modal from 'react-awesome-modal';
import MenuList from "../components/IndexPage/MenuList";

class IndexContainer extends Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;
    this.state = {
      menuChapters: [],
      modalVisible : false,
      modalAction: 'add',
      chapterId: '',
      chapterName: '',
      chapterSlug: '',
      chapterDescription: '',
      chapterCover: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chaptersList !== this.state.menuChapters &&
      nextProps.authState.loaded) && nextProps.authState.chaptersList) {
      this.setState({
        menuChapters: nextProps.authState.chaptersList,
      });
    }
    if ((nextProps.authState.chapterAdded !== this.props.authState.chapterAdded &&
      nextProps.authState.loaded) && nextProps.authState.chaptersList) {
      this.actions.getChaptersList();
      this.setState({
        menuChapters: nextProps.authState.chaptersList,
      });
    }
    if ((nextProps.authState.chapterEdited !== this.props.authState.chapterEdited &&
      nextProps.authState.loaded) && nextProps.authState.chaptersList) {
      this.actions.getChaptersList();
      this.setState({
        menuChapters: nextProps.authState.chaptersList,
      });
    }
    if ((nextProps.authState.chapterDeleted !== this.props.authState.chapterDeleted &&
      nextProps.authState.loaded) && nextProps.authState.chaptersList) {
      this.actions.getChaptersList();
      this.setState({
        menuChapters: nextProps.authState.chaptersList,
      });
    }
  }

  componentDidMount() {
    this.actions.getChaptersList();
  }

  getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  handleGoToChapter(path) {
    this.context.router.push(path);
  }

  handleEditChapter(id, title, slug, description, cover) {
    this.setState({
      modalAction: 'edit',
      modalVisible : true,
      chapterId: id,
      chapterName: title,
      chapterSlug: slug,
      chapterDescription: description,
      chapterCover: cover
    });
  }

  handleDeleteChapter(id) {
    this.actions.deleteChapter(
      {
        id: id,
        auth: this.getCookie('auth'),
      }
    );
  }

  handleAddChapter() {
    this.setState({
      modalAction: 'add',
      modalVisible: true
    });
  }

  changeChapterName(event) {
    this.setState({
      chapterName: event.target.value
    });
  }

  changeChapterSlug(event) {
    this.setState({
      chapterSlug: event.target.value
    });
  }

  changeChapterDescription(event) {
    this.setState({
      chapterDescription: event.target.value
    });
  }

  changeChapterCover(event) {
    if (event && event.target.files[0] && (event.target.files[0].type.indexOf('image/') !== -1) && event.target.files[0].size !== 0) {
      this.setState({
        chapterCover: event.target.files[0]
      });
    }
    else {
      this.setState({
        chapterCover: null
      });
      this.refs.chapter_cover.value = '';
    }
  }

  submitEditModal() {
    const {
      chapterId,
      chapterName,
      chapterSlug,
      chapterDescription,
      chapterCover
    } = this.state;
    const formData = new FormData();
    formData.append("body", JSON.stringify({
      title: chapterName,
      slug: chapterSlug,
      description: chapterDescription,
    }));
    formData.append("cover", chapterCover);
    this.closeModal();
    this.actions.editChapter({
      auth: this.getCookie('auth'),
      id: chapterId,
      body: formData
    });
  }

  submitAddModal() {
    const {
      chapterName,
      chapterSlug,
      chapterDescription,
      chapterCover
    } = this.state;
    const formData = new FormData();
    formData.append("body", JSON.stringify({
      title: chapterName,
      slug: chapterSlug,
      description: chapterDescription,
    }));
    formData.append("cover", chapterCover);
    this.closeModal();
    this.actions.addChapter({
        auth: this.getCookie('auth'),
      body: formData
    });
  }

  closeModal() {
    this.setState({
      modalAction: 'add',
      modalVisible : false,
      chapterId: '',
      chapterName: '',
      chapterSlug: '',
      chapterDescription: '',
      chapterCover: '',
    });
    this.refs.chapter_cover.value = '';
  }

  render() {
    const {
      menuChapters,
      modalAction,
      modalVisible,
      chapterName,
      chapterSlug,
      chapterDescription,
      chapterCover
    } = this.state;

    return (
      <div>
        {((menuChapters && !_.isEmpty(menuChapters)) || !!this.props.authState.userData) &&
          <MenuList
            goToAction={this.handleGoToChapter.bind(this)}
            editAction={(!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? this.handleEditChapter.bind(this)
              : null}
            deleteAction={(!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? this.handleDeleteChapter.bind(this)
              : null}
            addNewChapter={(!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? this.handleAddChapter.bind(this)
              : null}
            menuChapters={menuChapters}
          />
        }
        <Modal
          visible={modalVisible}
          width="70%"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div className="popup-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal.bind(this)}>&#215;</button>
              <h4 className="modal-title">
                {
                  modalAction === 'add' ? "Добавить новый раздел" : "Редактировать раздел"
                }
              </h4>
            </div>
            <form className="popup-form" onSubmit={this.closeModal.bind(this)}>
              <div className="form-group">
                <label htmlFor="chapter_name">Название раздела:</label>
                <input
                  className="form-control"
                  type="text"
                  id="chapter_name"
                  name="chapterName"
                  value={chapterName}
                  onChange={this.changeChapterName.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="chapter_slug">Адрес раздела (латиницей):</label>
                <input
                  className="form-control"
                  type="text"
                  id="chapter_slug"
                  name="chapterSlug"
                  value={chapterSlug}
                  onChange={this.changeChapterSlug.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="chapter_description">Описание раздела:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  id="chapter_description"
                  name="chapterDescription"
                  value={chapterDescription}
                  onChange={this.changeChapterDescription.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="chapter_cover">Обложка раздела:</label>
                <input
                  ref="chapter_cover"
                  className="form-control"
                  type="file"
                  accept="image/*"
                  id="chapter_cover"
                  name="chapterCover"
                  defaultValue={chapterCover}
                  onChange={this.changeChapterCover.bind(this)}
                />
              </div>
              {chapterCover &&
                <div className="cover-preview">
                  <div className="delete-button" onClick={this.changeChapterCover.bind(this, null)}>delete link</div>
                  <img src={(typeof chapterCover === 'string') ? chapterCover : window.URL.createObjectURL(chapterCover)} />
                </div>
              }
              <button
                className="btn btn-success"
                type="button"
                onClick={
                  modalAction === 'add' ? this.submitAddModal.bind(this) : this.submitEditModal.bind(this)
                }
                disabled={!(chapterName && chapterSlug && chapterDescription)}
              >
                {
                  modalAction === 'add' ? "Добавить" : "Сохранить"
                }
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

IndexContainer.contextTypes = {
  router: React.PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(IndexContainer);