import React from 'react';
import {Input} from 'antd';

const SearchPatient = () => {

    const Search = Input.Search;
    return (
        <div>
            <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton
            />
        </div>
    );
};

export default SearchPatient;


