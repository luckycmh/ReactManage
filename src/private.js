
import React from "react";
import {Route,Redirect,withRouter} from 'react-router-dom'
const PrivateRoute = (props) => {
   const isLogin = localStorage.getItem('annieUser');
    let { component: Component,path="",exact=false,strict=false} = props;
   return (
       isLogin ?
           <Route path={path} exact={exact} strict={strict} render={(props) => (<Component {...props}/>)}/> :
           <Redirect to="/login"/>
   )
};
export default withRouter(PrivateRoute);
