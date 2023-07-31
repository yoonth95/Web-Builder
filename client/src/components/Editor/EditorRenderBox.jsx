import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

export const EditorRenderBox = {
  image: (box, index) => {
    return (
      <div key={index} className='module_wrap'>
        <div className='module_container' style={box.layout}>
          {[...Array(box.numImages)].map((_, i) => (
            <div key={i} style={box.style}>
              <div className='module_imageBox imgHover'>
                <img src={`${box.src}`} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  line: (box, index) => {
    const isDotted = box.style === 'dotted';
    return (
      <div key={index} className='module_wrap'>
        <div className='module_container_line'>
          <div
            style={{
              borderTop: isDotted ? 'none' : `${box.thickness} ${box.style} #B3B3B3`,
              backgroundImage: isDotted ? `radial-gradient(circle, rgb(179, 179, 179) 15%, transparent 0%)` : 'none',
              backgroundSize: isDotted ? '25px 100%' : 'auto',
              width: box.length === 'long' ? '100%' : '15%',
              transform: box.direction === 'diagonal' ? 'rotate(135deg)' : box.direction === 'vertical' ? 'rotate(90deg)' : 'none',
              height: isDotted ? `${box.thickness}` : 'auto',
            }}
          />
        </div>
      </div>
    );
  },
  list: (box, index) => {
    return (
      <div key={index} className='module_wrap font-style'>
        <div className='module_container_list'>
          <div className='module_list_item'>
            <div className={`module_${box.shape} imgHover`}>
              <img src={`${box.src}`} alt=""/>
            </div>
            {box.hasTitle && <div contentEditable={true} suppressContentEditableWarning className='title'>제목</div>}
            {box.hasTitleColor && <div contentEditable={true} suppressContentEditableWarning className='titleColor'>색깔 있는 제목</div>}
            {box.hasSubtitle && <div contentEditable={true} suppressContentEditableWarning className='subtitle'>주 1회 / 과목당 10분</div>}
            {box.hasText && <div contentEditable={true} suppressContentEditableWarning className='text'>초단기한글</div>}
            {box.hasTinyText && <div contentEditable={true} suppressContentEditableWarning className='tinyText'>학습관리 및 상담</div>}
            {box.hasDetails && (
              <div contentEditable={true} suppressContentEditableWarning className='details'>
                친구들과 함께 모여 교과 과정에 필요한 핵심 과목을 <br />
                집중적으로 관리 받습니다. 전문 선생님의 학습 관리로 자기주도 <br />
                학습을 성장시킬 수 있습니다.
              </div>
            )}
            {box.hasContent && (
              <div contentEditable={true} suppressContentEditableWarning className='content'>
                북패드 디지털 콘텐츠를 활용하여 <br />
                학생들의 지면 학습을 더욱 심도 깊고 <br />
                쉽게 이해하여 기본 개념을 탄탄하게 합니다.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  text: (box, index) => {
    return (
      <div key={index} className='module_wrap'>
        <div className='module_container' style={{ textAlign: `${box.alignments}` }}>
          <div className='module_text_item'>
            {box.lines.map((line, i) => (
              <div 
                key={i}
                className='module_text_line'
                contentEditable={true} 
                suppressContentEditableWarning
                style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}
              >
                {line.text}
                {line.button && <button className={line.buttonStyle}>{line.button}</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  table: null,
  layout: (box, index, layout_design, clickHandler, setIsLayoutDesign, setLayoutId, designType) => {
    return (
      <div key={index} className='module_wrap'>
        <div className='module_container'>
          <div className='module_layout_item' style={box.style}>
            {box.elements.map((element, i) => {
              const layout = layout_design && layout_design.find(e => e.layout_id === element.layout_id);
              const layout_design_type = layout && layout.design_type;
              const layout_design_id = layout && layout.design_id;

              const layoutType = designType.find(e => e.type === layout_design_type);
              const box = layoutType ? layoutType.boxes.filter(e => e.id === layout_design_id)[0] : undefined;
              const index = Math.floor(Math.random() * 100);

              return (
                <div key={i} className={element.children ? '' : layout ? '' : 'module_layoutBox'} style={element.style} 
                  onClick={
                    layout ? null : () => {
                      clickHandler(); 
                      setIsLayoutDesign(true);
                      setLayoutId(element.layout_id)
                    }
                  }
                >
                  {element.children 
                    ? element.children.map((child, j) => {
                      const layout_child = layout_design && layout_design.find(e => e.layout_id === child.layout_id);
                      const layout_child_design_type = layout_child && layout_child.design_type;
                      const layout_child_design_id = layout_child && layout_child.design_id;

                      const child_layoutType = designType.find(e => e.type === layout_child_design_type);
                      const child_box = child_layoutType ? child_layoutType.boxes.filter(e => e.id === layout_child_design_id)[0] : undefined;
                      const child_index = Math.floor(Math.random() * 100);

                      return (
                        <div key={j} className={layout_child ? '' : 'module_layoutBox'} style={child.style} 
                          onClick={
                            layout_child ? null : (e) => {
                              e.stopPropagation();
                              clickHandler(); 
                              setIsLayoutDesign(true);
                              setLayoutId(child.layout_id)
                            }
                          }
                        >
                          {layout_child 
                            // ? <span>{layout_child_design_type}</span>
                            ? (layout_child_design_type === 'image'
                                ? EditorRenderBox.image(child_box, child_index)
                                : layout_child_design_type === 'text'
                                  ? EditorRenderBox.text(child_box, child_index)
                                  : layout_child_design_type === 'list'
                                    ? EditorRenderBox.list(child_box, child_index)
                                    : layout_child_design_type === 'table'
                                      ? EditorRenderBox.table(child_box, child_index)
                                      : layout_child_design_type === 'line'
                                        ? EditorRenderBox.line(child_box, child_index)
                                        : null
                              )
                            : <ClickDiv />
                          }
                        </div>
                      )
                    })
                    : (layout 
                        // ? <span>{layout_design_type}</span>
                        ? (layout_design_type === 'image'
                            ? EditorRenderBox.image(box, index)
                            : layout_design_type === 'text'
                              ? EditorRenderBox.text(box, index)
                              : layout_design_type === 'list'
                                ? EditorRenderBox.list(box, index)
                                : layout_design_type === 'table'
                                  ? EditorRenderBox.table(box, index)
                                  : layout_design_type === 'line'
                                    ? EditorRenderBox.line(box, index)
                                    : null
                          )
                        : <ClickDiv />
                      )
                  }
                </div>
              )
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
  )
}