import React from 'react';
import Index from "./DropDownButton/index";
import TablePatient from "./Table/index"
import ButtonCommunication from './ButtonCommunication/index'

const Patient = () => {
    let count = 1;
    let name = 'Болезнь№234';
    let result = 'blablabla';
    let diagnosis = "Болен очень сильно";

    return (
        <div>
            <Index/>
            <TablePatient id={count++} name={name} result={result} diagnosis={diagnosis}/>
            <ButtonCommunication/>
        </div>
    );
};

export default Patient;
