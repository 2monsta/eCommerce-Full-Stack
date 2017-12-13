// function that returns an object, must have a property of type

import axios from 'axios';


export default function(info){
  console.log("Auth action is running");
  let axiosPromise = axios({
    url: `${window.apiHost}/register`,
    method: "POST",
    data: info
  });
  return{
    type: "AUTH_ACTION",
    payload: axiosPromise
  }
}