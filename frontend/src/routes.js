import React from 'react';
import  { Switch , Route  } from 'react-router-dom';
import Home from './components/Home/home';
import Users from './components/UsersView/users';
import User from  './components/UserView/user';
import FourOFour from  './components/FourOFour/fourofour';
import AddUser from './containers/Admin/add';
import EditUser from './containers/Admin/edit';
import UserContainer from './containers/User/user_container.js';
import Login from './containers/Login/login';
import Signup from './containers/Signup/signup';
import Auth from './hoc/Auth/auth';
import Logout from './components/Logout/logout';


import Layout from './hoc/Layout/layout';


const Routes = () => {
    return (
        <Layout>
            <Switch> 
                <Route path="/signup" exact  component={ Auth(Signup,true) } />
                <Route path="/logout" exact  component={ Auth(Logout,true) } />
                <Route path="/login" exact  component={ Auth(Login,false) } />
                <Route path="/users/add" exact  component={ Auth(AddUser,true) } /> 
                <Route path="/users/:id/edit" exact  component={ Auth(EditUser,true) } />          
                <Route path="/users/:id" exact component={ Auth(UserContainer,true) } />
                <Route path="/users" exact component={ Auth(Users,true) } />
                <Route path="/" exact  component={ Auth(Home,null) } />
                <Route component={FourOFour}/>     
            </Switch>
        </Layout>
       
    );
};

export default Routes;