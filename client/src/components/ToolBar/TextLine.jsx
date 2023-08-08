import React, { useState } from 'react';
import ToolBar from './ToolBar';

const TextLine = ({ line, index, handleUpdateText, handleStyleChange }) => {
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseUp = (e) => {
    const calculatedX = e.clientX;
    const calculatedY = e.clientY;
    setToolbarPosition({ x: calculatedX, y: calculatedY });
    setIsVisible(true);
  };

  return (
    <React.Fragment>
      <div
        className='module_text_line textWidth'
        contentEditable
        suppressContentEditableWarning
        style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}
        onMouseUp={handleMouseUp}
        onBlur={(e) => {
          handleUpdateText(index, e.target.innerHTML);
          setIsVisible(false);
        }}
        dangerouslySetInnerHTML={{ __html: line.text }}
      ></div>
      <ToolBar toolbarPosition={toolbarPosition} handleStyleChange={handleStyleChange} />
    </React.Fragment>
  );
};

export default TextLine;
