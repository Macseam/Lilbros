'use strict';

import React from 'react';
import _ from 'lodash';

const MenuItem = props => {
  return (
    <div className="top-level-menu-item-wrapper">
      {!!props.editAction &&
      <div className="edit-button" onClick={props.editAction}>edit link</div>
      }
      {!!props.deleteAction &&
      <div className="delete-button" onClick={props.deleteAction}>delete link</div>
      }
      <div onClick={props.goToAction} className="top-level-menu-item">
        <div className="vertical-aligner">
          <div className="image-placeholder" style={{backgroundColor: props.color || 'gray'}}>
            {props.cover && !_.isEmpty(props.cover) &&
              <img src={props.cover}/>
            }
          </div>
          <hr className="menu-item-divider" />
          <p>{props.title || 'No title available'}</p>
        </div>
      </div>
    </div>
  );

};

export default MenuItem;