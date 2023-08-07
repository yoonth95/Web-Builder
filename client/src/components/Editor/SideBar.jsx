import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import 'styles/Editor/SideBar.css';
import { useSelector } from 'react-redux';

const updateBlockStyle = (blockId, styleUpdater, blockStyle, setBlockStyle) => {
  if (blockStyle.some((block) => block.block_id === blockId)) {
    setBlockStyle((prev) =>
      prev.map((block) =>
        block.block_id === blockId ? { ...block, style: styleUpdater(block.style) } : block
      )
    );
  }
};

const SideBar = ({ checkBtn, setCheckBtn, sideBarOpen, setSideBarOpen, blockStyle, setBlockStyle }) => {
  const [iconColor, setIconColor] = useState('#8f8f8f');
  const blockList = useSelector((state) => state.editor.blockList);

  const handleChange = (field, value) => {
    const blockId = sideBarOpen.block_id;
    const styleUpdater = (style) => ({ ...style, [field]: value });

    updateBlockStyle(blockId, styleUpdater, blockStyle, setBlockStyle);
  };

  // 블록 너비 설정
  const handleWidthChange = () => {
    handleChange("maxWidth", checkBtn ? '100%' : '1240px');
  };

  // 블록 padding top 설정
  const handleTopPaddingChange = (e) => {
    handleChange("paddingTop", `${e.target.value}px`);
  };

  // 블록 padding bottom 설정
  const handleBottomPaddingChange = (e) => {
    handleChange("paddingBottom", `${e.target.value}px`);
  };

  // 블록 배경색 설정
  const handleBackgroundColorChange = (e) => {
    handleChange("backgroundColor", e.target.value);
  };

  // useEffect(() => {
  //   handleWidthChange();
  // }, [checkBtn]);

  // useEffect(() => {
  //   const block = blockList.find((block) => block.block_id === sideBarOpen.block_id);
  //   if (block) {
  //     console.log(JSON.parse(block.block_style));
  //     const style = JSON.parse(block.block_style);
  //     if (style.style.maxWidth === '100%') {
  //       setCheckBtn(true);
  //     } else if (style.style.maxWidth === '1240px') {
  //       setCheckBtn(false);
  //     }
  //   }
  // }, [blockList, sideBarOpen]);

  return (
    <div className='subMenu sub_menu' style={{ display: 'block' }}>
      <div className='title_wrap'>
        <h3>블록 설정</h3>
        <FontAwesomeIcon
          icon={faTimes}
          style={{ color: iconColor, cursor: 'pointer' }}
          onClick={() => setSideBarOpen(!sideBarOpen)}
          size='2x'
          onMouseEnter={() => setIconColor('#f3f3f3')}
          onMouseLeave={() => setIconColor('#8f8f8f')}
        />
      </div>
      {/* 블록 너비 설정 */}
      <div className='widthSet_wrap' onChange={(e) => setCheckBtn((prevCheckBtn) => !prevCheckBtn)}>
        <input type='checkbox' defaultChecked={checkBtn} />
        <p>화면 너비에 맞추기</p>
      </div>
      {/* 블록 패딩 설정 */}
      <div style={{ marginTop: '10px' }}>
        <p className='title1'>패딩 설정</p>
      </div>
      <ul className='sub_menu_list v2'>
        <li>
          <p className='title1' style={{ width: '100%' }}>
            상
            <span id='paddingTopVal' className='num'>
              {blockStyle.find((block) => block.block_id === sideBarOpen.block_id)?.style.paddingTop || 0}
            </span>
          </p>
          <div style={{ padding: '5px 0 0 10px', marginBottom: '10px' }}>
            <input
              type='range'
              className='radioCheckSelect range_style1'
              name='padding_top'
              min='0' max='400' step='10'
              value={Number(blockStyle.find((block) => block.block_id === sideBarOpen.block_id)?.style.paddingTop.replace('px', '')) || 0}
              onChange={handleTopPaddingChange}
            />
            <ol className='range_datalist'>
              <li>0</li>
              <li>200</li>
              <li>400</li>
            </ol>
          </div>
        </li>
        <li>
          <p className='title1' style={{ width: '100%' }}>
            하
            <span id='paddingBottomVal' className='num'>
              {blockStyle.find((block) => block.block_id === sideBarOpen.block_id)?.style.paddingBottom || 0}
            </span>
          </p>
          <div style={{ padding: '5px 0 0 10px' }}>
            <input
              type='range'
              className='radioCheckSelect range_style1'
              name='padding_bottom'
              min='0' max='400' step='10'
              value={Number(blockStyle.find((block) => block.block_id === sideBarOpen.block_id)?.style.paddingBottom.replace('px', '')) || 0}
              onChange={handleBottomPaddingChange}
            />
            <ol className='range_datalist'>
              <li>0</li>
              <li>200</li>
              <li>400</li>
            </ol>
          </div>
        </li>
      </ul>
      {/* 블록 배경색 설정 */}
      <div style={{ marginTop: '10px' }}>
        <p className='title1'>배경색 설정</p>
      </div>
      <div style={{ padding: '20px' }}>
        <input type="color" value={blockStyle.find(block => block.block_id === sideBarOpen.block_id)?.style.backgroundColor || '#ffffff'} onChange={handleBackgroundColorChange}/>
      </div>
    </div>
  );
};

export default SideBar;
