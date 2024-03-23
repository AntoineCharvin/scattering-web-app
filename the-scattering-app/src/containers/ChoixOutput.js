import React, { useEffect, useState } from "react";

import { Button, Input } from "@nextui-org/react";
import { Collapse, Text, Grid } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";

import "../styles/ChoixOutput.css"
import CarteSaisie from "../subcomponents/CarteSaisie"


import int_spectra from "../assets/int_spectra.png"
import abs_spectra from "../assets/abs_spectra.png"
import field_map from "../assets/field_map.png"




function ListeChoix(){
    return(<div className="liste-choix">
        <Grid.Container gap={4}>
      <Grid>
        <Collapse.Group splitted>
          <Collapse title="Absorption Spectra">
            <Text>
            This graph allows visualizing the material absorption as a function of a 
            given physical parame- ter. There are as many absorption graphs as there 
            are parameters to be varied.
            </Text>

            <img src={abs_spectra} alt="graph" style={{"width":"90%"}}/>

          </Collapse>
          <Collapse title="Field Mapping">
            <Text>
            This graph allows visualizing the intensity of the electric and magnetic
             fields along the y direc- tion at various points in space. The ordinate 
             and abscissa represent the z and x axes, respecti- vely. The space is divided 
             into cells of different colors. The brighter the color, the greater the intensity 
             at that point.

            </Text>
            <img src={field_map} alt="graph" style={{"width":"90%"}}/>

            
          </Collapse>
          <Collapse title="Intensity Spectra">
            <Text>
            The graph emphasizes the intensity of the waves transmitted and reflected through 
            the material. On the x-axis, you can see the order of the channel, and on the 
            y-axis, the intensities of the reflected and transmitted channels.
            </Text>

            <img src={int_spectra} alt="graph" style={{"width":"90%"}}/>


          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
    </div>
    )
}

function ChoixOutput({ pageCount, setPageCount, plotData }){

  const nextPage = () => setPageCount(pageCount + 1);
  const previousPage = () => setPageCount(pageCount - 1);
  const [output, setOutput] = useState(plotData.current);

  useEffect(() => {
    plotData.current = output;
    // console.log(plotData.current);
  }, [output,plotData]);

  const handleSwitch = (name) => {
    setOutput((prevOutput) => {
      const updatedOutput = {
        ...prevOutput,
        [name]: !prevOutput[name]
      };
      plotData.current = updatedOutput;
      return updatedOutput;
    });
  };


    return (
      <div className="ChoixOutput">
        <CarteSaisie>
          <div className="carte-liste-output">
            <CarteSaisie>
              <h1>Outputs Selection</h1>

              <div className="txt-btn">
                <Switch
                  bordered
                  shadow
                  size="xl"
                  color="primary"
                  checked={output["Spectre d'absorption"]}
                  onChange={() => handleSwitch("Spectre d'absorption")}
                />
                <h4>absorption spectra</h4>
              </div>

              <div className="txt-btn">
                <Switch
                  bordered
                  shadow
                  size="xl"
                  color="primary"
                  checked={output["Cartographie des champs"]}
                  onChange={() => handleSwitch("Cartographie des champs")}
                />
                <h4>Electromagnetic Field</h4>
                {plotData.current["Cartographie des champs"] && (
                  <div className="xmin_max">
                    <Input label="X_min" />
                    <Input label="X_max" />
                    <Input label="Number of points" />
                  </div>
                )}
              </div>

              <div className="txt-btn">
                <Switch
                  bordered
                  shadow
                  size="xl"
                  color="primary"
                  checked={output["Spectre des intensités"]}
                  onChange={() => handleSwitch("Spectre des intensités")}
                />
                <h4>Intensity Spectra</h4>
              </div>

              <Button.Group color="gradient" size="xl">
                <Button ghost rounded onPress={() => previousPage()}>
                  BACK
                </Button>
                <Button
                  ghost
                  rounded
                  onPress={() => {
                    if (
                      Object.values(plotData.current).some(
                        (value) => value === true
                      )
                    ) {
                      nextPage();
                    } else {
                      alert("Please select at least one output.");
                    }
                  }}
                >
                  CONTINUE
                </Button>
              </Button.Group>
            </CarteSaisie>

            <div className="schema-output">
              <CarteSaisie>
                <h1>Description</h1>
                {ListeChoix()}
              </CarteSaisie>
            </div>
          </div>
        </CarteSaisie>
      </div>
    );
}





export default ChoixOutput