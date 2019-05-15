import React from 'react';
import Home from './components/Home';
import Saved from './components/Saved';
import socketIOClient from 'socket.io-client';
import { Jumbotron } from './components/Jumbotron';
import { Container } from './components/Grid';

export const socket = socketIOClient('http://localhost:3001/');

const App = () => {
  return (
    <div>
      <Jumbotron />
      <Container>
        <Home />
        <Saved />
      </Container>
    </div>
  );
};

export default App;
