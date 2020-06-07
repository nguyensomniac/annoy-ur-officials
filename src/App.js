import React from 'react';
import './App.css';
import Button from './components/button';

const getShortenedLink = async () => {

}

function App() {
  return (
    <>
      <span>To</span>
      <input type="text" />
      <span>Subject</span>
      <input type="text" />
      <span>Message</span>
      <textarea type="text"></textarea>
      <Button>Submit</Button>
    </>
  );
}

export default App;
