import axios from 'axios';


export default function(token, info){
  let ajaxPromise = axios({
    method: "POST",
    url: `${window.apiHost}/updateUserInfo`,
    data:{
      token,
      info
    }
  })
  return {
    type: "UPDATED",
    payload: ajaxPromise
  }
}