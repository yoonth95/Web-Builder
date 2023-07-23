import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import EditForm from './EditForm';

const PrimaryMenu = ({ toggleImage, clickId, editMenuIds, editMenu, deleteMenu, menu, firstList, secondList }) => {
  return (
    <div className="primaryMenus_wrap">
      <div className={`primaryMenus ${editMenuIds.includes(menu.idx) ? "withEdit" : ""}`}>
        <div className="img_wrap" onClick={() => toggleImage(menu.idx)}>
          <span style={{ transform: clickId.includes(menu.idx) ? "rotate(90deg)" : "rotate(0deg)" }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </div>
        <h1>{menu.title}</h1>
        <div className="box">
          <span onClick={() => {editMenu(menu.idx)}}>
            <FontAwesomeIcon icon={faGear} />
          </span>
          <span onClick={() => deleteMenu(menu.idx, menu.order_num)}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
      </div>
      {editMenuIds.includes(menu.idx) && (
        <EditForm curMenuData={menu} firstList={firstList} secondList={secondList}/>
      )}
    </div>
  );
};

export default PrimaryMenu;
