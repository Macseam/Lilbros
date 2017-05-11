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

  handleGoToChapter(path) {
    this.context.router.push(path);
  }

  handleEditChapter(id, title, slug, description) {
    this.setState({
      modalAction: 'edit',
      modalVisible : true,
      chapterId: id,
      chapterName: title,
      chapterSlug: slug,
      chapterDescription: description,
    });
  }

  handleDeleteChapter(id) {
    this.actions.deleteChapter(id);
  }

  handleAddChapter() {
    this.setState({
      modalAction: 'add',
      modalVisible : true
    });
  }

  changeChapterName(event) {
    this.setState({
      chapterName : event.target.value
    });
  }

  changeChapterSlug(event) {
    this.setState({
      chapterSlug : event.target.value
    });
  }

  changeChapterDescription(event) {
    this.setState({
      chapterDescription : event.target.value
    });
  }

  submitEditModal() {
    const {
      chapterId,
      chapterName,
      chapterSlug,
      chapterDescription
    } = this.state;
    const params = {
      id: chapterId,
      body: {
        title: chapterName,
        slug: chapterSlug,
        description: chapterDescription
      }
    };
    this.closeModal();
    this.actions.editChapter(params);
  }

  submitAddModal() {
    const {
      chapterName,
      chapterSlug,
      chapterDescription
    } = this.state;
    const params = {
      title: chapterName,
      slug: chapterSlug,
      description: chapterDescription
    };
    this.closeModal();
    this.actions.addChapter(params);
  }

  closeModal() {
    this.setState({
      modalAction: 'add',
      modalVisible : false,
      chapterId: '',
      chapterName: '',
      chapterSlug: '',
      chapterDescription: '',
    });
  }

  render() {
    const {
      menuChapters,
      modalAction,
      modalVisible,
      chapterName,
      chapterSlug,
      chapterDescription
    } = this.state;

    return (
      <div>
        {menuChapters && !_.isEmpty(menuChapters) &&
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
            <h1>
              {
                modalAction === 'add' ? "Добавить новый раздел" : "Редактировать раздел"
              }
            </h1>
            <form onSubmit={this.closeModal.bind(this)}>
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
              <button
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