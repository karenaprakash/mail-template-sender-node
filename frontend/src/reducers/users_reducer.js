/**
 * 
 * users_reducer : which containe all reducers related to users
 *  
 */
export default function(state={},action){
    switch(action.type){
        case 'ADD_USER_START':
            return { ...state,user:action.payload }
        case 'ADD_USER_SUCCESS':
            return { ...state,user:action.payload }
        case 'ADD_USER_ERROR':
            return { ...state,user:action.payload }   
        case 'CLEAR_USER':
            return { ...state,user:action.payload }   
        case 'GET_USER':
            return { ...state,user:action.payload }  
        case 'GET_USERS':
            return { ...state,users:action.payload }  
        case 'UPDATE_USER_START':
            return { ...state,user:action.payload }
        case 'UPDATE_USER_SUCCESS':
            return { ...state,user:action.payload }
        case 'UPDATE_USER_ERROR':
            return { ...state,user:action.payload }   
        case 'UPDATE_USER':
            return { ...state,user:action.payload.doc }   
        case 'DELETE_USER':
            return { ...state,user:action.payload }  
        case 'ADD_ADMIN_START':
            return { ...state,admin:action.payload }
        case 'ADD_ADMIN_SUCCESS':
            return { ...state,admin:action.payload }
        case 'ADD_ADMIN_ERROR':
            return { ...state,admin:action.payload }   
        case 'CLEAR_ADMIN':
            return { ...state,admin:action.payload }   
        case 'ADMIN_LOGIN':
            return { ...state,login:action.payload }
        case 'ADMIN_AUTH':
            return { ...state,login:action.payload }  
        default:
            return state;
    }
}