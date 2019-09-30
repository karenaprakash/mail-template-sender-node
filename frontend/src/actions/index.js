/**
 *  actions : all actions which are used in this project
 */
import axios from 'axios';
import {reset} from 'redux-form';



/*=============== Send Mail With Data
===========================*/


function mailSendSuccess(response) {
    return{
        type : 'SEND_MAIL',
        payload : response
    } 
}

function mailSendError(error) {
   // console.log(error);
	return {
		type: 'SEND_MAIL',
		payload: error
	};
}


export const sendMailWithData = (id,email) => (dispatch) =>{
    //console.log(data)
    const request = axios.post(`/api/sendMail?id=${id}&email=${email}`)
    .then(response => {
      //  console.log(response.data);
        if(response.data.post){
            alert('Email Sent successfully.')
            dispatch(reset('sendMail'))
            dispatch(mailSendSuccess(response.data))
        }else{
            dispatch(mailSendError(response.data));
            alert('Error while sending email.Please try again later')
        }
        return response.data 
    })
    .catch((err) => {
         dispatch(mailSendError(err));
         alert('Error while sending email.Please try again later')
    });
}




/*=============== Add User
===========================*/

function addUserStart() {
  //  console.log('start')
	return {
		type: 'ADD_USER_START',
		payload: 'start'
	};
}

function addUserSuccess(response) {
 //   console.log('done')
	return {
		type: 'ADD_USER_SUCCESS',
		payload: 'done'
	};
}

function addUserError(error) {
   // console.log(error);
	return {
		type: 'ADD_USER_ERROR',
		payload: 'error'
	};
}

export const addUser = (data) => (dispatch) => {
  //  console.log(data)
    dispatch(addUserStart());

    const response = axios.post('/api/user',data)
    .then(response => {
       // console.log(response)
        if(response.data.success){
            alert('Data uploaded Successfully.')
            dispatch(reset('addUserForm'))
            dispatch(addUserSuccess(response))
        }else{
            dispatch(addUserError('error while storing data.'));
            alert('error while storing data.')
        }
    })
    .catch((error) => {
        dispatch(addUserError(error));
        alert('error while storing data.')
    })

}




//clearUser : clear user in store : add user page 
export function clearUser(){
    return{
        type : 'CLEAR_USER',
        payload : {}
    }
}




/*=============== Edit User
===========================*/


//getUser
export function getUser(id){
    const request = axios.get(`/api/getUser?id=${id}`)
                    .then(response => response.data)    
        return{
            type : 'GET_USER',
            payload : request
        }
}

//getUsers : get all users
export function getUsers(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''

){
    const request = axios.get(`/api/getUsers?limit=${limit}&skip=${start}&order=${order}`)
                    .then( response => {
                        if(list){
                            return [...list,...response.data]
                        }else{
                            return response.data
                        }
                    })


    return{
        type : 'GET_USERS',
        payload : request 
    }
}


/*********
 *  Update
 ***********************/
function updateUserStart() {
  //  console.log('start')
	return {
		type: 'UPDATE_USER_START',
		payload: 'start'
	};
}

function updateUserSuccess(response) {
   // console.log('done')
	return {
		type: 'UPDATE_USER_SUCCESS',
		payload: response.doc
	};
}

function updateUserError(error) {
    //console.log(error);
	return {
		type: 'UPDATE_USER_ERROR',
		payload: error.doc
	};
}


//updateUser
export const updateUser = (data) => (dispatch) => {
    //console.log(data)
    
    const request = axios.post(`/api/update_user`,data)
                    .then(response => {
                     //   console.log(response)
                        if(response.data.success){
                            alert('Data updated Successfully.')
                            dispatch(updateUserSuccess(response.data))
                        }else{
                            dispatch(updateUserError(response.data));
                            alert('error while updating data.')
                        }
                    })
                    .catch((error) => {
                        alert('error while updating data.')
                        return
                    })
    
}


/*=============== Delete User
===========================*/

function deleteUserResponse(response) {
	return {
		type: 'DELETE_USER',
		payload: response
	};
}

//deleteBook
export const deleteUser = (id) => (dispatch) => {
 
     const request =   axios.delete(`/api/delete_user?id=${id}`)
                            .then(response => {
                                //console.log(response)
                                if(response.data){
                                    alert('Data deleted Successfully.')
                                    dispatch(deleteUserResponse(response.data))
                                }else{
                                    dispatch(deleteUserResponse(response.data));
                                    alert('error while deleting data.')
                                }
                            })
                            .catch((error) => {
                                alert('error while deleting data.')
                                return
                            })

 }



/*=============== Add Admin
===========================*/

function signupAdminStart() {
    //  console.log('start')
      return {
          type: 'ADD_ADMIN_START',
          payload: 'start'
      };
  }
  
  function signupAdminSuccess(response) {
   //   console.log('done')
      return {
          type: 'ADD_ADMIN_SUCCESS',
          payload: 'done'
      };
  }
  
  function signupAdminError(error) {
     // console.log(error);
      return {
          type: 'ADD_ADMIN_ERROR',
          payload: 'error'
      };
  }
  
  export const signupAdmin = (data) => (dispatch) => {
    //  console.log(data)
      dispatch(signupAdminStart());
  
      const response = axios.post('/api/signup',data)
      .then(response => {
         // console.log(response)
          if(response.data.success){
              alert('Admin Register Successfully.')
              dispatch(reset('signupAdminForm'))
              dispatch(signupAdminSuccess(response))
          }else{
              dispatch(signupAdminError('error while Register Admin.'));
              alert('Error while register Admin.')
          }
      })
      .catch((error) => {
          dispatch(signupAdminError(error));
          alert('error while Register Admin.')
      })
  
  }
  
  //clearUser : clear user in store : add user page 
  export function clearAdmin(){
      return{
          type : 'CLEAR_ADMIN',
          payload : {}
      }
  }
  
  
/*=============== login user
===========================*/


function loginAdminStart() {
    //   console.log('done')
       return {
           type: 'ADMIN_LOGIN',
           payload: {}
       };
   }

function loginAdminSuccess(response) {
    //   console.log('done')
       return {
           type: 'ADMIN_LOGIN',
           payload: response
       };
   }
   
   function loginAdminError(error) {
      // console.log(error);
       return {
           type: 'ADMIN_LOGIN',
           payload: error
       };
   }


export const loginAdmin = (email,password) => (dispatch) => {
       console.log( email + " " + password)
      
      const response = axios.post('/api/login',{email,password})
      .then(response => {
          console.log(response)
          if(response.data.isAuth){
              alert(response.data.message)
              dispatch(loginAdminSuccess(response.data))
          }else{
              dispatch(loginAdminError('error while Login user.'));
              alert(response.data.message)
          }
      })
      .catch((error) => {
          alert(error)
          dispatch(loginAdminError(error));
      })

  }
  
  
/*=============== check authentication
============================================*/


//auth : for authentication
export function auth(){
    const request = axios.get('/api/auth')
                     .then(response => response.data);
 
     return {
         type : 'ADMIN_AUTH',
         payload : request
     }
 }