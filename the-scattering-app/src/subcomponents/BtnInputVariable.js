import React,{ useState } from "react";
import {Input, Switch, Grid} from "@nextui-org/react";



function BtnInputVariable({inputs, setInputs, showInputs, setShowInputs, section, fieldName, handleChange, handleFocus, handleBlur, numSchema, grandeur}){

    const sub_0 = React.createElement("sub", null, "0");
    const sub_min = React.createElement("sub", null, "min");
    const sub_max = React.createElement("sub", null, "max");

          // Permet de changer le type du paramètre variable et d'effacer son ancien contenu.
          function arrayOrNumber(section, fieldName) {
            //            const showInputsMap = {"lambda": showInputsLambda, "theta": showInputsTheta,  "a": showInputsA,  "d": showInputsD};
                        if (!showInputs[fieldName]) {
                          inputs[section][fieldName] = [inputs[section][fieldName], null, null];
                        } else {
                           return inputs[section][fieldName] = inputs[section][fieldName][0];
                        }
                      }
            
                      // Permet de gérer les changements lorsqu'un des trois champs (min, max ou number of points) est modifié.
                      const handleChangeList = (event, section, fieldName, index) => {
                        const { value } = event.currentTarget;
                        setInputs((prevInputs) => ({
                          ...prevInputs,
                          [section]: {
                            ...prevInputs[section],
                            [fieldName]: Array.isArray(prevInputs[section][fieldName])
                              ? prevInputs[section][fieldName].map((item, i) =>
                                  i === index ? value : item
                                )
                              : value,
                          },
                        }));
                      };
            
                // Sert à gérer l'affichage des paramètres variables.
                      const renderInputFields = (showMultiple, section, fieldName, inputsData, handleChangeList, handleFocus, handleBlur, numSchema) => {
                        if (!showMultiple) {
                          return (
                            <label htmlFor={fieldName}>
                              {React.createElement(React.Fragment,null,grandeur,sub_0)} : {}
                              <Input type="text" status="primary" id={fieldName} aria-label={fieldName} size="xl"
                                name={`${section}:${fieldName}`} value={inputsData || ""}
                                style={{ fontSize: '13px' }}
                                onChange={handleChange} onKeyDown={handleChange}
                                onFocus={() => handleFocus(numSchema)}
                                onBlur={() => {setInputs((prevInputs) => {return {...prevInputs, [section]: {...prevInputs[section], [fieldName]: prevInputs[section][fieldName]*1,},};});
                                handleBlur()}}/>
                            </label>
                          );
                        } else {
                          return (
                            <label htmlFor={fieldName}>
                              <> </>
                              {inputsData.map((input, index) => (
                                <label key={index} htmlFor={`${fieldName}${index}`}>
                                  {index === 0 ? React.createElement(React.Fragment,null,grandeur,sub_min," : ") : index === 1 ? React.createElement(React.Fragment,null,grandeur,sub_max," : ") : "# of points:"}
                                   <Input  type="text" status="primary"  id={`${fieldName}${index}`} aria-label={`${fieldName} ${index}`}
                                    name={`${fieldName}[${index}]`} value={input || ""}
                                    style={{ fontSize: '13px' }}
                                    onChange={(e) => handleChangeList(e, section, fieldName, index)}
                                    onFocus={() => handleFocus(numSchema)} onBlur={() => {handleBlurVariable(section, fieldName,index); handleBlur()}}/>
                                </label>
                              ))}
                            </label>
                          );
                        }
                      };

                      const handleBlurVariable = (section, fieldName, index) => {
                        setInputs((prevInputs) => ({
                          ...prevInputs,
                          [section]: {
                            ...prevInputs[section],
                            [fieldName]: Array.isArray(prevInputs[section][fieldName])
                              ? prevInputs[section][fieldName].map((item, i) =>
                                  i === index ? prevInputs[section][fieldName][index]*1 : item
                                )
                              : prevInputs[section][fieldName][index]*1,
                          },
                        }));
                      };

                return(<div className="switch-formulaire">
                  <Switch bordered shadow size="xl" color="primary" checked={showInputs[fieldName] ? true : false}
                onChange={() => {setShowInputs(prevState => {
                    const updatedState = { ...prevState };
                    updatedState[fieldName] = !updatedState[fieldName];
                    return updatedState;
                  });
                  arrayOrNumber(section, fieldName);}}/>
            
                {renderInputFields(showInputs[fieldName], section, fieldName,
                    Array.isArray(inputs[section][fieldName]) ? inputs[section][fieldName] : inputs[section][fieldName],
                    handleChangeList, handleFocus, handleBlur, numSchema)}
                </div>
                )
}


export default BtnInputVariable;