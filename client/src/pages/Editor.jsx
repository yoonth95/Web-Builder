import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorModal from 'components/Modal/EditorModal';
import Spinner from 'components/Spinner/Spinner';

// 나중에 redux를 사용하게 된다면 useEditor.js 수정 필요
import { GetBlocksAPI } from '../api/Editor';

import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';

import 'styles/Editor/Editor.css';

const Editor = ({ isLoading, setIsLoading }) => {
  const { page_idx } = useParams();
  const [error, setError] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  console.log('blocks', blocks);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const fetchedBlocks = await GetBlocksAPI(page_idx);

        if (fetchedBlocks === null) {
          navigate('/notfound');
        } else {
          fetchedBlocks.length === 0 ? setBlocks([{ design: 'default' }]) : setBlocks(fetchedBlocks);
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

  const addBlock = (index) => {
    const newBlock = { id: Math.random(), design: 'default' }; // add unique id
    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      newBlocks.splice(index + 1, 0, newBlock);
      return newBlocks;
    });
  };

  console.log(blocks, 'blocks');

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} type='편집' />
      {blocks?.map((block) => (
        // <Block key={idx} idx={idx} design={block.design} isOpen={isOpen} setIsOpen={setIsOpen} addBlock={addBlock} />
        <Block key={`${page_idx}_${new Date().getTime()}`} idx={`${page_idx}_${new Date().getTime()}`} design={block.design} isOpen={isOpen} setIsOpen={setIsOpen} addBlock={addBlock} />
      ))}
      <EditorModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Editor;
