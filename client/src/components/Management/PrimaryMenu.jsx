import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import EditForm from './EditForm';

const PrimaryMenu = ({ editMenuIds, menu, toggleImage, clickId, editMenu, deleteMenu, updateMenu, handleTitleValue, handleLinkValue, handleNewWindowValue, secondList, isNewWindow }) => {
  return (
    <div className='primaryMenus_wrap'>
      <div className={`primaryMenus ${editMenuIds.includes(menu.idx) ? 'withEdit' : ''}`}>
        <div className='img_wrap' onClick={() => toggleImage(menu.idx)}>
          <span style={{ transform: clickId.includes(menu.idx) ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </div>
        <h1>{menu.title}</h1>
        <div className='box'>
          <span
            onClick={() => {
              editMenu(menu.idx, menu.title, menu.link,menu.new_window);
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </span>
          <span onClick={() => deleteMenu(menu.idx, menu.order_num)}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
      </div>
      {editMenuIds.includes(menu.idx) && (
        <EditForm
          curMenuData={menu}
          updateMenu={updateMenu}
          handleTitleValue={handleTitleValue}
          PrimaryMenuData={menu}
          secondList={secondList}
          handleLinkValue={handleLinkValue}
          handleNewWindowValue={handleNewWindowValue}
          isNewWindow={isNewWindow}
        />
      )}
    </div>
  );
};

export default PrimaryMenu;
