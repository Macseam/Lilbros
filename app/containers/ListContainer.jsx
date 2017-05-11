'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import Modal from 'react-awesome-modal';
import ItemsList from "../components/ListPage/ItemsList";

class ListContainer extends Component {

  constructor(props) {
    super(props);

    this.actions = this.props.authActions;
    this.state = {
      chapterItems: [],
      modalVisible : false,
      modalAction: 'add',
      itemId: '',
      itemName: '',
      itemSlug: '',
      itemDescription: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chapterItemsList !== this.state.chapterItems &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemsList) {
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
    if ((nextProps.authState.itemAdded !== this.props.authState.itemAdded &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemsList) {
      if (_.isEmpty(this.props.authState.chapterItemsList)) {
        this.actions.getChaptersList();
      }
      this.actions.getItemsList(this.props.params.chapter);
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
    if ((nextProps.authState.itemEdited !== this.props.authState.itemEdited &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemsList) {
      if (_.isEmpty(this.props.authState.chapterItemsList)) {
        this.actions.getChaptersList();
      }
      this.actions.getItemsList(this.props.params.chapter);
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
    if ((nextProps.authState.itemDeleted !== this.props.authState.itemDeleted &&
      nextProps.authState.loaded) && nextProps.authState.chapterItemsList) {
      if (_.isEmpty(this.props.authState.chapterItemsList)) {
        this.actions.getChaptersList();
      }
      this.actions.getItemsList(this.props.params.chapter);
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

  handleEditItem(id, title, slug, description) {
    this.setState({
      modalAction: 'edit',
      modalVisible : true,
      itemId: id,
      itemName: title,
      itemSlug: slug,
      itemDescription: description,
    });
  }

  handleDeleteItem(id) {
    this.actions.deleteItem(id);
  }

  handleAddItem() {
    this.setState({
      modalAction: 'add',
      modalVisible : true
    });
  }

  changeItemName(event) {
    this.setState({
      itemName : event.target.value
    });
  }

  changeItemSlug(event) {
    this.setState({
      itemSlug : event.target.value
    });
  }

  changeItemDescription(event) {
    this.setState({
      itemDescription : event.target.value
    });
  }

  submitEditModal() {
    const {
      itemId,
      itemName,
      itemSlug,
      itemDescription
    } = this.state;
    const params = {
      id: itemId,
      body: {
        title: itemName,
        slug: itemSlug,
        description: itemDescription
      }
    };
    this.closeModal();
    this.actions.editItem(params);
  }

  submitAddModal() {
    const {
      itemName,
      itemSlug,
      itemDescription
    } = this.state;
    const parentId = _.find(this.props.authState.chaptersList, (chapterObj)=>{
      return (chapterObj.slug === this.props.params.chapter);
    });
    const params = {
      parent: parentId ? parentId._id : null,
      title: itemName,
      slug: itemSlug,
      description: itemDescription
    };
    this.closeModal();
    this.actions.addItem(params);
  }

  closeModal() {
    this.setState({
      modalAction: 'add',
      modalVisible : false,
      itemId: '',
      itemName: '',
      itemSlug: '',
      itemDescription: '',
    });
  }

  render() {
    const {
      chapterItems,
      modalVisible,
      modalAction,
      itemName,
      itemSlug,
      itemDescription
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
        {((chapterItems && !_.isEmpty(chapterItems)) || !!this.props.authState.userData) &&
          <ItemsList
            goToItem={this.handleGoToItem.bind(this)}
            editAction={(!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? this.handleEditItem.bind(this)
              : null}
            deleteAction={(!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? this.handleDeleteItem.bind(this)
              : null}
            addNewItem={(!!this.props.authState.userData && this.props.authState.userData !== 'guest user')
              ? this.handleAddItem.bind(this)
              : null}
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
        <Modal
          visible={modalVisible}
          width="70%"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div className="popup-content">
            <h1>
              {
                modalAction === 'add'
                  ? "Добавить новый элемент раздела" + (chapterTitle ? ' ' + chapterTitle.title : '')
                  : "Редактировать элемент раздела" + (chapterTitle ? ' ' + chapterTitle.title : '')
              }
            </h1>
            <form onSubmit={this.closeModal.bind(this)}>
              <div className="form-group">
                <label htmlFor="item_name">Название элемента:</label>
                <input
                  className="form-control"
                  type="text"
                  id="item_name"
                  name="itemName"
                  value={itemName}
                  onChange={this.changeItemName.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="item_slug">Адрес элемента (латиницей):</label>
                <input
                  className="form-control"
                  type="text"
                  id="item_slug"
                  name="itemSlug"
                  value={itemSlug}
                  onChange={this.changeItemSlug.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="item_description">Описание элемента:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  id="item_description"
                  name="itemDescription"
                  value={itemDescription}
                  onChange={this.changeItemDescription.bind(this)}
                />
              </div>
              <button
                type="button"
                onClick={
                  modalAction === 'add' ? this.submitAddModal.bind(this) : this.submitEditModal.bind(this)
                }
                disabled={!(itemName && itemSlug && itemDescription)}
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