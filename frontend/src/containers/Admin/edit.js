import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid} from '@material-ui/core';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';

/*------- action which all data to data base --------*/
import { getUser , clearUser , updateUser , deleteUser } from '../../actions'
/*------- redux form --------*/
import { Field, reduxForm  } from 'redux-form';

class Edit extends Component {
/*
    state = {
        bookImage : null,
        bookName : '',
        imageUrl : '',
        isSubmited : false,
        bookData : null,
        loader : false,
        show : true
    }
    
*/
    //PRISTINE / DIRTY // TOUCHED / ERROR : events in redux-form 

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
 

/*------- renderFileInputField  --------*/
/*handleFileChange = (event) => {
  //  console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
        this.setState({
          imageUrl : URL.createObjectURL(event.target.files[0]),
          show : true
        });
      }

  //  console.log(this.state.bookImage)
     if(event.target.file){
        this.setState({
            bookImage : event.target.files[0],
            bookName : event.target.files[0].name
        })
     } 
    
}



renderFileInputField = (field) => {
    if(field.input.value){
       // console.log(field.input.value.length)
    }
    const fileInputKey = field.input.value ? this.state.bookName : +new Date();  // key = {fileInputKey}
   // console.log(fileInputKey)
    const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
    //console.log(field.input.value);

    return (
        <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            key={fileInputKey}
            type="file"   
            onChange = {field.input.onChange} 
            />
            <div className="error">
                {field.meta.touched ? field.meta.error:''}
            </div>
        </div>
    )
}
*/
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

    /*------- renderTextareaField  --------*/
    renderNumberInputField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return(
            <div className={className}>
                <label>{field.myLabel}</label>
                <input 
                type="number"  
                {...field.input}   
                onChange = {field.input.onChange} 
                />
                 <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }
    

    /*------- renderSelectField  --------*/

    handleSelectChange = (event) => {
        //console.log(event.target.value)
    }

    renderSelectField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return(
            <div className={className}>
                <label>{field.myLabel}</label>

                
               <select  {...field.input}   onChange = {field.input.onChange}  >
                    {field.children}
               </select>

                 <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }







  
/*------- onSubmit() : runs on submit  --------*/
    onSubmit(values){       
         // console.log(values)

          this.props.dispatch(updateUser(values));
      
         
    }

    componentWillUnmount() {
        //console.log('component will unmount')

        this.props.dispatch(clearUser())
    }

    componentWillMount(){
       // console.log('component will mount')
      //  console.log(this.props.match.params.id)
        this.props.dispatch(getUser(this.props.match.params.id))
    }

    componentDidUpdate(){
      //  console.log('component did update')
    }

    componentWillUpdate(){
     //  console.log('component will update')
    }

    shouldComponentUpdate(){
       // console.log('component should update')
        return true
    }
    
    componentWillReceiveProps(nextProps){
      //  console.log('component will reciveProps')
    }
  
    render(){

       //console.log(this.props);

        return(
            <div>

            <div className="top">
                <h3>Edit User</h3>
                <Link to="/users">Back</Link>
            </div>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Grid item xs={12} sm={8} md={8} lg={6}>
                    <div className="Form">                    
                        <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))} method="POST">

                            <Field
                                myLabel="Enter First Name"
                                name="first_name"
                                component={this.renderInputField}
                            />

                            <Field
                                myLabel="Enter Last Name"
                                name="last_name"
                                component={this.renderInputField}
                            />
                            
                            <Field
                                myLabel="Enter Email"
                                name="email"
                                component={this.renderInputEmailField}
                            />

                            <Field
                                myLabel="Enter Mobile"
                                name="mobile"
                                component={this.renderNumberInputField}
                            />

                            <Field
                                myLabel="Enter Designation"
                                name="designation"
                                component={this.renderInputField}
                            />

                            <Field
                                myLabel="Enter age"
                                name="age"
                                component={this.renderNumberInputField}
                            />

                            <Field
                                myLabel="Enter Description"
                                name="description"
                                component={this.renderTextareaField}
                            />

                        
                            <button type="submit">Submit</button>

                        </form>
                    </div>
                </Grid>
            </Grid>
            </div>          
        )
    }
}
/*------- validate() : validates our form  --------*/


function validate(values){
   // console.log(values)
    const errors = {};

    if(!values.first_name){
        errors.first_name = "The first name is empty"
    }

    if(!values.last_name){
        errors.last_name = "The last name is empty"
    }

    if(!values.email){
        errors.email = "The email is empty"
    }

    if(!values.mobile){
        errors.mobile = "The mobile is empty"
    }

    if(!values.designation){
        errors.designation = "The designation is empty"
    }

    if(!values.age){
        errors.age = "The age is empty"
    }

    if(!values.description){
        errors.description = "The description is empty"
    }

    return errors;
}
    /*------- it returns messages when action is called and state going to change  --------*/
   
function mapStateToProps(state){
   // console.log(state)
    
    const users = state.users
    let user_value = {}
    const length = Object.entries(users).length;
    if( length !== 0 && typeof(users.user) === "object" && users.user !== null ){
        const user = state.users.user
        user_value =  {
            _id : user._id,
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email,
            mobile : user.mobile,
            description : user.description,
            designation : user.designation,
            age : user.age
        }
    }
    
    return {
        data: state.users,
        initialValues : user_value,
    }
}

    /*------- reduxForm : connects redux-form with react form   --------*/

 export default connect( mapStateToProps, {getUser , clearUser , updateUser , deleteUser})(
    reduxForm({
        validate,
        form: 'editUserForm',
        enableReinitialize : true,
    })(Edit)
 );