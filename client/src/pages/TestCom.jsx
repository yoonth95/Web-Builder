import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from 'components/Main/Nav';
import { GetBlocksAPI } from '../api/Editor';
import designType from 'data/designType';
import { EditorRenderBox } from 'pages/Test';

const TestCom = ({ isLoading, setIsLoading, setError }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState(null);
  const { secondList } = useSelector((state) => state.menu);
  const { pathname } = useLocation();
  const link = pathname.slice(7);
  const filterData = secondList.filter((item) => item.link === link)[0]?.idx;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // 필터한 데이터 뿌려주기 (idx값으로)
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blocks = await GetBlocksAPI(filterData);
        setData(blocks);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchData();
  }, [filterData]);

  const renderBox = (block) => {
    const { design_type, content, block_id, design_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId } = block;
    console.log('design_type', design_type, 'block_content', content, 'block_id', block_id);

    if (content) {
      return EditorRenderBox[design_type](content, block_id);
    }
    const typeItem = designType.find((item) => item.type === design_type);
    console.log('typeItem.boxes', typeItem.boxes);
    const filteredBoxes = typeItem.boxes.filter((box) => box.id === design_id);
    // return typeItem.boxes.map((box) => EditorRenderBox[design_type](box, block_id));
    // return filteredBoxes.map((box) => EditorRenderBox[design_type](box, block_id));
    return filteredBoxes.map((box) => EditorRenderBox[design_type](box, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId));
  };

  console.log(data);

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} windowWidth={windowWidth} />
      {data &&
        data
          .sort((a, b) => a.block_order - b.block_order)
          .map((block) => (
            <div key={block.block_id}>
              <div className='module_block'>{renderBox(block)}</div>
            </div>
          ))}
    </>
  );
};

export default TestCom;
