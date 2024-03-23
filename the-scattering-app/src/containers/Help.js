import React from "react";

import CarteSaisie from "../subcomponents/CarteSaisie";
import { Button, Switch } from "@nextui-org/react";

import Welcome from "../assets/Help_section/Welcome.png";
import Methods from "../assets/Help_section/Methods.png";
import Outputs from "../assets/Help_section/Outputs.png";
import Inputs from "../assets/Help_section/Inputs.png";
import Plot from "../assets/Help_section/Plot.png";

import "../styles/Help.css";
import { im } from "mathjs";


function Help({ openHelp }) {
  return (
    <div className="help">
      <CarteSaisie>
        <div className="help-title">
          <h1>Help</h1>
          <Button
            color="gradient"
            size="xl"
            ghost
            rounded
            onPress={() => openHelp()}
          >
            Close
          </Button>
        </div>

        <div className="help-step">
          <div className="help-step0">
            <CarteSaisie>
              <h2>Step 0: Welcome</h2>
              <img src={Welcome} alt="Page_Welcome" style={{ width: "100%" }} />
              <ol>
                <li>
                  The "Welcome" component is the first thing you'll see when you
                  access our application. Its purpose is to greet you and
                  provide useful information to help you get acquainted with our
                  application.
                </li>
                <br></br>
                <li>
                  UM Logo: By clicking on the UM logo, you will be redirected to
                  our university's official website.
                </li>

                <br></br>
                <li>
                  "Documentation" Button: This button allows you to access our
                  comprehensive documentation. By clicking on it, you will be
                  able to download a PDF file that contains the theoretical
                  principles of physics used within our application. This
                  documentation provides detailed explanations, formulas, and
                  concepts to help you understand the underlying physics behind
                  our application's functionality.
                </li>
                <br></br>
                <li>
                  "Help" Button: This button provides a quick way to get
                  assistance if you encounter any difficulties or have questions
                  regarding the use of our application. By clicking on this
                  button, you'll be directed to a help section where you can
                  find answers to frequently asked questions
                </li>
                <br></br>
                <li>
                  "Start Simulation" Button: The "Start Simulation" button
                  initiates the simulation process within our application.
                </li>
              </ol>
            </CarteSaisie>
          </div>

          <div className="help-step1">
            <CarteSaisie>
              <h2>Step 1: Methods</h2>
              <img src={Methods} alt="Page_Methods" style={{ width: "100%" }} />
              <p>
                On the "Methods" page, you can explore different methods for
                simulating optical phenomena. However, please note that
                currently, only the FMM (Fourier Modal Method) simulation method
                is available for simulation. Each method has a brief description
                explaining how it works. Read the descriptions carefully to
                understand the basic principles of each simulation method.
              </p>
            </CarteSaisie>
          </div>

          <div className="help-step2">
            <CarteSaisie>
              <h2>Step 2: Outputs Selection</h2>
              <img src={Outputs} alt="Page_Outputs" style={{ width: "100%" }} />
              <p>
                On the "Outputs Selection" page, you can choose specific outputs
                to visualize. Options may include absorption spectra, field
                cartography, and intensity spectra.To proceed, please make sure
                to select at least one option by checking the corresponding
                checkboxes. Additionally, you can find informative explanations
                in collapsible panels on the right side of the page.
              </p>
            </CarteSaisie>
          </div>

          <div className="help-step3">
            <CarteSaisie>
              <h2>Step 3: Inputs</h2>
              <img src={Inputs} alt="Page_Inputs" style={{ width: "100%" }} />
              <p>
                The "Inputs" page allows you to configure the input parameters
                for optical simulations. Depending on the selected method,
                different parameters may be required, such as wavelength or
                geometric parameters. Fill in the appropriate fields with the
                desired values for the input parameters.
              </p>


              <p>
              <Switch bordered shadow size="xl" color="primary"/> 
              <br></br>
              The inputs page's switch enables you to make a specific parameter variable in the simulation.
              </p>


            </CarteSaisie>
          </div>

          <div className="help-step4">
            <CarteSaisie>
              <h2>Step 4: Plot</h2>
              <img src={Plot} alt="Page_Plot" style={{ width: "100%" }} />
              <p>
                The "Plot" page displays the results of optical simulations in
                the form of interactive graphs. Depending on the selected
                outputs, you can visualize graphs such as absorption spectra as
                a function of wavelength. Use the zoom and pan tools to explore
                the graphs in detail.Additionally, you have the option to
                download the graphics as PNG.
              </p>
            </CarteSaisie>
          </div>
        </div>
      </CarteSaisie>
    </div>
  );
}

export default Help;
