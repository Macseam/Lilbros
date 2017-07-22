'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import translitRusEng from 'translit-rus-eng';
import { Navigation } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

import Modal from 'react-awesome-modal';
import { MdHome, MdModeEdit, MdDeleteForever } from 'react-icons/lib/md';
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
      itemCover: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.authState.chapterItemsList !== this.state.chapterItems &&
      _.isEmpty(nextProps.authState.loading)) && nextProps.authState.chapterItemsList) {
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
    if ((nextProps.authState.itemAdded !== this.props.authState.itemAdded &&
      _.isEmpty(nextProps.authState.loading)) && nextProps.authState.chapterItemsList) {
      if (_.isEmpty(this.props.authState.chapterItemsList)) {
        this.actions.getChaptersList();
      }
      this.actions.getItemsList(this.props.params.chapter);
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
    if ((nextProps.authState.itemEdited !== this.props.authState.itemEdited &&
      _.isEmpty(nextProps.authState.loading)) && nextProps.authState.chapterItemsList) {
      if (_.isEmpty(this.props.authState.chapterItemsList)) {
        this.actions.getChaptersList();
      }
      this.actions.getItemsList(this.props.params.chapter);
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
    if ((nextProps.authState.itemDeleted !== this.props.authState.itemDeleted &&
      _.isEmpty(nextProps.authState.loading)) && nextProps.authState.chapterItemsList) {
      if (_.isEmpty(this.props.authState.chapterItemsList)) {
        this.actions.getChaptersList();
      }
      this.refs['item_cover'].value = '';
      this.actions.getItemsList(this.props.params.chapter);
      this.setState({
        chapterItems: nextProps.authState.chapterItemsList,
      });
    }
  }

  componentDidMount() {
    if (_.isEmpty(this.props.authState.chaptersList)) {
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

  handleEditItem(slug) {
    this.actions.setDetailsEditable(true);
    this.context.router.push(slug);
  }

  handleDeleteItem(e, id) {
    e.stopPropagation();
    this.actions.deleteItem({
      id: id
    });
  }

  handleAddItem() {
    this.setState({
      modalAction: 'add',
      modalVisible : true
    });
  }

  toggleDeleteConfirmation(e) {
    if (e && e.currentTarget) {
      let confirmElement = e.currentTarget.querySelector('.delete-confirm');
      let confirmElementClassName = confirmElement.className;
      confirmElement.className = confirmElement.className === 'delete-confirm'
        ? 'delete-confirm selected'
        : 'delete-confirm hidden selected';
      let allOtherElements = document.querySelectorAll('.delete-confirm:not(.selected)');
      _.map(allOtherElements, (foundElement)=> {
        foundElement.className = 'delete-confirm hidden';
      });
      if (confirmElementClassName === 'delete-confirm hidden') {
        confirmElement.className = 'delete-confirm';
      }
      else if (confirmElementClassName === 'delete-confirm' && (window.getComputedStyle(confirmElement, null).opacity != 1)) {
        confirmElement.className = 'delete-confirm hidden';
        setTimeout(()=>{
          confirmElement.className = 'delete-confirm';
        },10);
      }
      else {
        confirmElement.className = 'delete-confirm hidden';
      }
    }
  }

  limitDescription(html) {
    let htmlAfterDot = html.split('.')[0];
    let tmp = document.createElement("DIV");
    tmp.innerHTML = htmlAfterDot;
    return tmp.textContent || tmp.innerText || "";
  }

  changeItemName(event) {
    this.setState({
      itemName: event.target.value
    });
  }

  itemNameFocusOut() {
    if (!this.state.itemSlug || _.isEmpty(this.state.itemSlug)) {
      this.setState({
        itemSlug: translitRusEng(this.state.itemName, "slug")
      });
    }
  }

  changeItemSlug(event) {
    this.setState({
      itemSlug: event.target.value
    });
  }

  changeItemDescription(event) {
    this.setState({
      itemDescription: event.target.value
    });
  }

  changeItemCover(event) {
    if (event && event.target.files[0] && (event.target.files[0].type.indexOf('image/') !== -1) && event.target.files[0].size !== 0) {
      this.setState({
        itemCover: event.target.files[0]
      });
    }
    else {
      this.setState({
        itemCover: null
      });
      this.refs.item_cover.value = '';
    }
  }

  dragOverItemCover(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  dropItemCover(event) {
    if (event.dataTransfer) {
      if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
        _.map(event.dataTransfer.items, (fileObj)=>{
          this.setState({
            itemCover: fileObj.getAsFile()
          });
        });
      }
      else if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        _.map(event.dataTransfer.files, (fileObj)=>{
          this.setState({
            itemCover: fileObj.name
          });
        });
      }
    }
    event.stopPropagation();
    event.preventDefault();
  }

  submitEditModal() {
    const {
      itemId,
      itemName,
      itemSlug,
      itemDescription,
      itemCover
    } = this.state;
    const formData = new FormData();
    formData.append("body", JSON.stringify({
      title: itemName,
      slug: itemSlug,
      description: itemDescription,
    }));
    formData.append("cover", itemCover);
    this.closeModal();
    this.actions.editItem({
      id: itemId,
      body: formData
    });
  }

  submitAddModal() {
    const {
      itemName,
      itemSlug,
      itemDescription,
      itemCover
    } = this.state;
    const parentId = _.find(this.props.authState.chaptersList, (chapterObj)=>{
      return (chapterObj.slug === this.props.params.chapter);
    });
    const formData = new FormData();
    formData.append("body", JSON.stringify({
      title: itemName,
      slug: itemSlug,
      description: itemDescription,
      parent: parentId ? parentId._id : null,
    }));
    formData.append("cover", itemCover);
    this.closeModal();
    this.actions.addItem({
      body: formData
    });
  }

  closeModal() {
    this.setState({
      modalAction: 'add',
      modalVisible : false,
      itemId: '',
      itemName: '',
      itemSlug: '',
      itemDescription: '',
      itemCover: '',
    });
  }

  render() {
    const {
      chapterItems,
      modalVisible,
      modalAction,
      itemName,
      itemSlug,
      itemDescription,
      itemCover
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
          className="btn btn-default btn-xs back-home-button list-home-button"
          onClick={this.handleGoBack.bind(this)}
        >
          <MdHome />
          Вернуться на главную
        </button>
        {((chapterItems && !_.isEmpty(chapterItems)) || !!this.props.authState.userData) &&
          <ItemsList
            goToItem={this.handleGoToItem.bind(this)}
            editAction={!!this.props.authState.userData
              ? this.handleEditItem.bind(this)
              : null}
            deleteAction={!!this.props.authState.userData
              ? this.handleDeleteItem.bind(this)
              : null}
            toggleDeleteConfirmation={!!this.props.authState.userData
              ? this.toggleDeleteConfirmation.bind(this)
              : null}
            limitDescription={this.limitDescription.bind(this)}
            addNewItem={!!this.props.authState.userData
              ? this.handleAddItem.bind(this)
              : null}
            chapterItems={chapterItems}
            chapterSlug={this.props.params.chapter}
            chapterTitle={(!_.isEmpty(chapterTitle) && chapterTitle) ? chapterTitle.title : 'Нет заголовка'}
          />
        }
        {_.isEmpty(chapterItems)
        && _.isEmpty(this.props.authState.loading) &&
          <h5 className="nothing-here">А тут ничего пока нет :(</h5>
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
                <h4 className="modal-title">
                  {
                    modalAction === 'add'
                      ? "Добавить новый элемент раздела" + (chapterTitle ? ' ' + chapterTitle.title : '')
                      : "Редактировать элемент раздела" + (chapterTitle ? ' ' + chapterTitle.title : '')
                  }
                </h4>
              </div>
              <form className="popup-form" onSubmit={this.closeModal.bind(this)}>
                <div className="form-group">
                  <label htmlFor="item_name">Название элемента:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="item_name"
                    name="itemName"
                    value={itemName}
                    onChange={this.changeItemName.bind(this)}
                    onBlur={this.itemNameFocusOut.bind(this)}
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
                    rows="10"
                    id="item_description"
                    name="itemDescription"
                    value={itemDescription}
                    onChange={this.changeItemDescription.bind(this)}
                  />
                </div>
                <div className="form-group cover-input">
                  <label htmlFor="item_cover">Обложка элемента:</label>
                  <input
                    ref="item_cover"
                    className="form-control"
                    type="file"
                    accept="image/*"
                    id="item_cover"
                    name="itemCover"
                    defaultValue={itemCover}
                    onChange={this.changeItemCover.bind(this)}
                  />
                  {!itemCover &&
                  <div
                    className="cover-preview blank"
                    onClick={()=>{this.refs['item_cover'].click()}}
                    onDrop={this.dropItemCover.bind(this)}
                    onDragOver={this.dragOverItemCover.bind(this)}
                  >
                    <p className="add-title">
                      Добавить<br/>изображение
                    </p>
                  </div>
                  }
                  {itemCover &&
                  <div
                    className="cover-preview"
                    onDrop={this.dropItemCover.bind(this)}
                    onDragOver={this.dragOverItemCover.bind(this)}
                  >
                    <div className="delete-button" onClick={this.changeItemCover.bind(this, null)}>
                      <MdDeleteForever />
                    </div>
                    <div className="edit-button" onClick={()=>{this.refs['item_cover'].click()}}>
                      <MdModeEdit />
                    </div>
                    <img src={(typeof itemCover === 'string') ? itemCover : window.URL.createObjectURL(itemCover)} />
                    <p className="preview-title">
                      {typeof itemCover === 'string'
                        ? itemCover.split('/')[itemCover.split('/').length-1]
                        : itemCover.name.split('/')[itemCover.name.split('/').length-1]}
                    </p>
                  </div>
                  }
                </div>
                <div className="buttons-wrapper centered">
                  <button
                    className="btn btn-success"
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

ListContainer.contextTypes = {
  router: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ...authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(ListContainer);