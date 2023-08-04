import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from 'components/Main/Nav';
import { GetBlocksAPI } from '../api/Editor';
import designType from 'data/designType';
import { EditorRenderBoxTest } from 'pages/Test';
import ApplyTable from 'components/Editor/ApplyTable';

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
      return EditorRenderBoxTest[design_type](content, block_id,blockStyle,handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId);
    }else{
      const typeItem = designType.find((item) => item.type === design_type);
      console.log("typeItem",typeItem)
      const filteredBoxes = typeItem && typeItem.boxes?.filter((box) => box.id === design_id)
      console.log(filteredBoxes)
      return filteredBoxes?.map((box) => EditorRenderBoxTest[design_type](box, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId));
    }
  };

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} windowWidth={windowWidth} />
     

      {data?.sort((a, b) => a.block_order - b.block_order)
          .map((block) => {
            const isDefault = block.design_type === 'default';
            return (
              <div
              key={block.block_id}
              className='block_container'
              style={{ height: (isDefault ? '160px' : 'auto') , outline:"none" }}
            >
              <div>
                <div className='module_block'>{renderBox(block)}</div>
                {block.design_type === 'table'&&
                  <div className='module_block'>
                    <div className='module_wrap'>
                      <div className='module_container'>
                        <ApplyTable design_id={block.design_id} />
                      </div>
                    </div>
                  </div>
                }
              </div>
              </div>
            );
          })}
     
    </>
  );
};

export default TestCom;


