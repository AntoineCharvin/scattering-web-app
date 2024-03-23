import React, { useEffect, useState } from "react";

import { Button, Input, Switch } from "@nextui-org/react";


import schema0 from '../assets/schema_base.png';
import schema1 from '../assets/schema_in.png';
import schema2 from '../assets/schema_medium1.png';
import schema3 from '../assets/schema_medium2.png';
import schema4 from '../assets/schema_materiau.png';
import schema5 from '../assets/schema_theta.png';
import schema6 from '../assets/schema_a.png';
import schema7 from '../assets/schema_d.png';

import DragAndDrop from "../subcomponents/DragAndDrop";
import BtnInputVariable from "../subcomponents/BtnInputVariable";
import MenuDeroulantDnD from "../subcomponents/MenuDeroulantDnD";
import CarteSaisie from "../subcomponents/CarteSaisie";

import "../styles/Formulaire2.css";

import {dico_info_milieu_1, dico_info_milieu_2, dico_info_materiau} from "../datas/dico_bdd.js";

const Formulaire3 = ({ pageCount, setPageCount, handleInputChange, handleSubmit, fileData, showInputs, setShowInputs}) => {

              // Le nextPage est géré dans le handleSubmit dans Home.
    const previousPage = () => setPageCount(pageCount - 1);

            const [inputs, setInputs] = useState(fileData.current);

            useEffect(() => {
              fileData.current = inputs;
              if (inputs.geometry?.type === "plane") {setShowInputs(prevState => ({ ...prevState, plane: true }));}
            }, [inputs]);

                      // Permet de gérer le domaine de validité des paramètres variables.
          function domaineValidite(valeur, min, max){
            if(
              Array.isArray(valeur) &&
              valeur.length === 3 &&
              valeur[0] >= min &&
              valeur[1] <= max &&
              valeur[0] < valeur[1] &&
              typeof valeur[2] === 'number' &&
              parseInt(valeur[2]) >= 2) {return(true)}
            else if (valeur >= min && valeur <= max) {return(true)}
            else{return(false)}
          }

                  // Gère le changement des valeurs lorsqu'un fichier est uploadé.
                  const handleFileUpload = (file) => {
                    const fileName = file.name.toLowerCase();
                    if (fileName.endsWith(".json")) {
                      const reader = new FileReader();
                        reader.onload = (event) => {
                          try{
                          const jsonData = JSON.parse(event.target.result);
                          console.log(jsonData);
        
                          // Conditions concernant les boutons qui s'affichent ou non selon les options sélectionnées,
                          // cette section sert aussi à vérifier les domaines de validité de chaque variable de geometry et electromagnetic_wave.
                          setShowInputs(prevState => ({...prevState, plane: jsonData.geometry?.type === "plane"}));
                          setShowInputs(prevState => ({ ...prevState, lambda: Array.isArray(jsonData.electromagnetic_wave?.lambda) }));
                          setShowInputs(prevState => ({ ...prevState, theta: Array.isArray(jsonData.geometry?.theta) }));
                          setShowInputs(prevState => ({ ...prevState, a: Array.isArray(jsonData.geometry?.a) }));
                          setShowInputs(prevState => ({ ...prevState, d: Array.isArray(jsonData.geometry?.d) }));
                          
                          if (jsonData.electromagnetic_wave?.lambda && Array.isArray(jsonData.electromagnetic_wave.lambda)) 
                            {if (domaineValidite(jsonData.electromagnetic_wave.lambda, 1e-9, 1)) {setShowInputs(prevState => ({ ...prevState, lambda: true }));}
                            else {jsonData.electromagnetic_wave.lambda=null;alert("La liste contenant les lambda est incorrecte. Veuillez respecter la structure suivante : [min, max, nombre de points] et le domaine de validité de ces valeurs.");}}


                          if (jsonData.geometry?.theta && Array.isArray(jsonData.geometry.theta))
                            {if (domaineValidite(jsonData.geometry.theta, 0, (Math.PI)/2)) {setShowInputs(prevState => ({ ...prevState, theta: true }));}
                          else {jsonData.geometry.theta=null; alert("La liste contenant les thêta est incorrecte. Veuillez respecter la structure suivante : [min, max, nombre de points] et le domaine de validité de ces valeurs.");}}

                          if (jsonData.geometry?.a && Array.isArray(jsonData.geometry.a))
                            {if (domaineValidite(jsonData.geometry.a, 1e-9, 1)) {setShowInputs(prevState => ({ ...prevState, a: true }));}
                          else {jsonData.geometry.a=null; alert("La liste contenant les a est incorrecte. Veuillez respecter la structure suivante : [min, max, nombre de points] et le domaine de validité de ces valeurs.");}}

                          if (jsonData.geometry?.d && Array.isArray(jsonData.geometry.d))
                            {if (domaineValidite(jsonData.geometry.d, 1e-9, 1)) {setShowInputs(prevState => ({ ...prevState, d: true }));}
                          else {jsonData.geometry.d=null; alert("La liste contenant les d est incorrecte. Veuillez respecter la structure suivante : [min, max, nombre de points] et le domaine de validité de ces valeurs.");}}
        
                          // Conditions concernant les milieux et matériaux dont la structure des dictionnaires est variable.
                          // Ne pas changer l'ordre des conditions.
                          if (jsonData.medium_1) {
                            if (!jsonData.medium_1.name || !Object.keys(dico_info_milieu_1).includes(jsonData.medium_1.name.toString())) {jsonData.medium_1.name = "other";}
                            if (Object.keys(dico_info_milieu_1).includes(jsonData.medium_1.name.toString()) && jsonData.medium_1.name.toString() !== "other") {jsonData.medium_1 = dico_info_milieu_1[jsonData.medium_1.name];}}
                          if (jsonData.medium_2) {
                            if (!jsonData.medium_2.name || !Object.keys(dico_info_milieu_2).includes(jsonData.medium_2.name.toString())) {jsonData.medium_2.name = "other";}
                            if (Object.keys(dico_info_milieu_2).includes(jsonData.medium_2.name.toString()) && jsonData.medium_2.name.toString() !== "other") {jsonData.medium_2 = dico_info_milieu_2[jsonData.medium_2.name];}}
                          if (jsonData.material) {
                            if (!jsonData.material.name || !Object.keys(dico_info_materiau).includes(jsonData.material.name.toString())) {jsonData.material.name = "other";}
                            if (Object.keys(dico_info_materiau).includes(jsonData.material.name.toString()) && jsonData.material.name.toString() !== "other") {jsonData.material = dico_info_materiau[jsonData.material.name];}}
        

                          setInputs(jsonData);
                          console.log(inputs)
                        }
                        catch (error) {alert("Le fichier JSON n'est pas valide. Veuillez vérifier que vous n'avez pas oublié ou rajouté une virgule.")}}
                          reader.readAsText(file);
                    }
        
                    else { alert("Le format du fichier n'est pas pris en charge. Veuillez sélectionner un fichier JSON.");}
                  };
        

          // Permet de gérer les changements lorsqu'un champ est modifié.
          const handleChange = (event) => {
            const { name, value } = event.target;
            setInputs((prevInputs) => {
              const [section, field] = name.split(":");
              return {...prevInputs, [section]: {...prevInputs[section], [field]: value,},};
              });
          };                

          const [focusState, setFocusState] = useState(0);
          
            const handleFocus = (numero_img) => {
              setFocusState(numero_img);
            };
          
            const handleBlur = () => {
              setFocusState(0);
            };

            function downloadFileData() {
              const jsonData = JSON.stringify(fileData.current);
              const blob = new Blob([jsonData], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "fileData.json";
              link.click();
            }


            return(
                <div className="formulaire">

                <div className="carteInput">
      
                  <CarteSaisie>
                    <form onSubmit={handleSubmit}>
                      <div className="titre-dnd">
                        <h1>Formulaire</h1>
                        <DragAndDrop handleFileUpload={handleFileUpload} text={"Drag and drop a JSON file here"}/>
                      </div>
      
                      <div className="sousCartedsInput">
                        <div className="carteOEM">
                          <CarteSaisie>
                            <h4>Electromagnetic Wave</h4>
                            <BtnInputVariable inputs={inputs} setInputs={setInputs} showInputs={showInputs} setShowInputs={setShowInputs}
                             section={"electromagnetic_wave"} fieldName={"lambda"} handleChange={handleChange} handleFocus={handleFocus}
                            handleBlur={handleBlur} numSchema={1} grandeur={"λ"}/>
                      <label htmlFor="polarizationInput">Polarization:</label>
                        <label htmlFor="teRadio">
                          TE
                          <input
                            type="radio"
                            id="teRadio"
                            name="electromagnetic_wave:polarization" // Utilisez le nom correct ici
                            value="TE"
                            checked={
                              inputs.electromagnetic_wave &&
                              inputs.electromagnetic_wave.polarization === "TE"
                            }
                            onChange={handleChange}
                            onFocus={() => handleFocus(1)}
                            onBlur={handleBlur}
                          />
                        </label>
                        <label htmlFor="tmRadio">
                          TM
                          <input
                            type="radio"
                            id="tmRadio"
                            name="electromagnetic_wave:polarization" // Utilisez le nom correct ici
                            value="TM"
                            checked={
                              inputs.electromagnetic_wave &&
                              inputs.electromagnetic_wave.polarization === "TM"}
                            onChange={handleChange}
                            onFocus={() => handleFocus(1)}
                            onBlur={handleBlur}
                          />
                        </label>
                    </CarteSaisie>
                  </div>

                  <div className="cartemilieu">
                    <CarteSaisie>
                      <h4>Input Medium</h4>
                      <MenuDeroulantDnD inputs={inputs} setInputs={setInputs} section={"medium_1"} dico={dico_info_milieu_1} handleBlur={handleBlur} handleFocus={handleFocus} numSchema={2} nomAffiche={"medium 1"}/>
                    </CarteSaisie>

                    <CarteSaisie>
                      <h4>Output Medium</h4>
                      <MenuDeroulantDnD inputs={inputs} setInputs={setInputs} section={"medium_2"} dico={dico_info_milieu_2} handleBlur={handleBlur} handleFocus={handleFocus} numSchema={3} nomAffiche={"medium 2"}/>
                    </CarteSaisie>

                    <CarteSaisie>
                      <h4>Material</h4>
                      <MenuDeroulantDnD inputs={inputs} setInputs={setInputs} section={"material"} dico={dico_info_materiau} handleBlur={handleBlur} handleFocus={handleFocus} numSchema={4} nomAffiche={"material"}/>
                    </CarteSaisie>

                  </div>

                  <div className="carteGeo">
                    <CarteSaisie>
                      <h4>Geometry</h4>

                      <label htmlFor="polarizationInput">Geometry: </label>

                      <label htmlFor="geoRadio">
                        Plane
                        <input
                          type="radio"
                          id="geoRadio"
                          name="geometry:type"
                          value="plane"
                          checked={inputs.geometry && inputs.geometry.type === "plane"}
                          onChange={(event) => {
                            handleChange(event);
                            setShowInputs(prevState => {
                                const updatedState = { ...prevState };
                                updatedState["plane"] = !updatedState["plane"];
                                return updatedState;
                              });
                          }}
                          
                        />
                      </label>

                      {showInputs["plane"] && (
  <>
                            <BtnInputVariable inputs={inputs} setInputs={setInputs} showInputs={showInputs} setShowInputs={setShowInputs}
                             section={"geometry"} fieldName={"theta"} handleChange={handleChange} handleFocus={handleFocus}
                            handleBlur={handleBlur} numSchema={5} grandeur={"θ"}/>

                            <BtnInputVariable inputs={inputs} setInputs={setInputs} showInputs={showInputs} setShowInputs={setShowInputs}
                             section={"geometry"} fieldName={"a"} handleChange={handleChange} handleFocus={handleFocus}
                            handleBlur={handleBlur} numSchema={6} grandeur={"a"}/>

                            <BtnInputVariable inputs={inputs} setInputs={setInputs} showInputs={showInputs} setShowInputs={setShowInputs}
                             section={"geometry"} fieldName={"d"} handleChange={handleChange} handleFocus={handleFocus}
                            handleBlur={handleBlur} numSchema={7} grandeur={"d"}/>
                        </>
                      )}
                      
                      <button type="submit">Submit</button>
                    </CarteSaisie>
                  </div>
                </div>
                </form>
            </CarteSaisie>
          </div>

            <div className="carteInfo">

            <CarteSaisie>
                <h4>Illustration</h4>
                {focusState === 0 && (<img src={schema0} alt="base" />)}
                {focusState === 1 && (<img src={schema1} alt="EM incidente" />)}
                {focusState === 2 && (<img src={schema2} alt="milieu 1" />)}
                {focusState === 3 && (<img src={schema3} alt="milieu 2" />)}
                {focusState === 4 && (<img src={schema4} alt="matériau" />)}
                {focusState === 5 && (<img src={schema5} alt="thêta" />)}
                {focusState === 6 && (<img src={schema6} alt="a" />)}
                {focusState === 7 && (<img src={schema7} alt="d" />)}

                <Button.Group color="gradient" size="xl">
                  <Button ghost rounded color="gradient" size="xl" onPress={() => previousPage()}> BACK </Button>
                  <Button ghost rounded color="gradient" size="xl" onPress={() => downloadFileData()}>Download</Button>
                  <Button ghost rounded color="gradient" size="xl" type="submit">
                    START SIMULATION
                  </Button>
                </Button.Group>

            </CarteSaisie>

            </div>
        </div>
    );
}
export default Formulaire3;