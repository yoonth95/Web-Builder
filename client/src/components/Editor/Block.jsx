// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUp, faArrowDown, faEdit, faTrash, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
// import EditorModal from 'components/Modal/EditorModal';
import 'styles/Main/Block.css';

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

// const correctionBtn = [
//   { id: 1, icon: faEdit },
//   { id: 2, icon: faArrowRotateRight },
//   { id: 3, icon: faArrowUp },
//   { id: 4, icon: faArrowDown },
//   { id: 5, icon: faTrash },
// ];

function Block({ idx, design, isOpen, setIsOpen, addBlock }) {
  return (
    <div className='block_container'>
      <p>Block ID: {idx}</p>
      <p>Block Design: {design}</p>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        원하는 디자인을 선택해주세요!
      </button>
      <div className='wrap_btn'>
        <button className='btn_add_block' onClick={addBlock}>
          + 여기에 블록 추가
        </button>
      </div>
    </div>
  );
}

export default Block;
