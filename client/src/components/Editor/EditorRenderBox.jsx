import React from 'react';

import ApplyTable from 'components/Editor/ApplyTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faImage, faPaperclip, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export const EditorRenderBox = {
  image: ({ design, block_id, blockStyle, attatchImg, attatchLink, deleteImage }) => {
    const filter_style = blockStyle?.find((block) => block.block_id === block_id);

    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    return (
      <div key={block_id} className='module_wrap' style={filter_style?.style}>
        <div className='module_container' style={design?.layout}>
          {[...Array(design?.images.length)].map((_, i) => (
            <div key={i} className={design?.images[i].src !== '' ? 'imageDiv backgroundNone' : 'imageDiv'} style={design?.style}>
              {design?.images[i].src !== '' ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <div className='icon_container'>
                    <span className='deleteIcon' onClick={() => deleteImage({ block_id: blockId, idx: i, isLayout: isLayout })}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                    <span className='linkIcon' onClick={() => attatchLink({ block_id: blockId, idx: i, isLayout: isLayout })}>
                      <FontAwesomeIcon icon={faPaperclip} />
                    </span>
                    <label className='imgIcon'>
                      <FontAwesomeIcon icon={faImage} />
                      <input type='file' accept='image/*' onChange={(e) => attatchImg({ tag: e, block_id: blockId, idx: i, isLayout: isLayout })} />
                    </label>
                  </div>
                  <img className='imageTag' src={`${design?.images[i].src}`} alt='' style={design?.style} />
                </div>
              ) : (
                <div className='module_imageBox imgHover' style={design?.style}>
                  <div className='downIcon'>
                    <FontAwesomeIcon icon={faDownload} />
                  </div>
                  <div className='attatchIcon' style={design?.style}>
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
          ))}
        </div>
      </div>
    );
  },
  line: ({ design, block_id, blockStyle }) => {
    const filter_style = blockStyle?.find((block) => block.block_id === block_id);

    const isDotted = design?.style === 'dotted';
    return (
      <div key={block_id} className='module_wrap' style={filter_style?.style}>
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
    );
  },
  list: ({ design, block_id, blockStyle, handleUpdateText, attatchImg, attatchLink, deleteImage }) => {
    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    const filter_style = blockStyle?.find((block) => block.block_id === block_id);
    return (
      <div key={block_id} className='module_wrap font-style' style={filter_style?.style}>
        <div className='module_container_list'>
          <div className='module_list_item'>
            <div className={`module_${design?.shape}`} style={design?.images[0].src !== '' ? { backgroundColor: '#fff' } : { backgroundColor: '#F3F3F3' }}>
              {design?.images[0].src !== '' ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <span className='deleteIcon' onClick={() => deleteImage({ block_id: blockId, isLayout: isLayout })}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                  <img className='imageTag' src={`${design?.images[0].src}`} alt='' style={design?.style} />
                </div>
              ) : (
                <div className='module_imageBox imgHover' style={design?.style}>
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
                  contentEditable={true}
                  suppressContentEditableWarning
                  style={{ margin: line.margin, fontFamily: line.fontFamily || 'inherit', fontSize: line.fontSize, fontWeight: line.fontWeight, color: line.color }}
                  className={line.className}
                  onBlur={(e) => handleUpdateText(blockId, lineIndex, e.target.innerHTML, isLayout)}
                  dangerouslySetInnerHTML={{ __html: line.text }}
                />
              ))}
          </div>
        </div>
      </div>
    );
  },
  text: ({ design, block_id, blockStyle, handleUpdateText }) => {
    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    const filter_style = blockStyle?.find((block) => block.block_id === blockId);
    return (
      <div key={blockId} className='module_wrap' style={filter_style?.style}>
        <div className='module_container' style={{ textAlign: `${design?.alignments}` }}>
          <div className='module_text_item'>
            {design?.lines.map((line, i) => (
              <React.Fragment key={i}>
                <div
                  key={i}
                  className='module_text_line'
                  contentEditable={true}
                  suppressContentEditableWarning
                  style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}
                  onBlur={(e) => handleUpdateText(blockId, i, e.target.innerHTML, isLayout)}
                  dangerouslySetInnerHTML={{ __html: line.text }}
                ></div>
                {line.button && <button className={line.buttonStyle}>{line.button}</button>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  },
  table: null,
  layout: ({ design, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId, attatchImg, attatchLink, deleteImage }) => {
    const filter_style = blockStyle?.find((block) => block.block_id === block_id);
    const parsed_layout_design = layout_design ? JSON.parse(layout_design) : null;

    return (
      <div key={block_id} className='module_wrap' style={filter_style?.style}>
        <div className='module_container'>
          <div className='module_layout_item' style={design?.style}>
            {design?.elements.map((element, i) => {
              const layout = parsed_layout_design && parsed_layout_design?.find((e) => e.layout_id === element.layout_id);
              const layout_design_type = layout && layout?.design_type;
              const layout_design_id = layout && layout?.design_id;
              const layout_boxes = layout && layout?.boxes;

              let boxes, index, tableDesignId;
              if (layout_design_type !== 'table') {
                boxes = layout_boxes ? layout_boxes : undefined;
                index = `${block_id}/layout_${element.layout_id}`;
              } else {
                tableDesignId = layout_design_id;
              }

              return (
                <div
                  key={i}
                  className={element.children ? '' : layout ? '' : 'module_layoutBox'}
                  style={element.style}
                  onClick={
                    layout
                      ? null
                      : (e) => {
                          e.stopPropagation();
                          if (e.target !== e.currentTarget) {
                            clickHandler();
                            setIsLayoutDesign(true);
                            setLayoutId(element.layout_id);
                          }
                        }
                  }
                >
                  {element.children ? (
                    element.children.map((child, j) => {
                      const layout_child = parsed_layout_design && parsed_layout_design.find((e) => e.layout_id === child.layout_id);
                      const layout_child_design_type = layout_child && layout_child.design_type;
                      const layout_child_design_id = layout_child && layout_child.design_id;
                      const layout_child_boxes = layout_child && layout_child.boxes;

                      let child_boxes, child_index;
                      if (layout_child_design_type !== 'table') {
                        child_boxes = layout_child_boxes ? layout_child_boxes : undefined;
                        child_index = `${block_id}/layout_${element.layout_id}`;
                      } else {
                        tableDesignId = layout_child_design_id;
                      }

                      return (
                        <div
                          key={j}
                          className={layout_child ? '' : 'module_layoutBox'}
                          style={child.style}
                          onClick={
                            layout_child
                              ? null
                              : (e) => {
                                  e.stopPropagation();
                                  if (e.target !== e.currentTarget) {
                                    clickHandler();
                                    setIsLayoutDesign(true);
                                    setLayoutId(child.layout_id);
                                  }
                                }
                          }
                        >
                          {layout_child ? (
                            layout_child_design_type === 'image' ? (
                              EditorRenderBox.image({ design: child_boxes, block_id: child_index, attatchImg, attatchLink, deleteImage })
                            ) : layout_child_design_type === 'text' ? (
                              EditorRenderBox.text({ design: child_boxes, block_id: child_index, handleUpdateText: handleUpdateText })
                            ) : layout_child_design_type === 'list' ? (
                              EditorRenderBox.list({ design: child_boxes, block_id: child_index, handleUpdateText: handleUpdateText, attatchImg, attatchLink, deleteImage })
                            ) : layout_child_design_type === 'table' ? (
                              <ApplyTable design_id={tableDesignId} />
                            ) : layout_child_design_type === 'line' ? (
                              EditorRenderBox.line({ design: child_boxes, block_id: child_index })
                            ) : null
                          ) : (
                            <ClickDiv />
                          )}
                        </div>
                      );
                    })
                  ) : layout ? (
                    layout_design_type === 'image' ? (
                      EditorRenderBox.image({ design: boxes, block_id: index, attatchImg, attatchLink, deleteImage })
                    ) : layout_design_type === 'text' ? (
                      EditorRenderBox.text({ design: boxes, block_id: index, handleUpdateText: handleUpdateText })
                    ) : layout_design_type === 'list' ? (
                      EditorRenderBox.list({ design: boxes, block_id: index, handleUpdateText: handleUpdateText, attatchImg, attatchLink, deleteImage })
                    ) : layout_design_type === 'table' ? (
                      <ApplyTable design_id={tableDesignId} />
                    ) : layout_design_type === 'line' ? (
                      EditorRenderBox.line({ design: boxes, block_id: index })
                    ) : null
                  ) : (
                    <ClickDiv />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  // 필요한 만큼 추가
};

const ClickDiv = () => {
  return (
    <div className='layout_wrap'>
      <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} />
      <p className='txt_design_select'>디자인을 선택하세요</p>
    </div>
  );
};

// const EditToolbar = () => {
//   <div className='block_correction_btn' style={{ display: showBlockBtn === true ? 'flex' : 'none' }}>
//     <button className='block_function_btn'>
//       <span onClick={() => console.log('edit')}><FontAwesomeIcon icon={faEdit} /></span>
//     </button>
//     <button className='block_function_btn'>
//       <span onClick={() => console.log('rotate')}><FontAwesomeIcon icon={faArrowRotateRight} /></span>
//     </button>
//   </div>
// }

EditorRenderBox.defaultProps = {
  blockStyle: [],
};
