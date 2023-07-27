import React from 'react';
import EditForm from './EditForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import 'styles/Management/SubMenu.css';

const SubMenu = ({ Droppable, Draggable, parentID, editMenuIds, editMenu, deleteMenu, subMenus, firstList, secondList }) => {
  return (
    <Droppable droppableId={`store-${parentID}`} type={`type-${parentID}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} style={{marginTop: '-10px'}}>
          {subMenus.map((subMenu, index) => (
            <Draggable key={subMenu.idx} draggableId={`item-${subMenu.idx}`} index={index}>
              {(provided) => (
                <div className='subMenus_wrap' {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                  <div className={`subMenus ${editMenuIds.includes(subMenu.idx) ? 'withEdit' : ''}`}>
                    <h1 className='sub_box'>{subMenu.title}</h1>
                    <div className='box'>
                      <span onClick={() => editMenu(subMenu.idx)}>
                        <FontAwesomeIcon icon={faGear} />
                      </span>
                      <span onClick={() => deleteMenu(subMenu.idx, subMenu.order_num, subMenu.parent_id)}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    </div>
                  </div>
                  {editMenuIds.includes(subMenu.idx) && <EditForm editMenu={editMenu} curMenuData={subMenu} firstList={firstList} secondList={secondList} />}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SubMenu;
