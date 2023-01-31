import React from 'react';
import './App.css';
import { originals, action } from './urls';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';

export default function App() {
  return (
    <div>
      <NavBar />
      <Banner />
      <RowPost title='Netflix Originals' url={originals} />
      <RowPost title='Action' isSmall url={action} />
    </div>
  );
}
