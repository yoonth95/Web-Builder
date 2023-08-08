import React from 'react';

import ApplyTable from 'components/Editor/ApplyTable';

import EditToolBar from 'components/Editor/EditToolBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faImage, faPaperclip, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export const EditorRenderBox = {
  image: ({ design, block_id, blockStyle, attatchImg, attatchLink, deleteImage, screenSize }) => {
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }

    const screen = screenSize === 'desktop' ? 'container_desktop' : screenSize === 'tablet' ? 'container_tablet' : 'container_mobile';

    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    return (
      <div key={block_id} className='normal_module' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className={`module_container ${screen}`} style={design?.layout}>
            {[...Array(design?.images.length)].map((_, i) => {
              let shape = '',
                isCircle = false;
              if (design?.images[i].shape === 'circle') {
                shape = '50%';
                isCircle = true;
              }
              return (
                <div key={i} className={`${design?.images[i].src !== '' ? 'imageDiv backgroundNone' : 'imageDiv'} ${isCircle ? 'boxCircle' : ''}`} style={{ borderRadius: shape }}>
                  {design?.images[i].src !== '' ? (
                    <div className={`moduleBox ${screenSize === 'desktop' ? 'desktop' : ''}`}>
                      <div className='icon_container'>
                        <span className='deleteIcon' onClick={() => deleteImage({ block_id: blockId, idx: i, isLayout: isLayout })}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </span>
                        <div style={{ display: 'flex', gap: '20px' }}>
                          <label className='imgIcon'>
                            <FontAwesomeIcon icon={faImage} />
                            <input type='file' accept='image/*' onChange={(e) => attatchImg({ tag: e, block_id: blockId, idx: i, isLayout: isLayout })} />
                          </label>
                          <span className='linkIcon' onClick={() => attatchLink({ block_id: blockId, idx: i, isLayout: isLayout })}>
                            <FontAwesomeIcon icon={faPaperclip} />
                          </span>
                        </div>
                      </div>
                      <img className='imageTag' src={`${design?.images[i].src}`} alt='' style={{ borderRadius: shape }} loading='lazy' />
                    </div>
                  ) : (
                    <div className={`moduleBox ${screenSize === 'desktop' ? 'desktop imgHover' : ''}`} style={{ borderRadius: shape }}>
                      <div className='downIcon'>
                        <FontAwesomeIcon icon={faDownload} />
                      </div>
                      <div className='attatchIcon' style={{ borderRadius: shape }}>
                        <label>
                          <FontAwesomeIcon icon={faImage} />
                          <input type='file' accept='image/*' onChange={(e) => attatchImg({ tag: e, block_id: blockId, idx: i, isLayout: isLayout })} />
                        </label>
                        <label onClick={() => attatchLink({ block_id: blockId, idx: i, isLayout: isLayout })}>
                          <FontAwesomeIcon icon={faPaperclip} />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  line: ({ design, block_id, blockStyle }) => {
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }

    const isDotted = design?.style === 'dotted';
    return (
      <div key={block_id} className='normal_module' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className='module_container_line'>
            <div
              style={{
                borderTop: isDotted ? 'none' : `${design?.thickness} ${design?.style} #B3B3B3`,
                backgroundImage: isDotted ? `radial-gradient(circle, rgb(179, 179, 179) 15%, transparent 0%)` : 'none',
                backgroundSize: isDotted ? '25px 100%' : 'auto',
                width: design?.length === 'long' ? '100%' : '15%',
                transform: design?.direction === 'diagonal' ? 'rotate(135deg)' : design?.direction === 'vertical' ? 'rotate(90deg)' : 'none',
                height: isDotted ? `${design.thickness}` : 'auto',
              }}
            />
          </div>
        </div>
      </div>
    );
  },
  list: ({ design, block_id, blockStyle, handleUpdateText, attatchImg, attatchLink, deleteImage, screenSize }) => {
    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    const screen = screenSize === 'desktop' ? 'container_desktop' : screenSize === 'tablet' ? 'container_tablet' : 'container_mobile';

    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }

    return (
      <div key={block_id} className='normal_module' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap font-style' style={restOfStyles}>
          <div className={`module_container_list ${screen}`}>
            <div className='module_list_item'>
              <div className={`module_${design?.shape}`} style={design?.images[0].src !== '' ? { backgroundColor: '#fff' } : { backgroundColor: '#F3F3F3' }}>
                {design?.images[0].src !== '' ? (
                  <div className={`moduleBox ${screenSize === 'desktop' ? 'desktop' : ''}`}>
                    <div className='icon_container'>
                      <span className='deleteIcon' onClick={() => deleteImage({ block_id: blockId, isLayout: isLayout })}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <label className='imgIcon'>
                          <FontAwesomeIcon icon={faImage} />
                          <input type='file' accept='image/*' onChange={(e) => attatchImg({ tag: e, block_id: blockId, isLayout: isLayout })} />
                        </label>
                        <span className='linkIcon' onClick={() => attatchLink({ block_id: blockId, isLayout: isLayout })}>
                          <FontAwesomeIcon icon={faPaperclip} />
                        </span>
                      </div>
                    </div>
                    <img className='imageTag' src={`${design?.images[0].src}`} alt='' style={design?.style} loading='lazy' />
                  </div>
                ) : (
                  <div className={`moduleBox ${screenSize === 'desktop' ? 'desktop imgHover' : ''}`} style={design?.style}>
                    <div className='downIcon'>
                      <FontAwesomeIcon icon={faDownload} />
                    </div>
                    <div className='attatchIcon' style={design?.style}>
                      <label>
                        <FontAwesomeIcon icon={faImage} />
                        <input type='file' accept='image/*' onChange={(e) => attatchImg({ tag: e, block_id: blockId, isLayout: isLayout })} />
                      </label>
                      <label onClick={() => attatchLink({ block_id: blockId, isLayout: isLayout })}>
                        <FontAwesomeIcon icon={faPaperclip} />
                      </label>
                    </div>
                  </div>
                )}
              </div>
              {design?.lines &&
                design?.lines.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    contentEditable={screenSize === 'desktop' ? true : false}
                    suppressContentEditableWarning
                    style={{ margin: line.margin, fontFamily: line.fontFamily || 'inherit', fontSize: line.fontSize, fontWeight: line.fontWeight, color: line.color }}
                    className={`${line.className} textWidth`}
                    onBlur={(e) => handleUpdateText(blockId, lineIndex, e.target.innerHTML, isLayout)}
                    dangerouslySetInnerHTML={{ __html: line.text }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  text: ({ design, block_id, blockStyle, handleUpdateText, screenSize, textRef, selectedTextPosition, handleTextSelection }) => {
    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }
    const screen = screenSize === 'desktop' ? 'container_desktop' : screenSize === 'tablet' ? 'container_tablet' : 'container_mobile';
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }

    return (
      <div key={block_id} className='normal_module' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className={`module_container ${screen}`} style={{ textAlign: `${design?.alignments}` }}>
            <div className='module_text_item'>
              {design?.lines.map((line, i) => (
                <React.Fragment key={i}>
                  <div
                    onMouseUp={handleTextSelection}
                    ref={textRef}
                    key={i}
                    className='module_text_line textWidth'
                    contentEditable={screenSize === 'desktop' ? true : false}
                    suppressContentEditableWarning
                    style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}
                    onBlur={(e) => {
                      handleUpdateText(blockId, i, e.target.innerHTML, isLayout);
                    }}
                    dangerouslySetInnerHTML={{ __html: line.text }}
                  ></div>
                  {line.button && <button className={line.buttonStyle}>{line.button}</button>}
                  <EditToolBar textRef={textRef} position={selectedTextPosition} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  table: null,
  layout: ({ design, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId, attatchImg, attatchLink, deleteImage, screenSize }) => {
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }

    const parsed_layout_design = layout_design ? JSON.parse(layout_design) : null;

    const screen = screenSize === 'desktop' ? 'container_desktop' : screenSize === 'tablet' ? 'container_tablet' : 'container_mobile';

    return (
      <div key={block_id} className='normal_module' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className={`module_container ${screen}`}>
            <div className='module_layout_item' style={design?.style}>
              {design?.elements.map((element, i) =>
                renderContent(
                  element,
                  block_id,
                  parsed_layout_design,
                  clickHandler,
                  setIsLayoutDesign,
                  setLayoutId,
                  EditorRenderBox,
                  screenSize,
                  handleUpdateText,
                  attatchImg,
                  attatchLink,
                  deleteImage,
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  // 필요한 만큼 추가
};

const renderContent = (element, block_id, parsed_layout_design, clickHandler, setIsLayoutDesign, setLayoutId, EditorRenderBox, screenSize, handleUpdateText, attatchImg, attatchLink, deleteImage) => {
  const layout = parsed_layout_design && parsed_layout_design.find((e) => e.layout_id === element.layout_id);
  const layout_design_type = layout && layout.design_type;
  const layout_boxes = layout && layout.boxes;

  let boxes, index, tableDesignId;
  if (layout_design_type !== 'table') {
    boxes = layout_boxes ? layout_boxes : undefined;
    index = `${block_id}/layout_${element.layout_id}`;
  } else {
    tableDesignId = layout && layout.design_id;
  }

  const keyForElement = element.layout_id || Math.random().toString();

  if (element.children) {
    return (
      <div key={keyForElement} className={element.children ? '' : layout ? '' : 'module_layoutBox'} style={element.style}>
        {element.children.map((child, j) =>
          renderContent(child, block_id, parsed_layout_design, clickHandler, setIsLayoutDesign, setLayoutId, EditorRenderBox, screenSize, handleUpdateText, attatchImg, attatchLink, deleteImage),
        )}
      </div>
    );
  } else {
    return (
      <div key={keyForElement} className={layout ? '' : 'module_layoutBox'} style={element.style}>
        {layout ? (
          layout_design_type === 'image' ? (
            EditorRenderBox.image({ design: boxes, block_id: index, attatchImg, attatchLink, deleteImage, screenSize })
          ) : layout_design_type === 'text' ? (
            EditorRenderBox.text({ design: boxes, block_id: index, handleUpdateText: handleUpdateText })
          ) : layout_design_type === 'list' ? (
            EditorRenderBox.list({ design: boxes, block_id: index, handleUpdateText: handleUpdateText, attatchImg, attatchLink, deleteImage, screenSize })
          ) : layout_design_type === 'table' ? (
            <ApplyTable design_id={tableDesignId} />
          ) : layout_design_type === 'line' ? (
            EditorRenderBox.line({ design: boxes, block_id: index })
          ) : null
        ) : (
          <ClickDiv layout_id={element.layout_id} setLayoutId={setLayoutId} clickHandler={clickHandler} setIsLayoutDesign={setIsLayoutDesign} />
        )}
      </div>
    );
  }
};

const ClickDiv = ({ layout_id, setLayoutId, clickHandler, setIsLayoutDesign }) => {
  const clickEvent = (layout_id, setLayoutId, clickHandler, setIsLayoutDesign) => {
    setLayoutId(layout_id);
    setIsLayoutDesign(true);
    clickHandler();
  };
  return (
    <div className='layout_wrap' onClick={(e) => clickEvent(layout_id, setLayoutId, clickHandler, setIsLayoutDesign)}>
      <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} />
      <p className='txt_design_select'>디자인을 선택하세요</p>
    </div>
  );
};

EditorRenderBox.defaultProps = {
  blockStyle: [],
};
