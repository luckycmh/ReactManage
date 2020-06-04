import React from 'react'
import CusBread from '../../../components/bread'
import {breadList} from "./data";
export default function() {
    return (
        <div className="stud-list">
            <CusBread bread={breadList}/>
        </div>
    )
}
