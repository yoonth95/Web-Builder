import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NewMenu = ({ setIsOpen, dispatch, setBtn, idx }) => {
  return (
    <div
      className='subMenus addSubMenu'
      onClick={() => {
        setIsOpen(true);
        dispatch(setBtn(`추가${idx}`));
      }}
    >
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
};

export default NewMenu;
