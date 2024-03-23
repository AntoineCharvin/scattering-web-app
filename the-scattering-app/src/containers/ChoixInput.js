import BtnInputVariable from '../subcomponents/BtnInputVariable';
import BtnRadio from '../subcomponents/BtnRadio';
import CarteSaisie from '../subcomponents/CarteSaisie';
import DragAndDrop from '../subcomponents/DragAndDrop';

import "../styles/ChoixInput.css";
import {Button} from "@nextui-org/react";
import { Collapse, Text, Grid } from "@nextui-org/react";
import graph from "../assets/abs.png";

function ChoixInput({pageCount, setPageCount}){

    const nextPage = () => setPageCount(pageCount + 1);
    const previousPage = () => setPageCount(pageCount - 1);

    return(

        <div className='choixInput'>
            
            <div className='formulaireIn'>

                <CarteSaisie >

                <div className='titre-dnd'>
                    <h1>Choix Input</h1>
                    <DragAndDrop/>
                </div>

                <div className='sousCartesInput'>
                

                    <CarteSaisie >
                        <h1>Electromagnetic Wave</h1>
                        <BtnInputVariable 
                          grandeur="λ" 
                          nom="Longueur d'onde λ" 
                          />

                        <p>Polarisation : <BtnRadio/></p>
                    </CarteSaisie>

                    <div className='cartemat'>
                    <CarteSaisie >
                        <div className='titre-dnd'>
                        <h1>Medium 1</h1><DragAndDrop/>
                        </div>
                    </CarteSaisie>
                    </div>



                    <CarteSaisie id="carteGeometry">
                        <h1>Geometry</h1>
                        <BtnInputVariable grandeur="θ" nom="Angle of incidence θ"/>
                        <BtnInputVariable grandeur="a" nom="Width a"/>
                        <BtnInputVariable grandeur="d" nom="Pattern lenght d"/>
                    </CarteSaisie>

                    <div className='cartemat'>
                    <CarteSaisie >
                        <div className='titre-dnd'>
                        <h1>Medium 2</h1><DragAndDrop/>
                        </div>
                    </CarteSaisie>
                    </div>

                </div>

                <div className='btn-start-input'>
                <Button.Group color ='gradient' size="xl" >
                      <Button ghost rounded onClick={()=> previousPage()}>BACK</Button>
                      <Button ghost rounded onClick={() => nextPage()}>START SIMULATION</Button>
                </Button.Group>
                </div>

                </CarteSaisie>



            </div>

            <div className='infoInput'>

                <CarteSaisie>
                    <h1>Info Input</h1>
                    <Grid.Container gap={4}>
      <Grid>
        <Collapse.Group splitted>
          <Collapse title="Spectre d'absorption">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>

            <img src={graph} alt="graph" style={{"width":"50%"}}/>

          </Collapse>
          <Collapse title="Cartographie des champs">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>

            <img src={graph} alt="graph" style={{"width":"50%"}}/>

            
          </Collapse>
          <Collapse title="Spectre des intensités">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>

            <img src={graph} alt="graph" style={{"width":"50%"}}/>


          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
                </CarteSaisie>

            </div>




        
                



            




           



        </div>

    )
}

export default ChoixInput