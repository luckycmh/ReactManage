import React from "react";
import Loadable from 'react-loadable';
export default (loader) => {
    return Loadable({
        loader,
        loading() {
            return <div></div>
        },
    });
}
