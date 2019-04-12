import {Collapse} from "antd";
import React from "react";
import TablePatient from '../../../../PatientPage/Patient/Table/index';

const Patient = () => {

    const Panel = Collapse.Panel;
    let namePatient = 'Петров Андрей';
    let count = 1;
    let name = "Болезнь №231";
    let result = 'blablabla';
    let diagnosis = "Болен очень сильно";
    function callback(key) {
        console.log(key);
    }

    return (

        <Collapse onChange={callback}>
            <Panel header={namePatient} key='1'>
                <TablePatient id={count++} name={name} result={result} diagnosis={diagnosis}/>
            </Panel>
        </Collapse>

    );
};

export default Patient;