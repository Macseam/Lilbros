'use strict';

import React from 'react';
import _ from 'lodash';

import settings from '../../settings';
import MenuItem from './MenuItem';

const MenuList = props => {
  return (
    <div className="main-menu-wrapper">
      {props.menuChapters && !_.isEmpty(props.menuChapters)
      && _.map(props.menuChapters, (menuItemObj, index)=>{
        if (!menuItemObj.parent) {
          return (
            <MenuItem
              key={index}
              title={menuItemObj.title}
              cover={(menuItemObj.images && !_.isEmpty(menuItemObj.images))
                ? settings.apiUrl + '/uploads/' + menuItemObj.images[0].url
                : ''}
              color={menuItemObj.color || 'gray'}
              editAction={props.editAction ? ()=>{props.editAction(
                menuItemObj._id,
                menuItemObj.title,
                menuItemObj.slug,
                menuItemObj.description,
                (menuItemObj.images && !_.isEmpty(menuItemObj.images))
                  ? settings.apiUrl + '/uploads/' + menuItemObj.images[0].url
                  : null
              )} : null}
              deleteAction={props.deleteAction ? ()=>{props.deleteAction(menuItemObj._id)} : null}
              goToAction={()=>{props.goToAction(menuItemObj.slug)}}
            />
          );
        }
      })}
      {!!props.addNewChapter &&
        <div className="top-level-menu-item-wrapper">
          <div onClick={()=>{props.addNewChapter()}} className="top-level-menu-item">
            <div className="vertical-aligner">
              <div className="image-placeholder" style={{backgroundColor: 'transparent'}}>+</div>
              <hr className="menu-item-divider" />
              <p>Добавить новый раздел</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default MenuList;
