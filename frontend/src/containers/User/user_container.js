import React , { Component} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';
/*------- action which take data from database and send to email  --------*/

/*------- redux form --------*/
import { Field, reduxForm  } from 'redux-form';
/*------- action which all data to data base --------*/
import { getUser , clearUser ,sendMailWithData } from '../../actions'

import './user_container.css';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


class UserContainer extends Component {

    state = {
        isOpen : false,
        email : ''
    }

    componentWillUnmount() {
        //console.log('component will unmount')
        this.props.dispatch(clearUser())
    }

    componentWillMount(){
        this.props.dispatch(getUser(this.props.match.params.id))
    }

    shareBtnClickHandler = () => {
        this.setState({
            isOpen : true
        })
    }

   
    
    handleClose = () => {
        this.setState({
            isOpen : false
        })
      };

    handleTextFieldChange = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    sendMail = () =>{
        const id = this.props.data._id;
        const email = this.email.value;
        this.props.dispatch(sendMailWithData(id,email));
    }

    renderDialog = (data) => (
        data ? 
        <div>
            <Dialog open={this.state.isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Share Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                To share this details, please enter your email address here.
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                inputRef={el => this.email = el} 
                value={this.state.email}
                onChange={ (e) => this.handleTextFieldChange(e)} 
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={this.sendMail} color="primary">
                Send
                </Button>
            </DialogActions>
            </Dialog>
      </div>
        :null
    )

    renderTemplate = (data) => (
        data ? 
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid item xs={12} sm={8} md={8} lg={6}>
                        <Card className='card'>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                               { data.first_name + ' ' + data.last_name}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="h5">
                               Designation: {data.designation}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="h5">
                               Description: {data.description}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="h5">
                              Age: {data.age}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="h5">
                               Email: {data.email}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="h5">
                               Mobile: {data.mobile}
                            </Typography>
                            
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary"
                                onClick = { () => this.shareBtnClickHandler()}
                            >
                            Share
                            </Button>
                            <Link to='/users'>
                                <Button size="small" color="primary">
                                Back
                                </Button>
                            </Link>
                        </CardActions>
                        </Card>
                </Grid>
            </Grid>
            : null
    )

render(){
    const data = this.props.data;
    return (
        <div>
            {this.renderTemplate(data)}
            {this.renderDialog(data)}
        </div>
       
      );
}
 
}



function mapStateToProps(state){
    console.log(state)
    return {
        data: state.users.user,
    }
}


export default connect(mapStateToProps)(UserContainer);