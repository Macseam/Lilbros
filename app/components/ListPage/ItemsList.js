import React from 'react';
import _ from 'lodash';

import settings from '../../settings';
import SingleItem from './SingleItem';

const ItemsList = props => {

  return (
    <div className="chapter-items-list-wrapper">
      <h3>{props.chapterTitle}</h3>
        {_.map(props.chapterItems, (chapterItem, key)=>{
          return (
          <SingleItem
            key={key}
            title={chapterItem.title}
            color={chapterItem.color}
            cover={(chapterItem.images && !_.isEmpty(chapterItem.images))
              ? settings.apiUrl + '/uploads/' + chapterItem.images[0].url
              : ''}
            description={chapterItem.description}
            editAction={props.editAction ? ()=>{props.editAction(
              chapterItem._id,
              chapterItem.title,
              chapterItem.slug,
              chapterItem.description,
              (chapterItem.images && !_.isEmpty(chapterItem.images))
                ? settings.apiUrl + '/uploads/' + chapterItem.images[0].url
                : null
            )} : null}
            deleteAction={props.deleteAction ? ()=>{props.deleteAction(chapterItem._id)} : null}
            goToItem={()=>{props.goToItem(props.chapterSlug + '/' + chapterItem.slug)}}
          />
          );
        })}
      {!!props.addNewItem &&
      <div className="bs-callout bs-callout-info list-item">
        <div onClick={()=>{props.addNewItem()}} className="top-level-menu-item">
          <div className="image-placeholder" style={{backgroundColor: 'tranparent'}}>+</div>
            <h4 className="link list-item-title">Добавить новый элемент</h4>
        </div>
      </div>
      }
    </div>
  );
};

export default ItemsList;
