// a reducer is a function that returns a piece of State

export default function(state = [], action){
  switch(action.type){
    case "AUTH_ACTION":
      // i'm going to update'
      return action.payload;
    default:
      return state;
  }
}