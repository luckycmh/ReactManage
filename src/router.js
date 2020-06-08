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
import Home from './pages/home'
// 教务中心模块start
import TeachCenter from './pages/teachCenter/Index'
import StudList from './pages/teachCenter/student/StudList'
import AddStud from './pages/teachCenter/student/AddStud'
//教务中心模块end

import Modals from "./pages/ui/modals";
import Loading from "./pages/ui/loading"
import Notification from "./pages/ui/notification";
import Message from './pages/ui/message'
import Gallery from './pages/ui/gallery'
import FormLogin from './pages/form/Login'
import Table from './pages/table/Table'
import Tab from './pages/ui/tabs'

import NotFound from './pages/notFound'

export default class RouterConfig extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/main" component={Home}/>
                                <Route path="/admin/teachCenter" render={() =>
                                    <TeachCenter>
                                        <Switch>
                                            <Route exact path="/admin/teachCenter/stud" component={StudList}/>
                                            <Route path="/admin/teachCenter/stud/addStud" component={AddStud}/>
                                            <Route component={NotFound}/>
                                        </Switch>
                                    </TeachCenter>
                                }/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route exact path="/" render={() => <Redirect to="/admin/main"/>}/>
                </App>
            </Router>
        )
    }
}
