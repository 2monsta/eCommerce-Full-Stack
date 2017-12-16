import axios from 'axios';


export default function(userToken, productCode){
  let ajaxPromise = axios({
    method: "POST",
    url: `${window.apiHost}/updateCart`,
    data:{
      userToken,
      productCode
    }
  });
  return{
    type: "UPDATE_CART",
    payload: ajaxPromise
  }
}