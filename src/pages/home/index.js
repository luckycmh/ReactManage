import React,{useState, useEffect} from 'react';
import iconFont from "../../utils/iconfont"
import { createFromIconfontCN } from '@ant-design/icons';
import './index.less'
const IconFont = createFromIconfontCN({
    scriptUrl: iconFont,
});
export default function() {


    return (
        <div>
            <IconFont type="iconshouye" />
        </div>
    );
}
