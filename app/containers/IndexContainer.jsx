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
      addModalVisible : false,
      addChapterName: '',
      addChapterDescription: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chaptersList !== this.state.menuChapters &&
      nextProps.authState.loaded) && nextProps.authState.chaptersList) {
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
    this.actions.getHeaderAuthToken();
    this.actions.getChaptersList();
  }

  handleGoToChapter(path) {
    this.context.router.push(path);
  }

  handleEditChapter(id) {
    console.log('edit ' + id);
  }

  handleDeleteChapter(id) {
    this.actions.deleteChapter(id);
  }

  handleAddChapter() {
    this.setState({
      addModalVisible : true
    });
    console.log('add new chapter');
  }

  changeAddChapterName(event) {
    this.setState({
      addChapterName : event.target.value
    });
  }

  changeAddChapterDescription(event) {
    this.setState({
      addChapterDescription : event.target.value
    });
  }

  closeAddModal() {
    this.setState({
      addModalVisible : false
    });
  }

  render() {
    const {
      menuChapters
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
          visible={this.state.addModalVisible}
          width="70%"
          height="50%"
          effect="fadeInDown"
          onClickAway={() => this.closeAddModal()}
        >
          <div className="popup-content">
            <h1>Добавить новый раздел</h1>
            <form onSubmit={this.closeAddModal.bind(this)}>
              <div className="form-group">
                <label htmlFor="chapter_name">Название раздела:</label>
                <input
                  className="form-control"
                  type="text"
                  id="chapter_name"
                  name="chapterName"
                  defaultValue={this.state.addChapterName}
                  onChange={this.changeAddChapterName.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="chapter_description">Описание раздела:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  id="chapter_description"
                  name="chapterDescription"
                  defaultValue={this.state.addChapterDescription}
                  onChange={this.changeAddChapterDescription.bind(this)}
                />
              </div>
              <button type="button" onClick={this.closeAddModal.bind(this)}>Добавить</button>
              <button type="button" onClick={this.closeAddModal.bind(this)}>Отмена</button>
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