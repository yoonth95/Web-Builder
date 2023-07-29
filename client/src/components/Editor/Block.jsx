import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setDesignType, setDesignId, setBlockOrder } from 'redux/selectBoxSlice';

import designType from 'data/designType';
import { EditorRenderBox } from 'components/Editor/EditorRenderBox';
import EditorModal from 'components/Modal/EditorModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRotateRight, faArrowUp, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import design_select from 'assets/images/design_select.svg';
import 'styles/Editor/Block.css';


// const Block = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [hoverId, setHoverId] = useState(0);

//   return (
//     <div className='block_wrap'>
//       <EditorModal isOpen={isOpen} setIsOpen={setIsOpen} />

//       <div className='block_container' onMouseOver={() => setHoverId(1)} onMouseLeave={() => setHoverId(0)}>
//         <div className='block_correction_btn' style={{ display: hoverId === 1 ? 'flex' : 'none' }}>
//           {correctionBtn.map(({ id, icon }) => (
//             <button className='block_function_btn' key={id}>
//               <FontAwesomeIcon icon={icon} />
//             </button>
//           ))}
//         </div>
//         <button
//           className='block_add btn_top'
//           style={{ display: hoverId === 1 ? 'block' : 'none' }}
//           onClick={() => {
//             setIsOpen(!isOpen);
//           }}
//         >
//           + 여기에 블록 추가
//         </button>
//         <button
//           className='block_add btn_bottom'
//           style={{ display: hoverId === 1 ? 'block' : 'none' }}
//           onClick={() => {
//             setIsOpen(!isOpen);
//           }}
//         >
//           + 여기에 블록 추가
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Block;




function Block({ block_id, design_type, design_id, block_order, addBlock, deleteBlock }) {
  const [showAddBlockBtn, setShowAddBlockBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const isDefault = design_type === 'default';
  const renderBox = (box, index) => EditorRenderBox[design_type](box, index);

  const correctionBtn = [
    { id: 1, icon: faEdit, clickFunc: () => console.log('edit') },
    { id: 2, icon: faArrowRotateRight, clickFunc: () => console.log('rotate') },
    { id: 3, icon: faArrowUp, clickFunc: () => console.log('up') },
    { id: 4, icon: faArrowDown, clickFunc: () => console.log('down') },
    { id: 5, icon: faTrash, clickFunc: (id) => deleteBlock(id) },
  ];

  return (
    <>
      <div className='block_container'
        onMouseOver={() => setShowAddBlockBtn(true)} 
        onMouseLeave={() => setShowAddBlockBtn(false)}
        style={{cursor: isDefault ? "pointer" : '', height: isDefault ? '160px' : 'auto'}}
      >
        {isDefault ? 
          <div className='wrap_design_select' onClick={() => setIsOpen(!isOpen)}>
            <img className='img_design_select' src={design_select} alt='마법지팡이 이미지' />
            <p>{block_id}</p>
            <p className='txt_design_select'>디자인을 선택하세요</p>
          </div>
          :
          <>
            <div className='block_correction_btn' style={{ display: showAddBlockBtn === true ? 'flex' : 'none' }}>
              {correctionBtn.map(({ id, icon, clickFunc }) => (
                <button className='block_function_btn' key={id}>
                  <span onClick={() => clickFunc(block_id)}><FontAwesomeIcon icon={icon} /></span>
                </button>
              ))}
            </div>
            {(designType.find((item) => item.type === design_type)).boxes.filter((item) => item.id === design_id).map((box, index) => renderBox(box, index))}
          </>
        }
        <div className='wrap_btn'>
          <button className={`btn_add_block ${showAddBlockBtn ? 'show_btn' : ''}`} onClick={() => addBlock(block_order)}>
            + 여기에 블록 추가
          </button>
        </div>
      </div>
      {isOpen && <EditorModal block_id={block_id} design_type={design_type} design_id={design_id} setIsOpen={setIsOpen} />}
    </>
  );
}

export default Block;