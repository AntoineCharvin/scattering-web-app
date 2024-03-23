
import React, { useState } from 'react';

import { i } from 'mathjs';
import ChoixInput from '../containers/ChoixInput';
import '../styles/App.css';

import Banner from './Banner';
import Footer from './Footer';
import Home from './Home';


// import Formulaire from '../containers/Formulaire';
// import TestMatrice from '../containers/TestMatrice';

function App() {

  const [showHelp, setShowHelp] = useState(false);
  const openHelp = () => { setShowHelp(prevShowHelp => !prevShowHelp); };


  return (
    <>
      <Banner />
      <Home showHelp={showHelp} openHelp={openHelp}>
      </Home>
      <Footer openHelp={openHelp} />
    </>
  )
  
}

export default App;
