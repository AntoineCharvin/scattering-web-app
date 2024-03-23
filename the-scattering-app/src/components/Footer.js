import '../styles/Footer.css'
import React from 'react';



function Footer({openHelp}) {
    return (
        <footer >
                <div className='lien-foot'>
                    <button className="btn-foot" onClick={() => openHelp()}>HELP</button>
                    <button className="btn-foot" ><a href='.' >START OVER</a></button>
                </div>
                
        </footer>
    )
}

export default Footer