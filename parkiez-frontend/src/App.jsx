import React from 'react';
import Button from './components/button';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TextInput from './components/textinput';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/btn' element={<Button text="addd" color="green" textcolor="white" />} /> */}
        <Route path='/btn' element={<TextInput label="Username" type="text" placeholder="Enter your name" required="true"/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
