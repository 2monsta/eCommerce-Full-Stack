
export default function(state = [], action){
  if(action.type === 'UPDATE_CART'){
    // var newState = {...state};
    return action.payload.data;
  }else{
    return state;
  }
}