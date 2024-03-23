import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import CarteSaisie from '../subcomponents/CarteSaisie';

import { Button } from "@nextui-org/react";


import '../styles/ViewPlot.css';

import Plot from 'react-plotly.js';
import Slider from '../subcomponents/Slider';

import int_spectra from "../assets/int_spectra.png"
import abs_spectra from "../assets/abs_spectra.png"
import field_map from "../assets/field_map.png"


const ViewPlot = ({pageCount, setPageCount, fileData, plotData, data}) => {

    const previousPage = () => setPageCount(pageCount - 1);

    const [indiceLambda, setIndiceLambda] = useState(0);
    const [indiceTheta, setIndiceTheta] = useState(0);
    const [indiceA, setIndiceA] = useState(0);
    const [indiceD, setIndiceD] = useState(0);

    const [graphData, setGraphData] = useState([]);

    const [graphAffichables, setGraphAffichables] = useState({"abs_lambda":false,
    "abs_theta":false, "abs_a":false, "abs_d":false, "rn_tn":false, "carto":false});

    const sub_n = React.createElement("sub", null, "n");

// dans l'ordre des graphes à afficher : abs(lambda), abs(theta), abs(a), abs(d), Rn/Tn, carto
useEffect(()=>{
    if (plotData.current["Spectre d'absorption"] && data.lambda.length > 1) {
  const lambdaElement = {
    x: data.lambda,
    y: data.absorption.slice(0, data.theta.length * data.lambda.length).filter((_, index) => index % data.theta.length === 0),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
    name: 'Absorption en fonction de λ'
  };
  setGraphData(prevData => [...prevData, [lambdaElement]]);
  setGraphAffichables(prevData => ({...prevData, "abs_lambda":true}));
}
else{setGraphData(prevData => [...prevData, []]);}
if (plotData.current["Spectre d'absorption"] && data.theta.length > 1) {
  const thetaElement = {
    x: data.theta,
    y: data.absorption.slice(0, data.theta.length),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
    name: 'Absorption en fonction de θ'
  };
  setGraphData(prevData => [...prevData, [thetaElement]]);
  setGraphAffichables(prevData => ({...prevData, "abs_theta":true}));
}
else{setGraphData(prevData => [...prevData, []]);}
if (plotData.current["Spectre d'absorption"] && data.a.length > 1) {
  const aElement = {
    x: data.a,
    y: data.absorption
    .slice(0, data.theta.length * data.lambda.length * data.d.length * data.a.length)
    .filter((_, index) => index % (data.d.length * data.lambda.length *data.theta.length) === 0),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
    name: 'Absorption en fonction de a'
  };
  setGraphData(prevData => [...prevData, [aElement]]);
  setGraphAffichables(prevData => ({...prevData, "abs_a":true}));
}
else{setGraphData(prevData => [...prevData, []]);}
if (plotData.current["Spectre d'absorption"] && data.d.length > 1) {
  const dElement = {
    x: data.d,
    y: data.absorption
    .slice(0, data.theta.length * data.lambda.length * data.d.length )
    .filter((_, index) => index % (data.lambda.length *data.theta.length) === 0),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
    name: 'Absorption en fonction de d'
  };
  setGraphData(prevData => [...prevData, [dElement]]);
  setGraphAffichables(prevData => ({...prevData, "abs_d":true}));
}
else{setGraphData(prevData => [...prevData, []]);}
if (plotData.current["Spectre des intensités"]) {
  const intensiteR = {type: 'bar', x: data.n,
  y: data.rn_tn.slice(0, data.n.length).map(complexNumber => Math.hypot(complexNumber.real, complexNumber.imag)),
  name: ReactDOMServer.renderToString(React.createElement(React.Fragment,null,"R",sub_n))};
  const intensiteT = {type: 'bar', x: data.n,
  y: data.rn_tn.slice(data.n.length, 2*data.n.length).map(complexNumber => Math.hypot(complexNumber.real, complexNumber.imag)),
  name: ReactDOMServer.renderToString(React.createElement(React.Fragment,null,"T",sub_n))};
  setGraphData(prevData => [...prevData, [intensiteR, intensiteT]]);
  setGraphAffichables(prevData => ({...prevData, "rn_tn":true}));
}
else{setGraphData(prevData => [...prevData, []]);}
if (plotData.current["Cartographie des champs"]) {setGraphAffichables(prevData => ({...prevData, "carto":true}));}
else{setGraphData(prevData => [...prevData, []]);}
}, []);

    const handleSliderChange = (sliderName, value) => {
      if (sliderName === 'λ') {
        setIndiceLambda(value);
      } else if (sliderName === 'θ') {
        setIndiceTheta(value);
      } else if (sliderName === 'a') {
        setIndiceA(value);
      } else if (sliderName === 'd') {
        setIndiceD(value);
      }
      setGraphData((prevData) => {
        const updatedData = [...prevData];
        const updatedIndiceLambda = sliderName === 'λ' ? value : indiceLambda;
        const updatedIndiceA = sliderName === 'a' ? value : indiceA;
        const updatedIndiceD = sliderName === 'd' ? value : indiceD;
        const updatedIndiceTheta = sliderName === 'θ' ? value : indiceTheta;
        
        if (sliderName !== "λ" && graphAffichables.abs_lambda){
          const indiceDebut =
          (data.lambda.length * data.theta.length * data.d.length) * updatedIndiceA +
          (data.lambda.length * data.theta.length) * updatedIndiceD +
          updatedIndiceTheta;
        const updatedY = data.absorption
          .slice(indiceDebut, indiceDebut + data.theta.length * data.lambda.length)
          .filter((_, index) => index % data.theta.length === 0);
        updatedData[0][0].y = updatedY;}

        if (sliderName !== "θ"  && graphAffichables.abs_theta){
          const indiceDebut =
          (data.lambda.length * data.theta.length * data.d.length) * updatedIndiceA +
          (data.lambda.length * data.theta.length) * updatedIndiceD +
          data.theta.length * updatedIndiceLambda;
        const updatedY = data.absorption.slice(indiceDebut, indiceDebut + data.theta.length)
        updatedData[1][0].y = updatedY;}

        if (sliderName !== "a"  && graphAffichables.abs_a){
          const indiceDebut =
          (data.lambda.length * data.theta.length) * updatedIndiceD +
          data.theta.length * updatedIndiceLambda
          + updatedIndiceTheta;
        const updatedY = data.absorption
        .slice(indiceDebut, indiceDebut + data.theta.length * data.lambda.length * data.d.length * data.a.length)
        .filter((_, index) => index % (data.theta.length * data.lambda.length * data.d.length) === 0);
        updatedData[2][0].y = updatedY;}

        if (sliderName !== "d"  && graphAffichables.abs_d){
          const indiceDebut =
          (data.lambda.length * data.theta.length * data.d.length) * updatedIndiceA +
          data.theta.length * updatedIndiceLambda
          + updatedIndiceTheta;
        const updatedY = data.absorption
        .slice(indiceDebut, indiceDebut + data.theta.length * data.lambda.length * data.d.length)
        .filter((_, index) => index % (data.theta.length * data.lambda.length) === 0);
        updatedData[3][0].y = updatedY;}

        if (graphAffichables.rn_tn){
          const indiceDebut =
          2*data.n.length*((data.lambda.length * data.theta.length * data.d.length) * updatedIndiceA +
          (data.lambda.length * data.theta.length) * updatedIndiceD +
          data.theta.length * updatedIndiceLambda +
          updatedIndiceTheta);
        const updatedY_Rn = data.rn_tn.slice(indiceDebut, indiceDebut + data.n.length).map(complexNumber => Math.hypot(complexNumber.real, complexNumber.imag));
        const updatedY_Tn = data.rn_tn.slice(indiceDebut +data.n.length, indiceDebut + 2*data.n.length).map(complexNumber => Math.hypot(complexNumber.real, complexNumber.imag));
        updatedData[4][0].y = updatedY_Rn;
        updatedData[4][1].y = updatedY_Tn;}

        return updatedData;
      });
    };

    return (
      <div className="plot">
        
        <div className="choixPlot">
          <CarteSaisie>
            <h1>Plot Preview</h1>
            {plotData.current["Spectre d'absorption"] && (
              <CarteSaisie>
                <h1>Absorption Spectra</h1>{" "}
                <img src={abs_spectra} alt="graph" style={{ width: "100%" }} />
              </CarteSaisie>
            )}
            {plotData.current["Cartographie des champs"] && (
              <CarteSaisie>
                <h1>Electromagnetic Field Mapping</h1>
                <img src={field_map} alt="graph" style={{"width":"100%"}}/>
              </CarteSaisie>
            )}
            {plotData.current["Spectre des intensités"] && (
              <CarteSaisie>
                <h1>Intensity Spectra</h1>
                <img src={int_spectra} alt="graph" style={{"width":"100%"}}/>
              </CarteSaisie>
            )}
            <Button
              ghost
              rounded
              color="gradient"
              onPress={() => previousPage()}
            >
              {" "}
              BACK{" "}
            </Button>
          </CarteSaisie>
        </div>

        <div className="viewPlot">
          <CarteSaisie>
            <h1>Plot</h1>
            <div className="slider-graph">
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'>
              <Slider
              indice_max={data.lambda.length}
              liste={data.lambda}
              nom={"λ"}
              unite={"m"}
              onSliderChange={handleSliderChange}
            />
            </div>
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'><Slider
              indice_max={data.theta.length}
              liste={data.theta}
              nom={"θ"}
              unite={"rad"}
              onSliderChange={handleSliderChange}
            />
            </div>
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'><Slider
              indice_max={data.a.length}
              liste={data.a}
              nom={"a"}
              unite={"m"}
              onSliderChange={handleSliderChange}
            />
            </div>
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'><Slider
              indice_max={data.d.length}
              liste={data.d}
              nom={"d"}
              unite={"m"}
              onSliderChange={handleSliderChange}
            />
            </div>
            </div>
            <div id="graph">
              {plotData.current["Spectre d'absorption"] &&
                data.lambda.length > 1 && ( // Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition ici
                  <Plot
                    data={graphData[0]}
                    layout={{
                      title: "Absorption as a function of λ",
                      xaxis: { title: "λ (m)" },
                      yaxis: { title: "Absorption", side: "left" },
                    }}
                  />
                )}

              {plotData.current["Spectre d'absorption"] &&
                data.theta.length > 1 && ( // Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition ici
                  <Plot
                    data={graphData[1]}
                    layout={{
                      title: "Absorption as a function of θ",
                      xaxis: { title: "θ (rad)" },
                      yaxis: { title: "Absorption", side: "left" },
                    }}
                  />
                )}

              {plotData.current["Spectre d'absorption"] &&
                data.a.length > 1 && ( // Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition ici
                  <Plot
                    data={graphData[2]}
                    layout={{
                      title: "Absorption as a function of a",
                      xaxis: { title: "a (m)" },
                      yaxis: { title: "Absorption", side: "left" },
                    }}
                  />
                )}

              {plotData.current["Spectre d'absorption"] &&
                data.d.length > 1 && ( // Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition ici
                  <Plot
                    data={graphData[3]}
                    layout={{
                      title: "Absorption as a function of d",
                      xaxis: { title: "d (m)" },
                      yaxis: { title: "Absorption", side: "left" },
                    }}
                  />
                )}
              {plotData.current["Spectre des intensités"] && ( // Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition ici
                <Plot
                  data={graphData[4]}
                  layout={{
                    title:
                      "Modulus of " +
                      ReactDOMServer.renderToString(
                        React.createElement(React.Fragment, null, "R", sub_n)
                      ) +
                      " and " +
                      ReactDOMServer.renderToString(
                        React.createElement(React.Fragment, null, "T", sub_n)
                      ),
                    xaxis: { title: "n" },
                    yaxis: {
                      title:
                        "Modulus of " +
                        ReactDOMServer.renderToString(
                          React.createElement(React.Fragment, null, "R", sub_n)
                        ) +
                        " and " +
                        ReactDOMServer.renderToString(
                          React.createElement(React.Fragment, null, "T", sub_n)
                        ),
                      side: "left",
                    },
                  }}
                />
              )}
            </div>

            <div className="slider-graph">
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'>
              <Slider
              indice_max={data.lambda.length}
              liste={data.lambda}
              nom={"λ"}
              unite={"m"}
              onSliderChange={handleSliderChange}
            />
            </div>
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'><Slider
              indice_max={data.theta.length}
              liste={data.theta}
              nom={"θ"}
              unite={"rad"}
              onSliderChange={handleSliderChange}
            />
            </div>
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'><Slider
              indice_max={data.a.length}
              liste={data.a}
              nom={"a"}
              unite={"m"}
              onSliderChange={handleSliderChange}
            />
            </div>
            {/* Si tu fais des boutons à gauche pour sélectionner le type de sorties à visualiser, faut rajouter une condition sur le bouton sélectionné ici */}
            <div className='slider'><Slider
              indice_max={data.d.length}
              liste={data.d}
              nom={"d"}
              unite={"m"}
              onSliderChange={handleSliderChange}
            />
            </div>
            </div>
          </CarteSaisie>
        </div>
      </div>
    );

}

export default ViewPlot;
