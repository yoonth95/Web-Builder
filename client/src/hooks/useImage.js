import { useDispatch, useSelector } from 'react-redux';
import { updateList } from 'redux/editorSlice';


export const useImageActions = () => {
  const blocks = useSelector(state => state.editor.blockList);
  const dispatch = useDispatch();

  // 이미지 추가
  const addImageAction = ({ tag, src, block_id, idx, isLayout }) => {
    tag.target.value = '';

    const updateImages = (images, src) => {
      if (idx === undefined) {
        return images.map(image => ({ ...image, src }));
      } else {
        return images.map((image, i) =>
          i === idx ? { ...image, src } : image
        );
      }
    }

    // 레이아웃 이미지 추가
    if (isLayout !== false) {
      const layout_id = Number(isLayout.split("_")[1]);
      const updatedBlocks = blocks.map(block => {
        if (block.block_id === block_id) {
          const updatedLayoutDesign = JSON.parse(block.layout_design).map(layout => {
            if (layout.layout_id === layout_id) {
              return {
                ...layout,
                boxes: {
                  ...layout.boxes,
                  images: updateImages(layout.boxes.images, src)
                }
              }
            }
            return layout;
          });

          return {
            ...block,
            layout_design: JSON.stringify(updatedLayoutDesign)
          };
        }
        return block;
      });

      dispatch(updateList(updatedBlocks));
    }
    // 레이아웃이 아닌 디자인 이미지 추가
    else {
      dispatch(updateList(blocks.map(block => {
        if (block.block_id === block_id) {
          return {
            ...block,
            content: {
              ...block.content,
              images: updateImages(block.content.images, src)
            }
          }
        }
        return block;
      })));
    }
  }

  // 이미지 삭제
  const deleteImageAction = ({ block_id, idx, isLayout }) => {
    const deleteImages = (images) => {
      if (idx === undefined) {
        return images.map(image => ({ ...image, src: '' }));
      } else {
        return images.map((image, i) =>
          i === idx ? { ...image, src: '' } : image
        );
      }
    }

    // 레이아웃 이미지 삭제
    if (isLayout !== false) {
      const layout_id = Number(isLayout.split("_")[1]);
      const updatedBlocks = blocks.map(block => {
        if (block.block_id === block_id) {
          const updatedLayoutDesign = JSON.parse(block.layout_design).map(layout => {
            if (layout.layout_id === layout_id) {
              return {
                ...layout,
                boxes: {
                  ...layout.boxes,
                  images: deleteImages(layout.boxes.images)
                }
              }
            }
            return layout;
          });

          return {
            ...block,
            layout_design: JSON.stringify(updatedLayoutDesign)
          };
        }
        return block;
      });

      dispatch(updateList(updatedBlocks));
    }
    // 레이아웃이 아닌 디자인 이미지 삭제
    else {
      dispatch(updateList(blocks.map(block => {
        if (block.block_id === block_id) {
          return {
            ...block,
            content: {
              ...block.content,
              images: deleteImages(block.content.images)
            }
          }
        }
        return block;
      })));
    }
  }
  return { addImageAction, deleteImageAction };
};