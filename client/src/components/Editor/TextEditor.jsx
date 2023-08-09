import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextEditor = ({line, index, handleUpdateText, block_id, isLayout, screenSize}) => {
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
            <div style={{margin: line.margin, fontSize: line.fontSize,color: line.color,fontWeight: line.fontWeight, width:'100%'}}>
                <CKEditor
                    style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}
                    editor={ClassicEditor}
                    config={{
                        // plugins: [Font],
                        toolbar: {
                            items: [
                                'heading','|','fontSize', 'fontFamily', 'bold', 'italic','|', 'alignment','|',
                                '|','indent', 'outdent','|','fontBackgroundColor','fontColor','|','undo', 'redo'
                            ],
                            shouldNotGroupWhenFull: true  
                    },}}
                    data={`<p style="text-align:center;">${line.text}</p>`}
                    onReady={handleEditorReady}
                    onChange={handleEditorChange}
                />
            </div>
        </React.Fragment>
    );
  };
  

export default TextEditor;