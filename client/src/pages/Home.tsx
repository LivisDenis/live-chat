import React from 'react';
import Chat from '../components/Chat';
import Nav from '../components/Nav';

const Home = () => (
  <div className='flex h-screen'>
    <Nav />
    <Chat />
  </div>
);

export default Home;
