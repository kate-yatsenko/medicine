import React from 'react';
import ListPatients from "./ListPatient";
import SearchPatient from "./SearchPatient";
import PaginationPatient from "./Pagination";
import './style.css';


const Doctor = () => {
    return (
        <div className="SearchAndPatient">
            <SearchPatient />
            <ListPatients />
            <PaginationPatient />
        </div>
    );
};

export default Doctor;


