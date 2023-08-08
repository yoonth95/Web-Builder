import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

const TextEditor = ({line, index, handleUpdateText, block_id, isLayout}) => {
  const [editor, setEditor] = useState(null);

  const handleEditorReady = editor => {
      setEditor(editor);
  };

  const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      handleUpdateText(block_id, index, data, isLayout);
  };

  return (
      <React.Fragment>
          <CKEditor
              editor={BalloonEditor}
              config={{toolbar: [ 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],}}
              data={line.text}
              onReady={handleEditorReady}
              onChange={handleEditorChange}
          />
          {line.button && <button className={line.buttonStyle}>{line.button}</button>}
      </React.Fragment>
  );
};

export default TextEditor;