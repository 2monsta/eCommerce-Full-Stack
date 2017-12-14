import axios from 'axios';

export default ()=>{
  const ajaxPromise = axios({
    method: "GET",
    url: `${window.apiHost}/productlines/get`
  });
  return{
    type: "GET_PRODUCTLINES",
    payload: ajaxPromise
  }
}