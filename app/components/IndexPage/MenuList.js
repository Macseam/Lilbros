'use strict';

import React from 'react';
import _ from 'lodash';

import settings from '../../settings';
import MenuItem from './MenuItem';

import { MdAddCircle } from 'react-icons/lib/md';

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
              slug={menuItemObj.slug}
              cover={(menuItemObj.images && !_.isEmpty(menuItemObj.images))
                ? settings.apiUrl + '/uploads/' + menuItemObj.images[0].url
                : ''}
              editAction={props.editAction ? ()=>{props.editAction(
                menuItemObj._id,
                menuItemObj.title,
                menuItemObj.slug,
                menuItemObj.description,
                (menuItemObj.images && !_.isEmpty(menuItemObj.images))
                  ? settings.apiUrl + '/uploads/' + menuItemObj.images[0].url
                  : null
              )} : null}
              toggleDeleteConfirmation={(e)=>props.toggleDeleteConfirmation(e)}
              deleteAction={props.deleteAction ? (e)=>{props.deleteAction(e, menuItemObj._id)} : null}
              goToAction={()=>{props.goToAction(menuItemObj.slug)}}
            />
          );
        }
      })}
      {!!props.addNewChapter &&
        <div className="top-level-menu-item-wrapper add-new">
          <div onClick={()=>{props.addNewChapter()}} className="top-level-menu-item">
            <div className="vertical-aligner">
              <div className="image-placeholder">
                <MdAddCircle />
              </div>
              <hr className="menu-item-divider" />
              <p>Добавить</p>
            </div>
            <div className="circle">&nbsp;</div>
          </div>
        </div>
      }
    </div>
  );
};

export default MenuList;
