import React,{memo} from 'react'
import PropTypes from 'prop-types';
import {Breadcrumb} from "antd";

const  CusBread = memo(({bread}) => {
    return (
        <div className="bread-wrap">
            <Breadcrumb separator=">">
                <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
                {
                    bread.map(item => <Breadcrumb.Item href={item.href} key={item.name}>{item.name}</Breadcrumb.Item>)
                }
            </Breadcrumb>
        </div>
    )
})
CusBread.propTypes = {
    bread: PropTypes.array
};
export default CusBread
