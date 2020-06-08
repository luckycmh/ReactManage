import React, {useMemo} from 'react'
import CusBread from '../../../components/bread'
import {addStudBread} from "./data";

export default function() {
    return (
        <div className="add-stud">
            <CusBread bread={useMemo(() => addStudBread,[])}/>
        </div>
    )
}
