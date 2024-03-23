import {useState} from 'react';
import {Input, Switch, Grid} from "@nextui-org/react";

function SwitchTxt({grandeur, setGrandeur}){

    const [switchChecked, setSwitchChecked] = useState(false);

    return (
        <div className="switch-form">
            <h2>OEM</h2>
            <p>
                {grandeur} : <Switch bordered shadow size="xl" color="primary" checked={switchChecked} onChange={() => setSwitchChecked(!switchChecked)}/> 
                    {!switchChecked && <Input shadow={false} labelPlaceholder={grandeur} status="primary" />}
                    {switchChecked  && 
                            <Grid.Container gap={2} >
                                <Grid>
                                    <Input shadow={false} labelPlaceholder={grandeur +" minimale"}  status="primary" />
                                    <Input shadow={false} labelPlaceholder={grandeur +"maximale"} status="primary" />
                                </Grid>
                            </Grid.Container>
                        }
                    
            </p>
        </div>
    )

}