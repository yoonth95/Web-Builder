import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorModal from 'components/Modal/EditorModal';
import Spinner from 'components/Spinner/Spinner';

// 나중에 redux를 사용하게 된다면 useEditor.js 수정 필요
import { GetBlocksAPI } from '../api/Editor';

import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';

const Editor = ({ isLoading, setIsLoading }) => {
  const { page_idx } = useParams();
  const [error, setError] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const fetchedBlocks = await GetBlocksAPI(page_idx);

        if (fetchedBlocks === null) {
          navigate('/notfound');
        } else {
          fetchedBlocks.length === 0 ? setBlocks([{ id: `${page_idx}_${new Date().getTime()}`, design: 'default' }]) : setBlocks(fetchedBlocks);
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page_idx, navigate, setIsLoading]);

  if (isLoading) return <Spinner />;

  if (error) {
    alert('에러', error);
    navigate(-1);
  }

  const handleAddBlock = (index, direction) => {
    const newBlock = { id: `${page_idx}_${new Date().getTime()}`, design: 'default' };

    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      if (direction === 'before') {
        newBlocks.splice(index, 0, newBlock);
      } else {
        newBlocks.splice(index + 1, 0, newBlock);
      }
      return newBlocks;
    });
  };

  const handleDeleteBlock = (index) => {
    if (window.confirm('선택한 블록을 삭제하시겠습니까?')) {
      if (blocks.length !== 1) {
        setBlocks((prevBlocks) => {
          const newBlocks = [...prevBlocks];
          newBlocks.splice(index, 1);
          return newBlocks;
        });
      }
    }
  };

  const handleChangeBlockOrder = (index, direction) => {
    console.log(index);
    if (blocks.length !== 1) {
      if (direction === 'up' && index !== 0) {
        setBlocks((prevBlocks) => {
          const newBlocks = [...prevBlocks];
          const curBlock = prevBlocks[index];
          const prevBlock = prevBlocks[index - 1];
          newBlocks.splice(index - 1, 1, curBlock);
          newBlocks.splice(index, 1, prevBlock);

          return newBlocks;
        });
      } else if (direction === 'down' && index !== blocks.length - 1) {
        setBlocks((prevBlocks) => {
          const newBlocks = [...prevBlocks];
          const curBlock = prevBlocks[index];
          const nextBlock = prevBlocks[index + 1];
          newBlocks.splice(index, 1, nextBlock);
          newBlocks.splice(index + 1, 1, curBlock);

          return newBlocks;
        });
      }
    }
  };

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} type='편집' />
      {blocks?.map((block, idx) => (
        <Block
          key={block.id}
          idx={idx}
          design={block.design}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAddBlock={handleAddBlock}
          handleDeleteBlock={handleDeleteBlock}
          handleChangeBlockOrder={handleChangeBlockOrder}
        />
      ))}
      <EditorModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Editor;
