import axios from 'axios';


export default function(token, info, whatToChange){
  let ajaxPromise = axios({
    method: "POST",
    url: `${window.apiHost}/updateUserInfo`,
    data:{
      token,
      info,
      whatToChange
    }
  });
  return {
    type: "UPDATED",
    payload: ajaxPromise
  }
}