import React,{useMemo} from 'react'
import CusBread from '../../../components/bread'
import {useQuery} from '../../../utils/tools'
import {checkStudBread} from './data'

export default function() {
    const query = useQuery();
    const id = query.get('id');
    const username = query.get('username');
    console.log(id,username);
    return (
        <div className="check-stud">
            <CusBread bread={useMemo(() => checkStudBread,[])}></CusBread>
        </div>
    )
}
