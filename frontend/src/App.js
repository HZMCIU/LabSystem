import React, { Component } from 'react'
import LoginForm from './component/LoginForm'
import RegisterForm from './component/RegisterForm';
import StudentDashboard from './component/student-dashboard/index';
import TeacherDashboard from './component/teacher-dashboard/index'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Test from './Test'

class App extends Component {
    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <LoginForm />
                            
                        </Route>
                        <Route exact path="/register">
                            <RegisterForm />
                        </Route>
                        <Route path="/student_dashboard">
                            <StudentDashboard />
                        </Route>
                        <Route path="/teacher_dashboard">
                            <TeacherDashboard />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
export default App;