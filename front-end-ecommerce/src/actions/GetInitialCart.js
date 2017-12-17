import axios from 'axios';


export default function(userToken){
  console.log(userToken);
  let ajaxPromise = axios({
    method: "POST",
    url: `${window.apiHost}/getInitialData`,
    data: {
      userToken
    }
  });
  return{
    type: "UPDATE_CART",
    payload: ajaxPromise
  }
}