import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faPalette } from '@fortawesome/free-solid-svg-icons';

const ToolBar = ({ toolbarPosition, handleStyleChange }) => {
  return (
    <div className='options' style={{ left: `${toolbarPosition.x}px`, top: `${toolbarPosition.y}px` }}>
      <button className='option_btn' onClick={() => handleStyleChange('bold')}>
        <FontAwesomeIcon icon={faBold} />
      </button>
      <button className='option_btn' onClick={() => handleStyleChange('italic')}>
        <FontAwesomeIcon icon={faItalic} />
      </button>
      <button className='option_btn' onClick={() => handleStyleChange('underline')}>
        <FontAwesomeIcon icon={faUnderline} />
      </button>
      <button className='option_btn' onClick={() => handleStyleChange('justifyLeft')}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </button>
      <button className='option_btn' onClick={() => handleStyleChange('justifyCenter')}>
        <FontAwesomeIcon icon={faAlignCenter} />
      </button>
      <button className='option_btn' onClick={() => handleStyleChange('justifyRight')}>
        <FontAwesomeIcon icon={faAlignRight} />
      </button>
      <button className='option_btn' onClick={() => handleStyleChange('justifyFull')}>
        <FontAwesomeIcon icon={faAlignJustify} />
      </button>
    </div>
  );
};

export default ToolBar;
