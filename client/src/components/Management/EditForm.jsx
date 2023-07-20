import React from 'react';
import SelectBox from './SelectBox';

const EditForm = ({ submenu, updateMenu, handleTitleValue, menu, secondList, handleLinkValue, handleNewWindowValue, isNewWindow }) => {
  return (
    <form className='edit_wrap' onSubmit={(e) => updateMenu(e, submenu.idx)}>
      <label className='subMenu_label subMenu_title_label' htmlFor='subMenu_title'>
        제목
        <input id='subMenu_title' type='text' defaultValue={submenu.title} onChange={handleTitleValue} />
      </label>
      <div className='edit_wrap_sub'>
        <label className='subMenu_label link_label' htmlFor='subMenu_link'>
          링크
          <SelectBox curMenuData={menu} subMenusData={secondList} handleLinkValue={handleLinkValue} />
        </label>
        <input
          type='checkbox'
          name='isNewWindow'
          id={`subMenu_chkBox_${submenu.idx}`}
          className='new_window_chkBox'
          checked={(isNewWindow && isNewWindow[submenu.idx]) || false}
          onChange={(e) => handleNewWindowValue(e, submenu.idx)}
        />
        <label htmlFor={`subMenu_chkBox_${submenu.idx}`} className='txt_new_window'>
          새 창 열기
        </label>
        <button className='save_btn' type='submit'>
          저장
        </button>
      </div>
    </form>
  );
};

export default EditForm;
