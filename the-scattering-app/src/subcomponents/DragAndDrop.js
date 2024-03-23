// import '../styles/DragAndDrop.css';
// import { useRef, useState } from "react";

// function HandleFiles({files,handleInputChange}) {
//   const reader = new FileReader();

//   reader.onload = function (event) {
//     const fileContent = event.target.result;
//     const fileName = files[0].name;
//     const fileExtension = fileName.split('.').pop().toLowerCase();
//     if (fileExtension === 'json') {
//       try {
//         const jsonData = JSON.parse(fileContent);
//         handleInputChange(jsonData); // Mettre à jour l'état fileData du composant parent
//         console.log(jsonData);
//       } catch (error) {
//         alert("Le fichier n'est pas un fichier JSON valide.");
//       }
//     } else if (fileExtension === 'csv') {
//       // Gérer le fichier CSV
//       console.log(fileContent);
//       console.log(typeof fileContent);
//     } else {
//       alert("Le format du fichier n'est pas pris en charge. Veuillez sélectionner un fichier JSON ou CSV.");
//     }
//   };

//   reader.readAsText(files[0]);
// }
  






// function DragAndDrop({ setFileData }) {
//   const [dragActive, setDragActive] = useState(false);
//   const inputRef = useRef(null);

//   const handleDrag = function (event) {
//     event.preventDefault();
//     event.stopPropagation();
//     if (event.type === "dragenter" || event.type === "dragover") {
//       setDragActive(true);
//     } else if (event.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = function (event) {
//     event.preventDefault();
//     event.stopPropagation();
//     setDragActive(false);
//     if (event.dataTransfer.files && event.dataTransfer.files[0]) {
//       HandleFiles(event.dataTransfer.files, setFileData); // Passer setFileData pour mettre à jour l'état fileData du composant parent
//     }
//   };

//   const handleChange = function (event) {
//     event.preventDefault();
//     if (event.target.files && event.target.files[0]) {
//       HandleFiles(event.target.files, setFileData); // Passer setFileData pour mettre à jour l'état fileData du composant parent
//     }
//   };

//   const onButtonClick = (e) => {
//     e.preventDefault();
//     inputRef.current.click();
//   };

//   return (
//     <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(event) => event.preventDefault()}>
//       <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
//       <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
//         <div>
//           <button className="upload-button" onClick={onButtonClick}>Upload</button>
//         </div>
//       </label>
//       {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
//     </form>
//   );
// }

// export default DragAndDrop;


// DragAndDrop.js

import React, { useRef } from 'react';

const DragAndDrop = ({ handleFileUpload }) => {
  const dropAreaRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    dropAreaRef.current.classList.add('drag-over');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    dropAreaRef.current.classList.remove('drag-over');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dropAreaRef.current.classList.remove('drag-over');

    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  return (
    <div
      className="drop-area"
      ref={dropAreaRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag and drop a JSON file here</p>
    </div>
  );
};

export default DragAndDrop;

