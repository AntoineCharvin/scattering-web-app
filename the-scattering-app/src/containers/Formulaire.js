// import React, { useEffect,useRef,useState } from 'react';

// import { Button } from "@nextui-org/react";

// import DragAndDrop from '../subcomponents/DragAndDrop';
// import { e } from 'mathjs';
// const Formulaire = ({ pageCount, setPageCount, handleInputChange, handleSubmit, fileData }) => {
  
//   const nextPage = () => setPageCount(pageCount + 1);
//   const previousPage = () => setPageCount(pageCount - 1);
//   const [refresh, setRefresh] = useState(false);

//         // const lambdaInputRef = useRef(null);
//         // const muInputRef = useRef(null);
//         // const thetaInputRef = useRef(null);

//         const [inputs, setInputs] = useState({});

//         const handleFileUpload = (file) => {
//           const reader = new FileReader();
//           reader.onload = (event) => {
//             const jsonData = JSON.parse(event.target.result);
//             setInputs(jsonData);
//           };
//           reader.readAsText(file);
//         };
      
//         useEffect(() => {
//           // Mettre à jour les inputs avec les données du fichier lorsque inputs ou fileData change
//           setInputs(fileData);
//         }, [fileData]);
      
//         const handleChange = (event) => {
//           const { name, value } = event.target;
//           setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
//         };
  


  
//   // useEffect(() => {
//   //   if (lambdaInputRef.current && fileData.electromagnetic_wave.lambda) {
//   //     lambdaInputRef.current.value = fileData.electromagnetic_wave.lambda;
//   //   }
//   //   if (muInputRef.current && fileData.material.mu) {
//   //     muInputRef.current.value = fileData.material.mu;
//   //   }
//   //   if (thetaInputRef.current && fileData.geometry.theta) {
//   //     thetaInputRef.current.value = fileData.geometry.theta;
//   //   }
//   // }, [fileData.electromagnetic_wave.lambda, fileData.material.mu, fileData.geometry.theta, refresh]);



//   // const formDataRef = useRef({
//   //   name: '',
//   //   age: '',
//   //   gender: '',
//   //   // ...
//   // });

//   // // Fonction pour mettre à jour les valeurs du formulaire
//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   fileData.current[name] = value;
//   // };

//   // // Fonction pour gérer la soumission du formulaire
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const jsonData = JSON.stringify(file.current);
//   //   alert(jsonData);
//   // };
//               // const handleFileUpload = (file) => {
//               //   const reader = new FileReader();
//               //   reader.onload = (event) => {
//               //     const jsonData = JSON.parse(event.target.result);
//               //     if (jsonData && jsonData.electromagnetic_wave && jsonData.electromagnetic_wave.lambda) {
//               //       const updatedFileData = { ...fileData };
//               //       updatedFileData.electromagnetic_wave.lambda = jsonData.electromagnetic_wave.lambda;
//               //       handleInputChange({ target: { name: 'electromagnetic_wave.lambda', value: jsonData.electromagnetic_wave.lambda } }, updatedFileData);
//               //       setRefresh((prevRefresh) => !prevRefresh);
//               //     }
//               //     if (jsonData && jsonData.material && jsonData.material.mu) {
//               //       const updatedFileData = { ...fileData };
//               //       updatedFileData.material.mu = jsonData.material.mu;
//               //       handleInputChange({ target: { name: 'material.mu', value: jsonData.material.mu } }, updatedFileData);
//               //       setRefresh((prevRefresh) => prevRefresh);
//               //     }
//               //     if (jsonData && jsonData.geometry && jsonData.geometry.theta) {
//               //       const updatedFileData = { ...fileData };
//               //       updatedFileData.geometry.theta = jsonData.geometry.theta;
//               //       handleInputChange({ target: { name: 'geometry.theta', value: jsonData.geometry.theta } }, updatedFileData);
//               //       setRefresh((prevRefresh) => prevRefresh);
//               //     }
//               //   };
//               //   reader.readAsText(file);
//               // };


//   return (
    
    
//     <form onSubmit={handleSubmit}>
// {/* {/*               
//               <label>
//                 Lambda:
//                 <input
//                   type="text"
//                   name="electromagnetic_wave.lambda"
//                   ref={inputsRefs}
//                   onChange={(e)=>handleInputChange(e,fileData)}
//                 />
//               </label> */}

// <label htmlFor="lambdaInput">
//         Lambda:
//         <input
//           type="text"
//           id="lambdaInput"
//           name="electromagnetic_wave.lambda"
//           value={inputs['electromagnetic_wave.lambda'] || ''}
//           onChange={handleChange}
//         />
//       </label>

//       <label htmlFor="formulaInput">
//         Formula:
//         <input
//           type="text"
//           id="formulaInput"
//           name="material.formula"
//           ref={(ref) => (inputsRefs.current[2].ref = ref)}
//           onChange={(e) => handleInputChange(e, fileData)}
//         />
//       </label>


//               {/* <label>
//                 µ:
//                 <input
//                   type="text"
//                   name="material.mu"
//                   ref={inputsRefs}
//                   onChange={(e)=>handleInputChange(e,fileData)}
//                 />
//               </label>
//               <label>
//                 Theta:
//                 <input
//                   type="text"
//                   name="geometry.theta"
//                   ref={inputsRefs}
//                   onChange={(e)=>handleInputChange(e,fileData)}
//                 />
//               </label> */}
//       <br />
//       <DragAndDrop handleFileUpload={handleFileUpload} />
//       <br />
//       <Button.Group color ='gradient' size="xl" >
//                       <Button ghost rounded onPress={()=> previousPage()}>BACK</Button>
//                       <Button ghost rounded onPress={() => nextPage()}>START SIMULATION</Button>
//                 </Button.Group>

//       {/* <label>
//         Age:
//         <input
//           type="text"
//           name="age"
//           defaultValue={fileData.current.age}
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <label>
//         Gender:
//         <input
//           type="radio"
//           name="gender"
//           value="male"
//           defaultChecked={fileData.current.gender === 'male'}
//           onChange={handleInputChange}
//         />{' '}
//         Male
//         <input
//           type="radio"
//           name="gender"
//           value="female"
//           defaultChecked={fileData.current.gender === 'female'}
//           onChange={handleInputChange}
//         />{' '}
//         Female
//       </label>
//       <br /> */}
//       {/* Ajoutez d'autres champs de formulaire selon vos besoins */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Formulaire;
