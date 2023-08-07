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

  console.log(data, 'data')

  const renderBox = (block) => {
    const { design_type, content, block_id, design_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId } = block;

    if (content) {
      const arg = {
        content: content,
        block_id: block_id,
        blockStyle: JSON.parse(block.block_style),
        handleUpdateText: handleUpdateText,
        layout_design: layout_design,
        clickHandler: clickHandler,
        setIsLayoutDesign: setIsLayoutDesign,
        setLayoutId: setLayoutId,
      }

      return DetailRenderBox[design_type](arg);
    } else {
      const typeItem = designType.find((item) => item.type === design_type);

      const filteredBoxes = typeItem && typeItem.boxes?.filter((box) => box.id === design_id);

      return filteredBoxes?.map((box) => DetailRenderBox[design_type]({
        box: box,
        block_id: block_id,
        blockStyle: JSON.parse(block.block_style),
        handleUpdateText: handleUpdateText,
        layout_design: layout_design,
        clickHandler: clickHandler,
        setIsLayoutDesign: setIsLayoutDesign,
        setLayoutId: setLayoutId,
      }));
    }
  };

  return (
    <div className='detail_wrap'>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} windowWidth={windowWidth} />
      {data
        ?.sort((a, b) => a.block_order - b.block_order) // block_order 순으로 정렬
        .filter((block) => block.design_type !== 'default') // design_type이 default가 아닌 것만 필터링
        .map((block) => {
          let layout_design = block.layout_design;
          if (typeof block.layout_design === 'string') { 
            try {
              layout_design = JSON.parse(block.layout_design); // 디자인 유형이 layout_design인경우 design style을 파싱
            } catch (error) {
              console.error('Error parsing layout_design:', error);
            }
          }

          const elements = block.content?.elements;

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
            const block_style = JSON.parse(block.block_style);
            let backgroundColor = '#ffffff';
            let restOfStyles = {
              maxWidth: '1240px',
              paddingTop: '0px',
              paddingBottom: '0px',
            };
            if (block_style) {
              restOfStyles = {
                maxWidth: block_style.style.maxWidth,
                paddingTop: block_style.style.paddingTop,
                paddingBottom: block_style.style.paddingBottom,
              }
              backgroundColor = block_style.style.backgroundColor || backgroundColor;
            }
            switch (type) {
              case 'table':
                return (
                  <div className='module_block'>
                    <div className='normal_wrap' style={{backgroundColor: backgroundColor}}>
                      <div className='module_wrap' style={restOfStyles}>
                        <div className='module_container'>
                          <ApplyTable design_id={block.design_id} />
                        </div>
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