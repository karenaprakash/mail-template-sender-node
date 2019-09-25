import React from 'react';
import  { Switch , Route  } from 'react-router-dom';
import Home from './components/Home/home';
import Users from './components/UsersView/users';
import User from  './components/UserView/user';
import FourOFour from  './components/FourOFour/fourofour';
import AddUser from './containers/Admin/add';
import EditUser from './containers/Admin/edit';




import Layout from './hoc/Layout/layout';


const Routes = () => {
    return (
        <Layout>
            <Switch> 
                <Route path="/users/add" exact  component={ AddUser } /> 
                <Route path="/users/:id/edit" exact  component={ EditUser } />          
                <Route path="/users/:id" exact component={ User } />
                <Route path="/users" exact component={ Users } />
                <Route path="/" exact  component={ Home } />
                <Route component={FourOFour}/>     
            </Switch>
        </Layout>
       
    );
};

export default Routes;