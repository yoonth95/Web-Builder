import { useDispatch, useSelector } from 'react-redux';
import { updateList } from 'redux/editorSlice';


export const useImageActions = () => {
  const blocks = useSelector(state => state.editor.blockList);
  const dispatch = useDispatch();

  const addImageAction = ({src, block_id, idx, isLayout}) => {
    if (isLayout !== false) {
      const layout_id = isLayout.split("_")[1];
      console.log(src, block_id, idx, layout_id);
    } else {
      // 목록 디자인
      if (idx === undefined) {
        dispatch(updateList(blocks.map(block => {
          if (block.block_id === block_id) {
            return {
              ...block,
              content: {
                ...block.content,
                images: block.content.images.map(image => ({...image, src}))
              }
            }
          }
          return block;
        })));
      } 
      // 이미지 디자인
      else {
        dispatch(updateList(blocks.map(block => {
          if (block.block_id === block_id) {
            return {
              ...block,
              content: {
                ...block.content,
                images: block.content.images.map((image, i) => 
                  i === idx ? {...image, src} : image
                )
              }
            }
          }
          return block;
        })));
      }
    }
  }

  const deleteImageAction = ({block_id, idx, layout_id}) => {
    if (idx === undefined) {
      dispatch(updateList(blocks.map(block => {
        if (block.block_id === block_id) {
          return {
            ...block,
            content: {
              ...block.content,
              images: block.content.images.map(image => ({...image, src: ''}))
            }
          }
        }
        return block;
      })));
    } else {
      dispatch(updateList(blocks.map(block => {
        if (block.block_id === block_id) {
          return {
            ...block,
            content: {
              ...block.content,
              images: block.content.images.map((image, i) => 
                i !== idx ? {...image, src: ''} : image
              ) 
            }
          }
        }
        return block;
      })));
    }
  }
  return { addImageAction, deleteImageAction };
};