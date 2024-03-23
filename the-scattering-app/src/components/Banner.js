import React, { useState } from 'react';

import logo from '../assets/logo.png';
import physics from '../datas/physics.pdf';

import '../styles/Banner.css'

// import logol2c from '../assets/logo-l2c.png';
function downloadFile(fileUrl, fileName) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  


function Banner() {

    const handleDownload = () => { downloadFile(physics, 'physics.pdf'); };

	return ( 
        <div className='Banner'>
            <div className='logos-banner'>
                <a href='https://www.umontpellier.fr/en/' target='blank'><img src={logo} className="scattering-logo" alt="logo" /></a>
                {/* <img src = {logol2c} className="scattering-logo-l2c" alt="logo l2c" /> */}
            </div>
            <h1 className="scattering-title">Scattering Web App</h1>
            <button className="btn-plot" onClick={handleDownload}>Documentation</button>
        </div>)
}

export default Banner