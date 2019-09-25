import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {reset} from 'redux-form';
import {Grid} from '@material-ui/core';

/*------- connect react with redux --------*/
import { connect } from 'react-redux';

/*------- action which all data to data base --------*/
import { sendMail } from '../../actions'
/*------- redux form --------*/
import { Field, reduxForm  } from 'redux-form';

class SendMail extends Component {

   state = {
       mailSent : null ,
       isSubmited : false
   }
    //PRISTINE / DIRTY // TOUCHED / ERROR : events in redux-form 

 /*------- renderInputEmailField  --------*/
 renderInputEmailField(field){
        //    console.log(field)
         const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
         return (
             <div className={className}>
                 <label>{field.myLabel}</label>
                 <input type="email" {...field.input}   onChange = {field.input.onChange}  />
                 <div className="error">
                     {field.meta.touched? field.meta.error:''}
                 </div>
             </div>
         )
     }

/*------- renderInputField  --------*/
    renderInputField(field){
       //    console.log(field)
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return (
            <div className={className}>
                <label>{field.myLabel}</label>
                <input type="text" {...field.input}   onChange = {field.input.onChange}  />
                <div className="error">
                    {field.meta.touched? field.meta.error:''}
                </div>
            </div>
        )
    }


/*------- renderTextareaField  --------*/
    renderTextareaField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return(
            <div className={className}>
                <label>{field.myLabel}</label>
                <textarea 
                    {...field.input}
                ></textarea>
                 <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

  
/*------- onSubmit() : runs on submit  --------*/
    onSubmit(values){       
        //console.log(values)
        this.setState({
            isSubmited : true
        })
        values.from = "prakash.raoinfotech@gmail.com"
         // console.log(values)
          this.props.dispatch(sendMail(values));
    }


    render(){

       console.log(this.props);

        return(
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid item xs={1} md={2} lg={3}>
                </Grid>
                <Grid item xs={10} md={8} lg={6}>
                <div className="Form">                  
                <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))} method="POST">

                     <Field
                        myLabel="To Email"
                        name="to"
                        component={this.renderInputEmailField}
                    />

                    <Field
                        myLabel="Enter Subject"
                        name="subject"
                        component={this.renderInputField}
                    />

                    <Field
                        myLabel="Enter text"
                        name="text"
                        component={this.renderTextareaField}
                    />
                
                    <button type="submit">Submit</button>
                
                </form>
            </div>
                </Grid>
                <Grid item xs={1} md={2} lg={3}>
                </Grid>
                
            </Grid>
          
        )
    }
}
/*------- validate() : validates our form  --------*/


function validate(values){
   // console.log(values)
    const errors = {};

    
    if(!values.to){
        errors.to = "The to_email is empty"
    }

    if(!values.subject){
        errors.subject = "The subject is empty"
    }

    if(!values.text){
        errors.text = "The text is empty"
    }

    return errors;
}
    /*------- it returns messages when action is called and state going to change  --------*/
   
function mapStateToProps(state){
   // console.log(state)
    
    let mail_value = {}
    mail_value =  {
        from : 'prakash.raoinfotech@gmail.com',
        to : '',
        subject : '',
        text : ''
    }

    return {
        mail: state.mail,
        initialValues : mail_value,
    }
}

    /*------- reduxForm : connects redux-form with react form   --------*/

 export default connect( mapStateToProps, {sendMail})(
    reduxForm({
        validate,
        form: 'sendMail',
        enableReinitialize : true,
    })(SendMail)
 );