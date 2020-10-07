import React, {Component} from 'react';
import PrivateRoute from './components/PrivateRoute'
import {Route, Switch} from 'react-router-dom'

import Index from './routes/Index/index'
import './App.css'
import './assets/font/iconfont.css'
import Home from './Home';
import Login from "./routes/Login"
import Register from "./routes/Register";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/index" component={Home}/>

                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <PrivateRoute path='/' component={Index}/>
                </Switch>
            </div>
        )
    }
}

export default App;
