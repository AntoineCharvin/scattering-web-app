import React, { useState } from 'react';
import CarteSaisie from '../subcomponents/CarteSaisie';

// Ressources
import "../styles/ChoixMethode.css"
import FMM from "../assets/FMM.png"
import LBF from "../assets/LBF.png"

// Component graphique de NextUI
import { Button } from "@nextui-org/react";

function ChoixMethode({pageCount, setPageCount,methodData}) {

    const nextPage = () => setPageCount(pageCount + 1);
    const previousPage = () => setPageCount(pageCount - 1);

    const [method, setMethod] = useState(methodData.current);
    const handleMethod = (method) => {
        setMethod(method);
        methodData.current = method;
        console.log(methodData.current);
    }

    return <div className='method'>

        <CarteSaisie id="test1">
            
            <div className='titre-btn-choixmethode'>
                <h1>Methods</h1>
                <Button ghost rounded color='gradient' onPress={()=> previousPage()}>BACK</Button>
            </div>
                
            <div className='carte-fmm-lbf'>


                <div className='FMM' onClick={() =>  {handleMethod("FMM");nextPage();} }> 
                    <CarteSaisie>
                        <h1>FMM</h1>
                        <p>
                        The Fourier Modal Method (FMM) is a technique used to solve optical
                            diffraction and electromagnetic wave propagation problems.
                            It represents waves in terms of Fourier modes, allowing
                            to compute mode coefficients and accurate solutions.
                        </p>
                        <img src={FMM} alt="graph" style={{"width":"50%"}}/>
                        <Button color="gradient" size="xl" ghost rounded onPress={() =>  {handleMethod("FMM");nextPage();} }>Method FMM</Button>
                    </CarteSaisie>
                </div>
        
                <div className='LBF'>
                    <CarteSaisie>
                        <h1>LBF</h1>
                        <p>
                        The Local Basis Function (LBF) method solves complex partial
                            differential equation (PDE) problems by decomposing the domain
                            into smaller subdomains and using localized basis functions
                            for an accurate and efficient solution.
                        </p>
                        <img src={LBF} alt="graph" style={{"width":"50%"}}/>
                            <Button style={{"background":"#e8e8e8","border":"#e8e8e8","color":"grey"}} size="xl" ghost  rounded onPress={() => {alert("LBF Method is not available yet")}}>Method LBF</Button>

                    </CarteSaisie>
                </div>

            </div>

            

                </CarteSaisie>

                
            </div>
            
}

export default ChoixMethode





    