import React, { useRef } from 'react';



import { Editor } from '@tinymce/tinymce-react';

import { Button } from '@mui/material';

const TinyEditor = ({value, onEdit, onDismiss, name='', onChange = () => {}}) => {
    const editorRef = useRef(null);
    
    const log = () => {
        if (editorRef.current) {
            onEdit(editorRef.current.getContent(), name);
        }
    };

    const handleChange = (newValue) => {
      onChange(newValue);
    }

    return (
        <>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            onEditorChange = {newValue => handleChange (newValue)}
            initialValue={value}
            init={{
              height: 300,
              menubar: false,
              statusbar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              
            }}
          />
          <Button variant='contained' size='small' onClick={log}>Komentuj</Button>
          <Button variant='contained' size='small' color="secondary" onClick={()=> onDismiss()}>Anuluj</Button>
        </>
    );
}
 
export default TinyEditor;