import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'components/Spinner/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { addBlockAction, removeBlockAction, setBlockOrder } from 'redux/selectBoxSlice';

import { GetBlocksAPI } from '../api/Editor';

import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';

const Editor = ({ isLoading, setIsLoading }) => {
  const { page_idx } = useParams();
  const navigate = useNavigate();
  const blocks = useSelector(state => state.selectBox);
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

  // 블록 추가
  const addBlock = (order, dir) => {
    const newOrder = dir === 'before' ? order : order+1;
    const newBlock = { block_id: `${page_idx}_${new Date().getTime()}`, design_type: 'default', design_id: 0, block_order: newOrder };
    dispatch(addBlockAction(newBlock));
  };

  // 블록 삭제
  const deleteBlock = (id) => {
    if (blocks.length === 1) {
      alert('최소 한 개의 블록은 있어야 합니다.');
      return;
    }
    if (window.confirm('정말로 삭제하시겠습니까?')) dispatch(removeBlockAction({ id }));
  };

  // 블록 순서 변경
  const handleChangeBlockOrder = (order, id, dir) => {
    dispatch(setBlockOrder({ order, id, dir }));
  }

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} type='편집' />
      {blocks.map(block => (
        <div key={block.block_id}>
          <Block 
            block_id={block.block_id}
            design_type={block.design_type}
            design_id={block.design_id}
            block_order={block.block_order}
            addBlock={addBlock}
            deleteBlock={deleteBlock}
            handleChangeBlockOrder={handleChangeBlockOrder}
          />
        </div>
      ))}
    </>
  );
};

export default Editor;