'use strict';

import React from 'react';

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
          <div className="image-placeholder" style={{backgroundColor: props.color || 'gray'}}>&nbsp;</div>
          <hr className="menu-item-divider" />
          <p>{props.title || 'No title available'}</p>
        </div>
      </div>
    </div>
  );

};

export default MenuItem;