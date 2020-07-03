import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Cookies from 'js-cookie'
import App from './App'
import Login from './pages/login'
import Admin from "./Admin";
import Home from './pages/home'
// 教务中心模块start

// 学员列表
import StudList from './pages/teachCenter/student/StudList'
// 添加学员
import AddStud from './pages/teachCenter/student/AddStud'
// 查看学员
import CheckStud from "./pages/teachCenter/student/CheckStud";
// 编辑学员
import EditStud from "./pages/teachCenter/student/EditStud"
// 班级列表
import GradeList from './pages/teachCenter/grade/GradeList'
// 新建班级
import AddGrade from './pages/teachCenter/grade/AddGrade'
// 班级详情
import CheckGrade from "./pages/teachCenter/grade/CheckGrade";

//教务中心模块end

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
                                <Route exact path="/admin/teachCenter/stud" component={StudList}/>
                                <Route path="/admin/teachCenter/stud/addStud" component={AddStud}/>
                                <Route path="/admin/teachCenter/stud/checkStud" component={CheckStud}/>
                                <Route path="/admin/teachCenter/stud/editStud" component={EditStud}/>
                                <Route exact path="/admin/teachCenter/grade" component={GradeList}/>
                                <Route path="/admin/teachCenter/grade/addGrade" component={AddGrade}/>
                                <Route path="/admin/teachCenter/grade/checkGrade" component={CheckGrade}/>
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
