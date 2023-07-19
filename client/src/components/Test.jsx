// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { setBtn } from 'redux/buttonSlice';

// import 'styles/menu.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faGear, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

// const Test = ({ setIsOpen }) => {
//   const { user } = useSelector((state) => state.user);
//   const [firstList, setFirstList] = useState([]);
//   const [secondList, setSecondList] = useState([]);
//   const [clickId, setClickId] = useState([]);
//   const [editMenuIds, setEditMenuIds] = useState([]);
//   const [primaryValue,setPrimaryValue] = useState('');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getMenu = async () => {
//       try {
//         const res = await fetch('/api/getMenu', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!res.ok) {
//           console.log('get menu fail');
//           return;
//         }

//         const data = await res.json();
//         console.log(data)
//         data.forEach((item) => {
//           !item.parent_id
//             ? setFirstList((prev) => [...prev, item])
//             : setSecondList((prev) => [...prev, item]);
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getMenu();
//   }, []);

//   const toggleImage = (id) => {
//     if (clickId.includes(id)) {
//       setClickId((prevClickId) =>
//         prevClickId.filter((clickedId) => clickedId !== id),
//       );
//     } else {
//       setClickId((prevClickId) => [...prevClickId, id]);
//     }
//   };
//   // /api/updateMenu // method : put

//   const handlePrimaryValue=(e)=>{
//     setPrimaryValue(e.target.value);
//   }

//   const updateMenu = ()=>{
//     // 제목,링크 값 저장 할 수 있게 하기
//     // 온체인지 함수로 실시간으로 값 저장되게하기
//     console.log(primaryValue);
//   }

//   const deleteMenu = (id) => {
//     const deleteMenu = async () => {
//       try {
//         const res = await fetch(`/api/deleteMenu/${id}`, {
//           method: 'DELETE',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//         });

//         const data = await res.json();


//         alert(data);
//         if (!res.ok) console.log(res.error);
//         else window.location.reload();
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (window.confirm('해당 메뉴를 삭제 하시겠습니까?')) deleteMenu();
//   };

//   const editMenu = (id) => {
//     setEditMenuIds((prevIds) => {
//       if (prevIds.includes(id)) {
//         return prevIds.filter((editId) => editId !== id);
//       } else {
//         return [...prevIds, id];
//       }
//     });
//   };

//   const addMenu = (isParent) => {
//     console.log(isParent);
//   };

//   const handleDragEnd = (result) => {
//     console.log(result)
//   }

//   return (
//     <div className='wrap'>
//       <div className='memu_title_wrap'>
//         <div className='menu_title'>
//           <p>메뉴 설정</p>
//           <p>메뉴 항목과 구조를 설정해주세요.</p>
//         </div>
//         <button onClick={() => { addMenu(true); setIsOpen(true); dispatch(setBtn('메뉴'));}}>
//           메뉴 항목 추가
//         </button>
//       </div>
//        <div className='menu_list_wrap'>
//          {firstList.map((menu) => (
//           <div key={menu.idx} className='menu_list'>
//             <div className='primaryMenus_wrap'>
//               <div className={`primaryMenus ${editMenuIds.includes(menu.idx) ? 'withEdit' : ''}`}>
//                 <div className='img_wrap' onClick={() => toggleImage(menu.idx)}>
//                   <span style={{ transform: clickId.includes(menu.idx) ? 'rotate(90deg)' : 'rotate(0deg)', }}>
//                     <FontAwesomeIcon icon={faAngleRight} />
//                   </span>
//                 </div>
//                 <h1>{menu.title}</h1>
//                 <div className='box'>
//                   <span onClick={() => editMenu(menu.idx)}>
//                     <FontAwesomeIcon icon={faGear} />
//                   </span>
//                   <span onClick={() => deleteMenu(menu.idx)}>
//                     <FontAwesomeIcon icon={faXmark} />
//                   </span>
//                 </div>
//               </div>
//               {editMenuIds.includes(menu.idx) && (
//               <div className='edit_wrap'>
//                 <label className='primaryMenu_label primaryMenu_title_label' htmlFor='primaryMenu_title'>
//                   제목
//                   <input id='primaryMenu_title' type='text' defaultValue={menu.title} onChange={handlePrimaryValue}/>
//                 </label>
//                 <div className='edit_wrap_sub'>
//                   <label className='primaryMenu_label' htmlFor='primaryMenu_link'>
//                     링크
//                     <input id='primaryMenu_link' type='text' defaultValue={menu.link}/>
//                   </label>
//                   <input type='checkbox' name='' id='' />
//                   <label htmlFor=''>새 창 열기</label>
//                   <button onClick={updateMenu}>저장</button>
//                 </div>
//               </div>
//               )}
//             </div>
//             {clickId.includes(menu.idx) && (
//               <div>
//                 {secondList
//                   .filter((submenu) => submenu.parent_id === menu.idx)
//                   .map((submenu) => (
//                     <div className='subMenus_wrap' key={submenu.idx}>
//                       <div className={`subMenus ${editMenuIds.includes(submenu.idx) ? 'withEdit' : ''}`}>
//                         <h1 className='sub_box'>{submenu.title}</h1>
//                         <div className='box'>
//                           <span onClick={() => editMenu(submenu.idx)}>
//                             <FontAwesomeIcon icon={faGear} />
//                           </span>
//                           <span onClick={() => deleteMenu(submenu.idx)}>
//                             <FontAwesomeIcon icon={faXmark} />
//                           </span>
//                         </div>
//                       </div>
//                       {editMenuIds.includes(submenu.idx) && (
//                         <div className='edit_wrap'>
//                           <label className='subMenu_label subMenu_title_label' htmlFor='subMenu_title'>
//                             제목
//                             <input id='subMenu_title' type='text' defaultValue={submenu.title}/>
//                           </label>
//                           <div className='edit_wrap_sub'>
//                             <label className='subMenu_label' htmlFor='subMenu_link'>
//                               링크
//                               <input id='subMenu_link' type='text' defaultValue={submenu.link}/>
//                             </label>
//                             <input type='checkbox' name='' id='' />
//                             <label htmlFor=''>새 창 열기</label>
//                             <button>저장</button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 <div className='subMenus addSubMenu' onClick={() => {addMenu(false); setIsOpen(true); dispatch(setBtn("추가"));}}>
//                   <FontAwesomeIcon icon={faPlus}/>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Test;
