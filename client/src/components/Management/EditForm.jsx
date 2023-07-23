import React, { useState } from 'react';
import { useMenuActions } from 'hooks/useMenu';
import SelectBox from './SelectBox';
import 'styles/Management/EditForm.css';

const EditForm = ({ curMenuData, secondList }) => {
  const [editedTitle, setEditedTitle] = useState(curMenuData.title);
  const [editedLink, setEditedLink] = useState(curMenuData.link);
  const [editedWindow, setEditedWindow] = useState(curMenuData.new_window);
  const { updateMenuAction } = useMenuActions();

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setEditedLink(e.target.value);
  };

  const handleWindowChange = () => {
    setEditedWindow(!editedWindow);
  }

  const updateMenu = (e, idx) => {
    e.preventDefault();

    const updateFetch = async () => {
      let new_window;
      if (editedWindow === 1 || editedWindow === true) new_window = 1;
      else if (editedWindow === 0 || editedWindow === false) new_window = 0;

      const formData = {
        idx: idx,
        title: editedTitle,
        link: editedLink,
        new_window: new_window
      };

      await updateMenuAction(formData);
    };

    if (window.confirm('해당 메뉴를 수정 하시겠습니까?')) updateFetch();
  }
  
  return (
    <form className="edit_wrap" onSubmit={(e) => updateMenu(e, curMenuData.idx)}>
      <label className="subMenu_label subMenu_title_label" htmlFor="subMenu_title">
        제목
        <input id="subMenu_title" type="text" defaultValue={editedTitle} onChange={handleTitleChange} />
      </label>
      <div className="edit_wrap_sub">
        <label className="subMenu_label link_label" htmlFor="subMenu_link">
          링크
          <SelectBox curMenuData={curMenuData} secondList={secondList} editedLink={editedLink} handleLinkChange={handleLinkChange} />
        </label>
        <input
          type="checkbox"
          name="isNewWindow"
          id={`subMenu_chkBox_${curMenuData.idx}`}
          className="new_window_chkBox"
          checked={editedWindow}
          onChange={handleWindowChange}
        />
        <label htmlFor={`subMenu_chkBox_${curMenuData.idx}`} className="txt_new_window">새 창 열기</label>
        <button className="save_btn" type="submit">저장</button>
      </div>
    </form>
  );
};

export default EditForm;
