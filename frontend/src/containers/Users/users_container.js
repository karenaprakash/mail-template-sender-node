   /**
    * users : all users
    */
   import React, { Component } from 'react';
   import { connect } from 'react-redux';
   import { getUsers , deleteUser , sendMailWithData} from '../../actions';
   import moment from 'moment-js'; 
   import { Link } from 'react-router-dom';

   
   class users_container extends Component {
   
   componentWillMount(){
       //console.log(this.props)
       this.props.dispatch(getUsers(5,0,'desc'))
   }

   deleteUser = (id) => {
        this.props.dispatch(deleteUser(id))
    }
    sendMail = (id) => {
        alert(id)
        this.props.dispatch(sendMailWithData(id))
    }
    componentWillReceiveProps(nextProps){
        //onsole.log(nextProps.data.user)
        if(nextProps.data.user){
            this.props.dispatch(getUsers(5,0,'desc'))
        }
    }

   showUsers = (data) => (
       data.users ?   
           data.users.map(item => (
               <tr key={item._id}>
                   <td>
                     {item.first_name + ' ' + item.last_name}
                   </td>
                   <td>{item.designation}</td>
                 {/*  <td>{ moment(item.createAt).format("MM/DD/YY") }</td> */}
                   <td><Link to={`/users/${item._id}/edit`}>E</Link></td>
                   <td><Link to={`/users/${item._id}`}>V</Link></td>
                   <td onClick={() => this.deleteUser(`${item._id}`)}>D</td>
                   <td onClick={() => this.sendMail(`${item._id}`)}>S</td>
               </tr>
           ))
       : null
   )
       render() {
           let data = this.props.data;
   
   
           return (
               <div className="user_posts">
               <h4>Users:</h4>
                  <table>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Designation</th>
                              <th>Edit</th>
                              <th>View</th>
                              <th>Delete</th>
                              <th>Send</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.showUsers(data)}
                      </tbody>
                  </table>
               </div>
           )
       }
   }
   
   
   function mapStateToProps(state){
      console.log(state)
       return{
           data : state.users
       }
   }
   
   
   export default connect(mapStateToProps)(users_container)


  