import axios from 'axios';

export default function(loginData){

  var axiosPromise = axios({
    url: `${window.apiHost}/login`,
    method: "POST",
    data: loginData
  });


  return {
    type: "AUTH_ACTION",
    payload:  axiosPromise
  }
}