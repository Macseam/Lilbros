'use strict';

import React from 'react';
import _ from 'lodash';
import { MdModeEdit, MdDeleteForever } from 'react-icons/lib/md';

const MenuItem = props => {
  return (
    <div className={"top-level-menu-item-wrapper " + props.slug}>
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
      <div onClick={props.goToAction} className="top-level-menu-item">
        <div className="vertical-aligner">
          <div className="image-placeholder">
            {props.cover && !_.isEmpty(props.cover) &&
              <img src={props.cover}/>
            }
          </div>
          <hr className="menu-item-divider" />
          <p>{props.title || 'No title available'}</p>
        </div>
        <div className="circle">&nbsp;</div>
      </div>
    </div>
  );

};

export default MenuItem;