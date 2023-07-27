import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorModal from 'components/Modal/EditorModal';

// 나중에 redux를 사용하게 된다면 useEditor.js 수정 필요
import { GetBlocksAPI } from '../api/Editor';

import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';

import 'styles/Editor/Editor.css';

const Editor = ({ isLoading, setIsLoading }) => {
  const { idx } = useParams();
  const [error, setError] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const blocks = await GetBlocksAPI(idx);

  //       if (blocks === null) {
  //         navigate('/notfound');
  //       } else {
  //         setBlocks(blocks);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setError(err.message);
  //     }
  //   };

  //   fetchData();
  // }, [idx, navigate]);

  const addBlock = () => {
    const newBlock = { design: 'default' };
    setBlocks([...blocks, newBlock]);
  };
  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} />
      {/* <Block /> */}

      <div className='wrap_btn'>
        <button className='btn_add_block' onClick={addBlock}>
          + 여기에 블록 추가
        </button>
      </div>

      {/* 블록 추가 버튼 클릭하면 생성되는 블록 */}
      {blocks.map((block, idx) => (
        <Block key={idx} idx={idx} design={block.design} isOpen={isOpen} setIsOpen={setIsOpen} addBlock={addBlock} />
      ))}
      <EditorModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Editor;
