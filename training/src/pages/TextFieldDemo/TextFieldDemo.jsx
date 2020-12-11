import React from 'react';
import { TextField } from '../../components';

function TextFieldDemo() {
  return (
    <>
      <TextField disabled />
      <br />
      <TextField value="Accessible" />
      <br />
      <TextField error="101" />
      <br />
    </>
  );
}

export default TextFieldDemo;
