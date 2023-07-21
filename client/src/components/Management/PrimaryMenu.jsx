import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import SelectBox from './SelectBox';

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
              editMenu(menu.idx, menu.title, menu.link);
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
        <form className='edit_wrap' onSubmit={(e) => updateMenu(e, menu.idx)}>
          <label className='primaryMenu_label primaryMenu_title_label' htmlFor='primaryMenu_title'>
            제목
            <input id='primaryMenu_title' type='text' defaultValue={menu.title} onChange={handleTitleValue} />
          </label>
          <div className='edit_wrap_sub'>
            <label className='primaryMenu_label link_label' htmlFor='primaryMenu_link'>
              링크
              <SelectBox PrimaryMenu={menu} subMenusData={secondList} handleLinkValue={handleLinkValue} />
            </label>
            <input
              type='checkbox'
              name='isNewWindow'
              id={`primaryMenu_chkBox_${menu.idx}`}
              className='new_window_chkBox'
              checked={isNewWindow[menu.idx] || false}
              onChange={(e) => handleNewWindowValue(e, menu.idx)}
            />
            <label htmlFor={`primaryMenu_chkBox_${menu.idx}`} className='txt_new_window'>
              새 창 열기
            </label>
            <button className='save_btn' type='submit'>
              저장
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PrimaryMenu;
