'use client';
import { Box, Container, FormGroup, Grid, TextField, Typography } from '@mui/material';
// components/QuillEditor.js
import '../../../app/globals.css';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { East } from '@mui/icons-material';

const QuillEditor = () => {
  const [content, setContent] = useState('');
  const [editorHtml, setEditorHtml] = useState(content);

  console.log(content);
  // @ts-ignore
  const handleChange = (value) => {
    console.log(value);
    setContent(value);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
    <Box mt={10} >
      <Container>
        <Grid container xs={12} mb={{lg:13,xs:15}}>
          <Grid item lg={3} xs={12} pr={2}>
            <form>
                <FormGroup>
                    <label>Title Name:</label>
                    <TextField size='small' placeholder='title name' />
                </FormGroup>
                <FormGroup>
                    <label>Description:</label>
                    <TextField multiline rows={3} size='small' placeholder='title name' />
                </FormGroup>
            </form>
          </Grid>
          <Grid item lg={9} xs={12}>
            <Typography>Write Blog Content:</Typography>
            {/* <ReactQuill
              theme='snow'
              value={content||''}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              style={{height:'70vh'}}
            /> */}
          </Grid>
        </Grid>
        <Box sx={{textAlign:'end',mb:5}}>
            <button disabled>Publish{"  "}<span><East /></span></button>
        </Box>

        {/* <h2>Editor Content:</h2>
        <Box>
          <div
            className='ediot'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box> */}
      </Container>
    </Box>
  );
};

export default QuillEditor;
