import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

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
              <img src={`${box.src}`} alt="" onError={<FontAwesomeIcon icon={faImage}/>}/>
            </div>
            {box.hasTitle && <div contentEditable={true} className='title'>제목</div>}
            {box.hasTitleColor && <div contentEditable={true} className='titleColor'>색깔 있는 제목</div>}
            {box.hasSubtitle && <div contentEditable={true} className='subtitle'>주 1회 / 과목당 10분</div>}
            {box.hasText && <div contentEditable={true} className='text'>초단기한글</div>}
            {box.hasTinyText && <div contentEditable={true} className='tinyText'>학습관리 및 상담</div>}
            {box.hasDetails && (
              <div contentEditable={true} className='details'>
                친구들과 함께 모여 교과 과정에 필요한 핵심 과목을 <br />
                집중적으로 관리 받습니다. 전문 선생님의 학습 관리로 자기주도 <br />
                학습을 성장시킬 수 있습니다.
              </div>
            )}
            {box.hasContent && (
              <div contentEditable={true} className='content'>
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
  layout: (box, index) => {
    return (
      <div key={index} className='module_wrap'>
        <div className='module_container'>
          <div className='module_layout_item'>
            {box.elements.map((element, i) => (
              <div key={i} className={element.children ? '' : 'module_layoutBox'} style={element.style}>
                {element.children ? element.children.map((child, j) => <div key={j} className='module_layoutBox' style={child.style}></div>) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  // 필요한 만큼 추가
};
