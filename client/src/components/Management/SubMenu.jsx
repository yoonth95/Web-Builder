import React from 'react';
import EditForm from './EditForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';

const SubMenu = ({ secondList, idx, editMenuIds, editMenu, deleteMenu, updateMenu, handleTitleValue, menu, handleLinkValue, handleNewWindowValue, isNewWindow }) => {
  return (
    <div>
      {secondList
        .filter((submenu) => submenu.parent_id === idx)
        .map((submenu) => (
          <div className='subMenus_wrap' key={submenu.idx}>
            <div className={`subMenus ${editMenuIds.includes(submenu.idx) ? 'withEdit' : ''}`}>
              <h1 className='sub_box'>{submenu.title}</h1>
              <div className='box'>
                <span onClick={() => editMenu(submenu.idx)}>
                  <FontAwesomeIcon icon={faGear} />
                </span>
                <span onClick={() => deleteMenu(submenu.idx, submenu.order_num, submenu.parent_id)}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
            </div>
            {editMenuIds.includes(submenu.idx) && (
              <EditForm
                submenu={submenu}
                updateMenu={updateMenu}
                handleTitleValue={handleTitleValue}
                menu={menu}
                secondList={secondList}
                handleLinkValue={handleLinkValue}
                handleNewWindowValue={handleNewWindowValue}
                isNewWindow={isNewWindow}
              />
            )}
            {/* submenu, updateMenu, handleTitleValue, menu, secondList, handleLinkValue, handleNewWindowValue, isNewWindow  */}
          </div>
        ))}
    </div>
  );
};

export default SubMenu;
