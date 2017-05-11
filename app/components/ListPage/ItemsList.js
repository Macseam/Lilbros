import React from 'react';
import _ from 'lodash';

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
            description={chapterItem.description}
            editAction={props.editAction ? ()=>{props.editAction(
              chapterItem._id,
              chapterItem.title,
              chapterItem.slug,
              chapterItem.description
            )} : null}
            deleteAction={props.deleteAction ? ()=>{props.deleteAction(chapterItem._id)} : null}
            goToItem={()=>{props.goToItem('chapter/' + props.chapterSlug + '/details/' + chapterItem.slug)}}
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
