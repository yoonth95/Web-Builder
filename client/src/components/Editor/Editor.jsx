import React, { useState } from 'react';
import EditorModal from 'components/Modal/EditorModal';
import { useParams } from 'react-router-dom';

import 'styles/Editor/Editor.css';

const Editor = () => {
  const { editorId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  console.log(editorId);

  return (
    <>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>모달 클릭</button>
      </div>
      <EditorModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Editor;
