import React from 'react';
import SelectBox from './SelectBox';
import 'styles/Management/EditForm.css';

const EditForm = ({ curMenuData, updateMenu, handleTitleValue, PrimaryMenuData, secondList, handleLinkValue, handleNewWindowValue, isNewWindow }) => {
  console.log('curMenuData', curMenuData);
  return (
    <form className='edit_wrap' onSubmit={(e) => updateMenu(e, curMenuData.idx)}>
      <label className='subMenu_label subMenu_title_label' htmlFor='subMenu_title'>
        제목
        <input id='subMenu_title' type='text' defaultValue={curMenuData.title} onChange={handleTitleValue} />
      </label>
      <div className='edit_wrap_sub'>
        <label className='subMenu_label link_label' htmlFor='subMenu_link'>
          링크
          <SelectBox curMenuData={curMenuData} PrimaryMenuData={PrimaryMenuData} subMenusData={secondList} handleLinkValue={handleLinkValue} />
        </label>
        <input
          type='checkbox'
          name='isNewWindow'
          id={`subMenu_chkBox_${curMenuData.idx}`}
          className='new_window_chkBox'
          checked={isNewWindow[curMenuData.idx] || false}
          onChange={(e) => handleNewWindowValue(e, curMenuData.idx)}
        />
        <label htmlFor={`subMenu_chkBox_${curMenuData.idx}`} className='txt_new_window'>
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
