import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import loadable from './utils/loadable'
import PrivateRoute from "./private";
const App = loadable(() => import('./App'));
const Admin = loadable(() => import('./Admin'));
const Login = loadable(() => import('./pages/login'));
const Home = loadable(() => import('./pages/home'));

// 教务中心模块start

// 学员列表
const StudList = loadable(() => import('./pages/teachCenter/student/StudList'));
// 添加学员
const AddStud = loadable(() => import('./pages/teachCenter/student/AddStud'));
// 查看学员
const CheckStud = loadable(()=> import('./pages/teachCenter/student/CheckStud'));
// 编辑学员
const EditStud = loadable(() => import('./pages/teachCenter/student/EditStud'));
// 班级列表
const GradeList = loadable(()=>import('./pages/teachCenter/grade/GradeList'));
// 新建班级
const AddGrade = loadable(() => import('./pages/teachCenter/grade/AddGrade'));
// 班级详情
const CheckGrade = loadable(() => import('./pages/teachCenter/grade/CheckGrade'));

//教务中心模块end

//线上阅读馆开始

const ReadList = loadable(() => import('./pages/lineRead/readManage/ReadList'));
//线上阅读馆结束

const NotFound = loadable(() => import('./pages/notFound'));
export default class RouterConfig extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <PrivateRoute path="/admin/main" component={Home}/>
                                <PrivateRoute exact path="/admin/teachCenter/stud" component={StudList}/>
                                <PrivateRoute path="/admin/teachCenter/stud/addStud" component={AddStud}/>
                                <PrivateRoute path="/admin/teachCenter/stud/checkStud" component={CheckStud}/>
                                <PrivateRoute path="/admin/teachCenter/stud/editStud" component={EditStud}/>
                                <PrivateRoute exact path="/admin/teachCenter/grade" component={GradeList}/>
                                <PrivateRoute path="/admin/teachCenter/grade/addGrade" component={AddGrade}/>
                                <PrivateRoute path="/admin/teachCenter/grade/checkGrade" component={CheckGrade}/>
                                <PrivateRoute exact path="/admin/lineRead/readManage" component={ReadList}/>
                                <PrivateRoute component={NotFound}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route exact path="/" render={() => <Redirect to="/admin/main"/>}/>
                </App>
            </Router>
        )
    }
}
