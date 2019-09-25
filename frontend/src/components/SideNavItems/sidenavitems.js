   /**
    * sidenavitems : items for side navbar
    * 
    */
import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';


const SideNavItems = ({user,onHideNav}) => {

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
        }
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
       
        items.map((item,i)=>{
         
                return element(item,i) 
        
        
        }) 
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

function mapStateToProps(state){
    return{
        user : state.user
    }
}

export default connect(mapStateToProps)(SideNavItems);