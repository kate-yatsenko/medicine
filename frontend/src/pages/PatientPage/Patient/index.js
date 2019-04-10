import React from 'react';
import Index from "./DropDownButton/index";
import TablePatient from "./Table/index"
import ButtonCommunication from './ButtonCommunication/index'

const Patient = () => {
    let count=1;
    let name ="Vasya";
    let adress = "Gagarina";
    let money = 123+'$';

    return (
        <div>
            <Index/>
            <TablePatient id={count++} name={name} money={money} address={adress}/>
            <ButtonCommunication/>
        </div>
    );
};

export default Patient;
