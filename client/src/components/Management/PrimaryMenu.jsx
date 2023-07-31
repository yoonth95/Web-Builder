import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import EditForm from './EditForm';
import 'styles/Management/PrimaryMenu.css';

const PrimaryMenu = ({ toggleImage, clickId, editMenuIds, editMenu, deleteMenu, menu, firstList, secondList }) => {
  return (
    <div className='primaryMenus_wrap'>
      <div className={`primaryMenus ${editMenuIds.includes(menu.idx) ? 'withEdit' : ''}`}>
        <div className='img_wrap' onClick={() => toggleImage(menu.idx)}>
          <button className={`btn_arrow ${clickId.includes(menu.idx) ? 'btn_rotation' : ''}`}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
        <h1>{menu.title}</h1>
        <div className='box'>
          <button
            onClick={() => {
              editMenu(menu.idx);
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </button>
          <button onClick={() => deleteMenu(menu.idx, menu.order_num)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      {editMenuIds.includes(menu.idx) && <EditForm curMenuData={menu} firstList={firstList} secondList={secondList} editMenu={editMenu} />}
    </div>
  );
};

export default PrimaryMenu;
