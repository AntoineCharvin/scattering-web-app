import React , {useState,useRef} from 'react';


import Welcome from '../containers/Welcome';
import ChoixMethode from '../containers/ChoixMethode';
import ChoixOutput from '../containers/ChoixOutput';
import ViewPlot from '../containers/ViewPlot';

import TestMatrice from '../containers/TestMatrice';
import Help from '../containers/Help';
// import VisualiserDonnees from '../containers/VisualiserDonnees';

import "../styles/Home.css"
import Formulaire2 from '../containers/Formulaire2';
// import Formulaire3 from '../containers/Formulaire3';
// import { sec } from 'mathjs';




function Home({showHelp,openHelp}) {

    const [pageCount, setPageCount] = useState(0);
    const [showTestMatrice, setShowTestMatrice] = useState(false);

    const openTestMatricePopup = () => {
        setShowTestMatrice(true);
      };
    
      const closeTestMatricePopup = () => {
        setShowTestMatrice(false);
      };



    const fileData = useRef(
        {
            "electromagnetic_wave":{
                "lambda":3e-9,
                "polarization":"TE"
            },
            "material":{
                "name":null,
                "formula":null,
                "sigma_re":null,
                "sigma_im":null,
                "omega":null,
                "T":null,
                "mu":null
            },
            "medium_1":{
                "name":null,
                "epsilon_re":null,
            },
            "medium_2":{
                "name":null,
                "formula":null,
                "epsilon_re":null,
                "epsilon_im":null,
                "omega":null
            },
            "geometry":{
                "type":"plane",
                "theta":1.5,
                "a":6e-6,
                "d":8e-6,
            },
            "numerical_parameter":{
                "M":35
            }
        });

        const plotData = useRef(
            {
                "Spectre d'absorption":false,
                "Cartographie des champs":false,
                "Spectre des intensités":false
            }
        );

        const methodData = useRef(
            {
                "method":null,
            });


        const showInputsInitialStates = useRef(
            {
                "theta": false,
                "lambda": false,
                "plane": false,
                "a": false,
                "d": false
            }
        );

        
    // Fonction pour mettre à jour les valeurs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [section,subSection] = name.split('.');
        fileData.current[section][subSection] = value;
    };

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function fetchData(fileData) {
      return new Promise((resolve, reject) => {
        setIsLoading(true);
    
        fetch("/test", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fileData),
        })
          .then(res => res.json())
          .then(data => {
            setData(data);
            console.log(data);
            resolve(); // Indique que les données ont été récupérées avec succès
          })
          .catch(error => {
            console.error('Error:', error);
            reject(error); // Indique qu'une erreur s'est produite lors de la récupération des données
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
      e.preventDefault();
    fileData.current["numerical_parameter"]["method"] = methodData.current;
    fileData.current["numerical_parameter"]["result_list"] = [];
    fileData.current["numerical_parameter"]["mapping"] = null;    
    if (plotData.current["Spectre d'absorption"]) {
        fileData.current["numerical_parameter"]["result_list"].push("Spectre d'absorption");}
    if (plotData.current["Spectre des intensités"]) {
        fileData.current["numerical_parameter"]["result_list"].push("Spectre des intensités");}
    if (plotData.current["Cartographie des champs"]) {
        fileData.current["numerical_parameter"]["result_list"].push("Cartographie des champs");
        fileData.current["numerical_parameter"]["mapping"] = [];} //À modifier !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
        try {
          await fetchData(fileData.current); // Attend que les données soient récupérées avant de continuer
          console.log(fileData.current);
          nextPage();
        } catch (error) {
          console.error('Error:', error);
          // Gérer l'erreur de récupération des données ici
        }
      }


    
    

  
    const [showInputs, setShowInputs] = useState({"lambda":false, "plane":false, "theta":false, "a":false, "d":false})
    
    const nextPage = () => setPageCount(pageCount + 1);

    const fileJSON = JSON.stringify(
        Object.assign({}, fileData.current, plotData.current, methodData.current, showInputsInitialStates.current)
      );
      
    if (showHelp) { return <Help openHelp={openHelp}/>}
    if (pageCount === 1) { return <ChoixMethode pageCount={pageCount} setPageCount={setPageCount} methodData={methodData}/> }
    if (pageCount === 2) { return <ChoixOutput pageCount={pageCount} setPageCount={setPageCount} plotData={plotData}/> }
    // if (pageCount === 3) { return <ChoixInput pageCount={pageCount} setPageCount={setPageCount} /> }
    if (pageCount === 3) { return <Formulaire2 pageCount={pageCount} setPageCount={setPageCount} handleInputChange={handleInputChange} handleSubmit={handleSubmit} fileData={fileData} showInputs={showInputs} setShowInputs={setShowInputs} fileJSON={fileJSON}/> }
    if (pageCount === 4) { return <ViewPlot pageCount={pageCount} setPageCount={setPageCount} fileData={fileData} plotData={plotData} data={data}/> }
    if (pageCount === 0) { return (
        
        <div className='Home'>
              <Welcome />
              {/* Handleclic() permet de changer l'état de ShowNewComponent */}
              <button className="btn-start" onClick={() => nextPage() }>Start Simulation</button>
              <button className="btn-start" onClick={() => openTestMatricePopup()}>View Data</button>

                {showTestMatrice && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={() => closeTestMatricePopup()}>Close</button>
              <TestMatrice />
            </div>
          </div>
        )}
        </div>
    )
}
}

export default Home