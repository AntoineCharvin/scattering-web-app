import React from "react";

import DragAndDrop from "./DragAndDrop";

function MenuDeroulantDnD({inputs, setInputs, section, dico, handleBlur, handleFocus, numSchema, nomAffiche}){
    const sectionKeys = Object.keys(dico);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => {
          const [section, field] = name.split(":");
          if (section === "material") {return {...prevInputs,[section]: {name:dico[value].name, formula:dico[value].formula, sigma_re: dico[value].sigma_re, sigma_im: dico[value].sigma_im, omega: dico[value].omega, T: dico[value].T, mu: dico[value].mu,}};}
          if (section === "medium_1") {return {...prevInputs,[section]: {name:dico[value].name, epsilon_re: dico[value].epsilon_re,}};}
          if (section === "medium_2") {return {...prevInputs,[section]: {name:dico[value].name, formula: dico[value].formula, epsilon_re: dico[value].epsilon_re, epsilon_im: dico[value].epsilon_im, omega: dico[value].omega,}};}
          }
        );
      }; 

                  // Gère le changement des valeurs lorsqu'un fichier est uploadé.
                  const handleFileUpload = (file) => {
                    const fileName = file.name.toLowerCase();
                    console.log("test");
                  };

    return(
        <>
        <select onChange={handleChange} name={section}
        onFocus={() => handleFocus(numSchema)}
        onBlur={handleBlur}
        value={inputs[section] ? inputs[section].name : ""}>
        {(!inputs[section] || inputs[section].name === null) && (<option value="">Choose {nomAffiche}</option>)}
        {sectionKeys.map((key) => (
        <option key={key} value={dico.key}
        checked={
        inputs[section] &&
        inputs[section] === dico.key
        }
        onChange={handleChange}>
        {key}
        </option>
        ))}
        </select>
        <DragAndDrop handleFileUpload={handleFileUpload} text={"Drag and drop a JSON or CSV file here"}/> </>
)
}

export default MenuDeroulantDnD;