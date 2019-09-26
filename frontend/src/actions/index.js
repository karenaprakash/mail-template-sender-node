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


export const sendMailWithData = (id) => (dispatch) =>{
    //console.log(data)
    const request = axios.post(`/api/sendMail?id=${id}`)
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
