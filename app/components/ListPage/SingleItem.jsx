'use strict';

import React from 'react';

import { MdModeEdit, MdDeleteForever } from 'react-icons/lib/md';

const SingleItem = props => {
  return (
    <div
      className="bs-callout bs-callout-info list-item"
    >
      <div className="image-placeholder" style={{backgroundColor: props.color || 'gray'}}>
        {props.cover && !_.isEmpty(props.cover) &&
        <img src={props.cover}/>
        }
      </div>
      <h4 className="link list-item-title" onClick={props.goToItem}>{props.title}</h4>
      <h6>{props.description}</h6>
      {!!props.editAction &&
      <div className="edit-button" onClick={props.editAction}>
        <MdModeEdit />
      </div>
      }
      {!!props.deleteAction &&
      <div className="delete-button" onClick={props.deleteAction}>
        <MdDeleteForever />
      </div>
      }
    </div>
  );
};

export default SingleItem;