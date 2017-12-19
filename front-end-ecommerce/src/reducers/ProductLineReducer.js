export default (state = [], action)=>{
	// console.log(action.type);
	switch(action.type){
		case "GET_PRODUCTLINES":
			return action.payload.data;
		default: 
			return state
	}
}