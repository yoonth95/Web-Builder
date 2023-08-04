import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from 'components/Main/Nav';
import { GetBlocksAPI } from 'api/Editor';
import designType from 'data/designType';
import { DetailRenderBox } from 'components/Detail/DetailRenderBox';
import ApplyTable from 'components/Editor/ApplyTable';

const Detail = ({ isLoading, setIsLoading, setError }) => {
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
  }, [windowWidth]);

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

    if (content) {
      return DetailRenderBox[design_type](content, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId);
    } else {
      const typeItem = designType.find((item) => item.type === design_type);

      const filteredBoxes = typeItem && typeItem.boxes?.filter((box) => box.id === design_id);

      return filteredBoxes?.map((box) => DetailRenderBox[design_type](box, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId));
    }
  };
  console.log(data, 'data')

  return (
    <div className='detail_wrap'>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} windowWidth={windowWidth} />
      {data
        ?.sort((a, b) => a.block_order - b.block_order)
        .filter((block) => block.design_type !== 'default') 
        .map((block) => {
          let layout_design = block.layout_design;

          if (typeof block.layout_design === 'string') {
            try {
              layout_design = JSON.parse(block.layout_design);
            } catch (error) {
              console.error('Error parsing layout_design:', error);
            }
          }

          const elements = block.content?.elements;
          console.log(elements, 'elements')

          let shouldRender = false;

          const elementsLength = elements?.reduce((count, element) => {
            if (element.layout_id) {
              return count + 1;
            }
            if (element.children) {
              return count + element.children.length;
            }
            return count;
          }, 0);

          if (layout_design && elements && layout_design.length === elementsLength) {
            shouldRender = true;

            const elementsLayoutIds = elements.flatMap(element => {
              if (element.layout_id) {
                return [element.layout_id];
              }
              if (element.children) {
                return element.children.map(child => child.layout_id);
              }
              return [];
            });

            for (let i = 0; i < layout_design.length; i++) {
              if (!elementsLayoutIds.includes(layout_design[i].layout_id)) {
                shouldRender = false;
                break;
              }
            }
          } else if (layout_design?.length === elementsLength) {
            shouldRender = false;
          }

          const renderBlockByType = (type, block, shouldRender) => {
            switch (type) {
              case 'table':
                return (
                  <div className='module_block'>
                    <div className='module_wrap'>
                      <div className='module_container'>
                        <ApplyTable design_id={block.design_id} />
                      </div>
                    </div>
                  </div>
                );
              case 'layout':
                return shouldRender ? <div className='module_block'>{renderBox(block)}</div> : null;
              default:
                return <div className='module_block'>{renderBox(block)}</div>;
            }
          };

          return (
            <div key={block.block_id} className='block_container' style={{ height: 'auto', outline: 'none' }}>
              {renderBlockByType(block.design_type, block, shouldRender)}
            </div>
          );
        })
      }
    </div>
  );
};

export default Detail;