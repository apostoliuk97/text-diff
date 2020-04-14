import React from 'react';
import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client';

const socket = io('http://localhost:3001', { transports: ['websocket'] });

fetch('http://localhost:3001/users').then(data => data.json()).then(data => console.log(data));

socket.on('connect', function () {
  console.log('connected!');
  socket.emit('greet', { message: 'Hello Mr.Server!' });
});

socket.on('respond', function (data) {
  console.log(data);
});


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
