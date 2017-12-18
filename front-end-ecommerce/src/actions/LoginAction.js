import axios from 'axios';

export default function(loginData){
  let axiosPromise;
  // this would be removed in production, and is only used for dev purposes
  if(loginData === "fake"){
    axiosPromise = axios({
      url: `${window.apiHost}/fakelogin`,
      method: "POST",
      data: loginData
    });
  }else{
    axiosPromise = axios({
      url: `${window.apiHost}/login`,
      method: "POST",
      data: loginData
    });
  }

  return {
    type: "AUTH_ACTION",
    payload:  axiosPromise
  }
}