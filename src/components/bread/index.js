import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {Breadcrumb} from "antd";

const CusBread = memo(({bread}) => {
    return (
        <div className="bread-wrap">
            <Breadcrumb separator=">">
                <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
                {
                    bread.map((item, index) =>
                        <Breadcrumb.Item key={index}>
                            <Link to={item.href}>
                                {item.name}
                            </Link>
                        </Breadcrumb.Item>
                    )
                }
            </Breadcrumb>
        </div>
    )
})
CusBread.propTypes = {
    bread: PropTypes.array
};
export default CusBread
