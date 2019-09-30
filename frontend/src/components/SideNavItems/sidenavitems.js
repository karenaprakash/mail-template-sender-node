   /**
    * sidenavitems : items for side navbar
    * 
    */
import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';


const SideNavItems = ({admin,onHideNav}) => {

    const items = [
        {
            type : 'navItem',
            icon : 'home',
            text : 'Home',
            link : '/',
            restricted : false
        },
        {
            type : 'navItem',
            icon : 'file-text-o',
            text : 'Users',
            link : '/users',
            restricted : true
        },
        {
            type : 'navItem',
            icon : 'plus',
            text : 'Add User',
            link : '/users/add',
            restricted : true
        },
        {
            type : 'navItem',
            icon : 'lock',
            text : 'Login',
            link : '/login',
            excluded : true
        },
        {
            type : 'navItem',
            icon : 'plus',
            text : 'Signup Admin',
            link : '/signup',
            restricted : true
        },
        {
            type : 'navItem',
            icon : 'lock',
            text : 'Logout',
            link : '/logout',
            restricted : true
        },

    ]

    const element = (item,i) => (
        <div key={i} className={item.type} onClick={onHideNav}>
            <Link to={item.link}>
                    <FontAwesome name={item.icon} />
                    {item.text}
            </Link>
        </div> 
    )
    
    
    const showItems = () => (
        admin.login ? 
        items.map((item,i)=>{
            //console.log(!item.restricted)
                if(admin.login.isAuth){
                    return !item.excluded ?  element(item,i) : null 
                }else{
                    return !item.restricted ? element(item,i) : null 
                }
        }):
        null
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

function mapStateToProps(state){
    return{
        admin : state.users
    }
}

export default connect(mapStateToProps)(SideNavItems);