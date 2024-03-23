import React, { useEffect, useState } from "react";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";


import Slider from "../subcomponents/Slider";




import BtnRadio from '../subcomponents/BtnRadio';

import DragAndDrop from "../subcomponents/DragAndDrop";
import CarteSaisie from "../subcomponents/CarteSaisie";

import "../styles/Formulaire1.css";



const Formulaire1 = ({ pageCount, setPageCount, handleInputChange, handleSubmit, fileData, }) => {

          const nextPage = () => setPageCount(pageCount + 1);
          const previousPage = () => setPageCount(pageCount - 1);
          const [refresh, setRefresh] = useState(false);

          const [showInputs, setShowInputs] = useState(false);

          const [selected, setSelected] = React.useState(new Set(["text"]));
          const selectedValue = React.useMemo(
            () => Array.from(selected).join(", ").replaceAll("_", " "),
            [selected]
          );

          const [inputs, setInputs] = useState(fileData.current);
          const handleFileUpload = (file) => {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith(".json")) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const jsonData = JSON.parse(event.target.result);
              setInputs(jsonData);
              if (jsonData.geometry.type === "plan" || jsonData.geometry.type === "plane") {
                setShowInputs(true);
              }
            };
            reader.readAsText(file);}
            else { alert("Le format du fichier n'est pas pris en charge. Veuillez sélectionner un fichier JSON.");}
          };

          useEffect(() => {
            fileData.current = inputs;
            if (inputs.geometry.type === "plan" || inputs.geometry.type === "plane") {
              setShowInputs(true);
            }
          }, [inputs]);

          // const handleChange = (event) => {
          //   const { value } = event.target;
          //   setInputs((prevInputs) => {
          //     switch (event.target.name) {
          //       case "electromagnetic_wave:lambda":
          //         return {
          //           ...prevInputs,
          //           electromagnetic_wave: {
          //             ...prevInputs.electromagnetic_wave,
          //             lambda: value,
          //           },
          //         };
          //       case "electromagnetic_wave:polarization":
          //         return {
          //           ...prevInputs,
          //           electromagnetic_wave: {
          //             ...prevInputs.electromagnetic_wave,
          //             polarization: value,
          //           },
          //         };
          //       case "geometry:type":
          //           return {
          //               ...prevInputs,
          //               geometry: {
          //                   ...prevInputs.geometry,
          //                   type: value,
          //               },
          //           };
          //       case "geometry:a":
          //           return {
          //               ...prevInputs,
          //               geometry: {
          //                   ...prevInputs.geometry,
          //                   a: value,
          //               },
          //           };
          //       case "geometry:d":
          //           return {
          //               ...prevInputs,
          //               geometry: {
          //                   ...prevInputs.geometry,
          //                   d: value,
          //               },
          //           };



          //       case "geometry:theta":
          //         return {
          //           ...prevInputs,
          //           geometry: {
          //             ...prevInputs.geometry,
          //             theta: value,
          //           },
          //         };
          //       default:
          //         return prevInputs;
          //     }
          //   });
          // };

          const handleChange = (event) => {
            const { name, value } = event.target;
            setInputs((prevInputs) => {
              const [section, field] = name.split(":");
              return {
                ...prevInputs,
                [section]: {
                  ...prevInputs[section],
                  [field]: value,
                },
              };
            });
          };

          const handleGeometryChange = (event) => {
            const { value } = event.target;
            if (value === "plan" || value === "plane") {
              setShowInputs(true);
            } else {
              setShowInputs(false);
            }
            console.log("showInputs:", showInputs)
          };
          

          //   ...prevInputs,
          //   electromagnetic_wave: {
          //     ...prevInputs.electromagnetic_wave,
          //     lambda: value
          //   }

          const electromagneticWaveExists = inputs.hasOwnProperty(
            "electromagnetic_wave"
          );

          return (<>
            <CarteSaisie>
              <form onSubmit={handleSubmit}>
                <div className="titre-dnd">
                  <h1>Formulaire</h1>
                  <DragAndDrop handleFileUpload={handleFileUpload} />
                </div>

                <div className="sousCartedsInput">
                  <div className="carteOEM">
                    <CarteSaisie>
                      <h4>Electromagnetic Wave</h4>

                      <label htmlFor="lambdaInput">
                        Lambda:
                        <Input
                          type="text"
                          id="lambdaInput"
                          aria-label="Lambda"
                          name="electromagnetic_wave:lambda"
                          value={
                            electromagneticWaveExists
                              ? inputs.electromagnetic_wave.lambda
                              : ""
                          }
                          onChange={handleChange}
                          onKeyDown={handleChange}
                        />
                      </label>

                      <label htmlFor="polarizationInput">Polarization:</label>

                      <label htmlFor="teRadio">
                        TE
                        <input
                          type="radio"
                          id="teRadio"
                          name="electromagnetic_wave:polarization" // Utilisez le nom correct ici
                          value="TE"
                          checked={
                            electromagneticWaveExists &&
                            inputs.electromagnetic_wave.polarization === "TE"
                          }
                          onChange={handleChange}
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
                            electromagneticWaveExists &&
                            inputs.electromagnetic_wave.polarization === "TM"
                          }
                          onChange={handleChange}
                        />
                      </label>
                    </CarteSaisie>
                  </div>

                  <div className="cartemilieu">
                    <CarteSaisie>
                      <h4>Input Medium</h4>
                    </CarteSaisie>

                    <CarteSaisie>
                      <h4>Output Medium</h4>
                    </CarteSaisie>
                  </div>

                  <div className="carteGeo">
                    <CarteSaisie>
                      <h4>Geometry</h4>

                      <label htmlFor="polarizationInput">Geometry:</label>

                      <label htmlFor="geoRadio">
                        Plan
                        <input
                          type="radio"
                          id="geoRadio"
                          name="geometry:type"
                          value="plan"
                          checked={
                            inputs.geometry.type === "plan" ||
                            inputs.geometry.type === "plane"
                          }
                          onChange={(event) => {
                            handleChange(event);
                            handleGeometryChange(event);
                            console.log('here')
                            
                          }}
                        />
                      </label>

                      {showInputs && (
  <>
                      <label htmlFor="theta">
                        theta:
                        <Input
                          type="text"
                          id="theta"
                          aria-label="Theta"
                          name="geometry:theta"
                          value={inputs.geometry.theta || ""}
                          onChange={handleChange}
                          onKeyDown={handleChange}
                        />
                      </label>

                      <label htmlFor="a">
                        a:
                        <Input
                          type="text"
                          id="a"
                          aria-label="a"
                          name="geometry:a"
                          value={inputs.geometry.a || ""}
                          onChange={handleChange}
                          onKeyDown={handleChange}
                        />
                      </label>

                      <label htmlFor="d">
                        d:
                        <Input
                          type="text"
                          id="d"
                          aria-label="d"
                          name="geometry:d"
                          value={inputs.geometry.d || ""}
                          onChange={handleChange}
                          onKeyDown={handleChange}
                        />
                      </label>
                        </>
                        )}

                      <button type="submit">Submit</button>
                    </CarteSaisie>
                  </div>
                </div>

                {/* <label htmlFor="formulaInput">
        Formula:
        <input
          type="text"
          id="formulaInput"
          name="material.formula"
        //   ref={(ref) => (fileData.current[2].ref = ref)}
          onChange={(e) => handleInputChange(e, fileData)}
        />
      </label> */}

                <Button.Group color="gradient" size="xl">
                  <Button ghost rounded onPress={() => previousPage()}>
                    BACK
                  </Button>
                  <Button ghost rounded type="submit">
                    START SIMULATION
                  </Button>

                  <Button ghost rounded onPress={nextPage}>
                    NEXT PAGE
                  </Button>

                </Button.Group>

                {/* Ajoutez d'autres champs de formulaire selon vos besoins */}
              </form>
            </CarteSaisie>

            <div className="carteInfo">

            <CarteSaisie>
                <h4>Output</h4>
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                
            </CarteSaisie>

            </div>
                </>
          )


        };

export default Formulaire1;
