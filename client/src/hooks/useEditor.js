// import { useState } from 'react';
// import { GetBlocksAPI } from '../api/Editor';

// export const useEditorActions = () => {
//     const getBlocksAction = async (idx) => {
//         try {
//           const data = await GetBlocksAPI();
//           let f_list = [];
//           let s_list = [];
//           data.forEach((item) => {
//             !item.parent_id ? f_list.push(item) : s_list.push(item);
//           });
//           dispatch(updateList({ listName: 'firstList', newList: f_list }));
//           dispatch(updateList({ listName: 'secondList', newList: s_list }));
//           setIsLoading(false);
//         } catch (err) {
//           console.error(err.message);
//           alert('조회 오류');
//           setIsLoading(true);
//         }
//       };

//     return { getBlocksAction };
// }