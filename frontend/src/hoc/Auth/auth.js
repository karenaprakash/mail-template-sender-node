/**
 * auth.js : it handles user is authenticated or not
 * 
 */
import React, { Component } from 'react';
import { auth } from '../../actions'
import { connect } from 'react-redux';

export default function(ComposedClass,reload){
    class AuthenticationCheck extends Component{
    
        state = {
            loading : true
        }

        componentWillMount () {
            this.props.dispatch(auth())
        }

        componentWillReceiveProps (nextProps) {
            this.setState({
                loading : false
            })

            if(!nextProps.admin.login.isAuth){
                if(reload){
                    this.props.history.push('/login')
                }
            }
        } 
    
        render(){
            if(this.state.loading){
                return <div className="loader"> Loading... </div>
            }
            return(
               <ComposedClass {...this.props} users={this.props.users} />
            )
        }
    }

    function mapStateToProps(state){
        console.log(state)
        return{
            admin: state.users
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)
}