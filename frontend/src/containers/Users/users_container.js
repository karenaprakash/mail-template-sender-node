   /**
    * users : all users
    */
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import { getUsers , deleteUser , sendMailWithData} from '../../actions';
    import moment from 'moment-js'; 
    import { Link } from 'react-router-dom';
    import {Grid} from '@material-ui/core';
    import { makeStyles } from '@material-ui/core/styles';
    import Table from '@material-ui/core/Table';
    import TableBody from '@material-ui/core/TableBody';
    import TableCell from '@material-ui/core/TableCell';
    import TableHead from '@material-ui/core/TableHead';
    import TableRow from '@material-ui/core/TableRow';
    import Paper from '@material-ui/core/Paper';
    import DeleteIcon from '@material-ui/icons/Delete';
    import SendIcon from '@material-ui/icons/Send';
    import EditIcon from '@material-ui/icons/Edit';
    import VisibilityIcon from '@material-ui/icons/Visibility'; 
    import './users_container.css';

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
        const email = 'prakash.raoinfotech@gmail.com'
        this.props.dispatch(sendMailWithData(id,email))
    }
    componentWillReceiveProps(nextProps){
        //onsole.log(nextProps.data.user)
        if(nextProps.data.user){
            this.props.dispatch(getUsers(5,0,'desc'))
        }
    }

   showUsers = (data) => (
        data.users ? 
        data.users.map( item  => (
        <TableRow key={item._id}>
        <TableCell component="th" scope="row">
            {item.first_name + " " + item.last_name}
        </TableCell>
        <TableCell>{item.designation}</TableCell>
        <TableCell align="center"><Link to={`/users/${item._id}/edit`}><EditIcon/></Link></TableCell>
        <TableCell align="center"><Link to={`/users/${item._id}`}><VisibilityIcon/></Link></TableCell>
        <TableCell align="center"
        onClick={() => this.deleteUser(`${item._id}`)}
        ><DeleteIcon/></TableCell>
        <TableCell align="center"
        onClick={() => this.sendMail(`${item._id}`)}
        ><SendIcon/></TableCell>

        </TableRow>
        ))
        :null
   )
       render() {
           let data = this.props.data;
   
   
           return (
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid  item lg={10} xs={10} sm={8} md={8} >
                    <Paper className='root'>
                    <Table className='table'>
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">View</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Send</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                             {this.showUsers(data)}
                        </TableBody>
                    </Table>
                    </Paper>
                </Grid>
           
            </Grid>
              
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


  