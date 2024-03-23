import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import '../styles/TestMatrice.css';
import CarteSaisie from '../subcomponents/CarteSaisie';

const math = require('mathjs');

function TestMatrice() {

  function generateComplexMatrix(rows, cols) {
    const matrix = math.zeros(rows, cols);
    
    // Remplir la matrice avec des coefficients complexes aléatoires
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const real = Math.random();
        const imag = Math.random();
        const complexNumber = math.complex(real, imag);
        matrix.subset(math.index(i, j), complexNumber);
      }
    }
    
    return matrix;
  }





  const [minSize, setMinSize] = useState(10);
  const [maxSize, setMaxSize] = useState(50);
  const [number, setNumber] = useState(1);
  const [graphData, setGraphData] = useState([]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setIsLoading(true);

    const requestData = {
      minSize: minSize,
      maxSize: maxSize,
      number: number
    };

    fetch("/test", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData),
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }





  

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      fetchData();
      const newData = [];
      setGraphData([]); // Réinitialisation de graphData
  
      for (let size = minSize; size <= maxSize; size += number) {
        const complexMatrix = generateComplexMatrix(size, size);
        console.log(`Matrice de taille ${size}x${size}:`);
        console.log(complexMatrix.toString());

        console.time(`InverseMatrix ${size}x${size}`);
        const start = performance.now();
        const inverseMatrix = math.inv(complexMatrix);
        const end = performance.now();
        console.timeEnd(`InverseMatrix ${size}x${size}`);
        console.log(`Matrice inverse de taille ${size}x${size}:`);
        console.log(inverseMatrix.toString());

        const elapsedTime = end - start;
        newData.push({ x: size, y: elapsedTime });
      }
      
  
      setGraphData(newData);
    }
  }
  


  function handleMinSizeChange(event) {
    const newSize = parseInt(event.target.value, 10); // Convertir en nombre entier
    setMinSize(newSize);
    handleKeyDown(event);
  }
  
  function handleMaxSizeChange(event) {
    const newSize = parseInt(event.target.value, 10); // Convertir en nombre entier
    setMaxSize(newSize);
    handleKeyDown(event);
  }
  

  function handleNumberChange(event) {
    const newNumber = parseInt(event.target.value, 10); // Convertir en nombre entier
    setNumber(newNumber);
    handleKeyDown(event);
  }

  
  
  
  
  
    return (
      <div className='testMatrice'>
 
        <div>
          <label> Taille min :</label>
          <input type="text" value={minSize} onKeyDown={handleKeyDown} onChange={handleMinSizeChange}  />
  
          <label> Taille max :</label>
          <input type="text" value={maxSize} onKeyDown={handleKeyDown} onChange={handleMaxSizeChange}  />
  
          <label> Pas :</label>
          <input type="number" value={number} onKeyDown={handleKeyDown} onChange={handleNumberChange} />
        </div>
  
        <div id="graph">
        
        <Plot
            data={[
              {
                x: graphData.map(data => data.x),
                y: graphData.map(data => data.y),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
                name: 'calcul en javascript sur client'
              },
              
            ]}

            layout={{
              title: 'Temps d\'inversion de matrices complexes version client',
              xaxis: { title: 'dimension de la matrice' },
              yaxis: { title: 'Temps (ms)', side: 'left' },
            }}
          />

          <Plot
            data={[
              {
                x: data.taille,
                y: data.res,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'blue' },
                name: 'calcul en python sur serveur'
              },
            ]}

            layout={{
              title: 'Temps d\'inversion de matrices complexes version serveur',
              xaxis: { title: 'dimension de la matrice' },
              yaxis: { title: 'Temps (ms)', side: 'left' },
            }}
          />


        </div>
      </div>
    );
  }
  
  export default TestMatrice;








  
 
  
  
  
  