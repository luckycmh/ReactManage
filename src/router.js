import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import App from './App'
import Login from './pages/login'
import Admin from "./Admin";
import Buttons from './pages/ui/buttons'
import Modals from "./pages/ui/modals";
import Loading from "./pages/ui/loading"
import Notification from "./pages/ui/notification";
import Message from './pages/ui/message'
import Tab from './pages/ui/tabs'

import NotFound from './pages/notFound'
export default class RouterConfig extends React.Component{
    render() {
        return(
            <Router>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons}/>
                                <Route path="/admin/ui/modals" component={Modals}/>
                                <Route path="/admin/ui/loadings" component={Loading}/>
                                <Route path="/admin/ui/notification" component={Notification}/>
                                <Route path="/admin/ui/messages" component={Message}/>
                                <Route path="/admin/ui/tabs" component={Tab}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route exact path="/" render={() => <Redirect to="/admin/ui/buttons"/>} />
                </App>
            </Router>
        )
    }
}
