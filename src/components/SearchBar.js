// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import React, { useState } from 'react';

function InputComponent() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with inputValue, such as saving it to another state or using it directly
    console.log('Input value:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input Value:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputComponent;

