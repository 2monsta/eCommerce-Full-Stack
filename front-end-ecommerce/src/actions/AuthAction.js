// function that returns an object, must have a property of type


export default function(){
  console.log("Auth action is running");
  return{
    type: "AUTH_ACTION",
    payload: "User Registered"
  }
}