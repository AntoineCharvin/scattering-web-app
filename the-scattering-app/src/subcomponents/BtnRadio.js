import React, { useState } from "react";
import { Radio } from "@nextui-org/react";

function BtnRadio({ fileData, setInputs }) {
  const [selectedValue, setSelectedValue] = useState(
    fileData.current.electromagnetic_wave.polarization
  );

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    setInputs((prevFileData) => ({
      ...prevFileData,
      electromagnetic_wave: {
        ...prevFileData.electromagnetic_wave,
        polarization: value
      }
    }));
  };

  return (
    <div className="btnRadio">
      <Radio.Group
        orientation="horizontal"
        label=""
        defaultValue={selectedValue}
        onChange={handleRadioChange}
      >
        <Radio value="1" description="Transverse electric">
          TE
        </Radio>
        <Radio value="2" description="Transverse magnetic">
          TM
        </Radio>
      </Radio.Group>
    </div>
  );
}

export default BtnRadio;
