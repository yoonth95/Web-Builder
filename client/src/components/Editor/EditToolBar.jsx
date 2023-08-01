import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faPalette } from "@fortawesome/free-solid-svg-icons";

import 'styles/Editor/EditToolBar.css';

const EditToolBar = () => {
  const inputRef_tool_tool = useRef(null);
  const toolbarRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [blockToolbar, setBlockToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleMouseDown = (e) => {
    setDragging(true);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) selection.removeAllRanges();
    setBlockToolbar(false);
  }

  const handleMouseUp = (e) => {
    if (dragging) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      let top = rect.top;
      let middle = (rect.left + rect.right) / 2;

      const text = range.toString();
      if (text.length > 0) {
        if (middle-115 < 0) middle = 120;
        else if (middle+115 > window.innerWidth) middle = window.innerWidth-120;
        setToolbarPosition({ x: middle-115, y: top-40 });
        setBlockToolbar(true);
      } else {
        setBlockToolbar(false);
      }
    }
    setDragging(false);
  }

  const handleStyleChange = (command) => {
    document.execCommand(command, false, null);
  }

  const handleColorChange = (event) => {
    setBackgroundColor(event.target.value);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef_tool_tool.current && !inputRef_tool_tool.current.contains(e.target) &&
          toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setBlockToolbar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <>
      {blockToolbar ? 
        <div 
          ref={toolbarRef}
          className='options' 
          style={{left: `${toolbarPosition.x}px`, top: `${toolbarPosition.y}px`}}
        >
        <button className='option_btn' onClick={() => handleStyleChange('bold')}><FontAwesomeIcon icon={faBold} /></button>
        <button className='option_btn' onClick={() => handleStyleChange('italic')}><FontAwesomeIcon icon={faItalic} /></button>
        <button className='option_btn' onClick={() => handleStyleChange('underline')}><FontAwesomeIcon icon={faUnderline} /></button>
        <button className='option_btn' onClick={() => handleStyleChange('justifyLeft')}><FontAwesomeIcon icon={faAlignLeft} /></button>
        <button className='option_btn' onClick={() => handleStyleChange('justifyCenter')}><FontAwesomeIcon icon={faAlignCenter} /></button>
        <button className='option_btn' onClick={() => handleStyleChange('justifyRight')}><FontAwesomeIcon icon={faAlignRight} /></button>
        <button className='option_btn' onClick={() => handleStyleChange('justifyFull')}><FontAwesomeIcon icon={faAlignJustify} /></button>
        <input type='color' value={backgroundColor} onChange={handleColorChange} className='color_box'/>
      </div>
      : null}
      <div 
        ref={inputRef_tool_tool} 
        contentEditable 
        className='textField' 
        style={{backgroundColor}}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={() => setBlockToolbar(true)}
      ></div>
    </>
  );
};

export default EditToolBar;
