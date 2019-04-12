import {Pagination} from "antd";
import React from "react";
import './style.css'


const PaginationPatient = () => {

    return (
        <div className="pagination">
            <Pagination defaultCurrent={1} total={500} />
        </div>

    );
};

export default PaginationPatient;