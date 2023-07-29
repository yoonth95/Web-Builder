import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'components/Spinner/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { addBlockAction, removeBlockAction } from 'redux/selectBoxSlice';

import { GetBlocksAPI } from '../api/Editor';

import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';

import 'styles/Editor/Editor.css';

const Editor = ({ isLoading, setIsLoading }) => {
  const { page_idx } = useParams();
  const navigate = useNavigate();
  const blocks = useSelector(state => state.selectBox); // Redux에서 blocks 상태를 가져옵니다.
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedBlocks = await GetBlocksAPI(page_idx);

        if (fetchedBlocks === null) {
          navigate('/notfound');
        } else {
          fetchedBlocks.length === 0 
            ? dispatch(addBlockAction({ block_id: `${page_idx}_${new Date().getTime()}`, design_type: 'default', design_id: 0, block_order: 1 }))
            : fetchedBlocks.forEach(block => dispatch(addBlockAction(block)));
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [page_idx, navigate, setIsLoading, dispatch]);

  if (isLoading) return <Spinner />;

  if (error) {
    alert('에러', error);
    navigate(-1);
  }

  // const addBlock = (index) => {
  //   const newBlock = { block_id: `${page_idx}_${new Date().getTime()}`, design_type: 'default', design_id: 0, design_order: 1 };
  //   setBlocks((prevBlocks) => {
  //     const newBlocks = [...prevBlocks];
  //     newBlocks.splice(index + 1, 0, newBlock);
  //     return newBlocks;
  //   });
  // };

  const addBlock = (order) => {
    const newBlock = { block_id: `${page_idx}_${new Date().getTime()}`, design_type: 'default', design_id: 0, block_order: order+1 };
    dispatch(addBlockAction(newBlock));
  };

  const deleteBlock = (block_id) => {
    if (blocks.length === 1) {
      alert('최소 한 개의 블록은 있어야 합니다.');
      return;
    }
    if (window.confirm('정말로 삭제하시겠습니까?')) dispatch(removeBlockAction(block_id));
  };

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} type='편집' />
      {blocks?.map(block => (
        <div key={block.block_id}>
          <Block 
            block_id={block.block_id}
            design_type={block.design_type}
            design_id={block.design_id}
            block_order={block.block_order}
            addBlock={addBlock}
            deleteBlock={deleteBlock}
          />
        </div>
      ))}
    </>
  );
};

export default Editor;