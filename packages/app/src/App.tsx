import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import diff from '@diff/lib';


import './App.css';


console.log('diff', diff);

const socket = io('http://localhost:3001', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('Connected');
  socket.emit('greet', { message: 'Hello Mr.Server!' });
});

socket.on('change_text', (data: any) => {
  console.log('change_text', data);
});

function App() {
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/text')
      .then((data) => data.json())
      .then(({ text }) => setTextAreaValue(text));
  }, []);

  return (
    <div className="app">
      <textarea
        className="app-textarea"
        value={textAreaValue}
        onChange={(event) => {
          setTextAreaValue(event.target.value);
          socket.emit('change_text', event.target.value);
        }}
      />
    </div>
  );
}

export default App;
