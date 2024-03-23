import React, { useState } from 'react';
import '../styles/Slider.css';

function Slider({ indice_max, liste, nom, unite, onSliderChange }) {
  const [indiceSlider, setIndiceSlider] = useState(0);

  const handleSliderChange = (event) => {
    const indice = parseInt(event.target.value);
    setIndiceSlider(indice);
    onSliderChange(nom, indice); // Appel de la fonction de rappel avec les nouvelles valeurs
  };

  if (indice_max - 1 !== 0){
  return (
    <div className='slider'>
      <input
        type='range'
        min='0'
        max={indice_max - 1}
        value={indiceSlider}
        onChange={handleSliderChange}
        className='slider-input'
        id='myRange'
      />
      <>{nom}</><span> : {liste[indiceSlider]}</span><>{unite}</>
    </div>
  );
}
}

export default Slider;