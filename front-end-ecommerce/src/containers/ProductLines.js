import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class ProductLines extends Component{
	constructor(){
		super();
		this.state ={
			productList: []
		}
	}
	componentDidMount(){
		const pl = this.props.match.params.productline;
		// const decodedPL = decodeURIComponent(pl);
		const url = `${window.apiHost}/productlines/${pl}/get`
		axios.get(url)
		.then((response)=>{
			// console.log(response);
			this.setState({
				productList: response.data
			})
		});
	}
	render(){
		// console.log(this.props);
		const products = this.state.productList.map((products, index)=>{
			return (
				<div></div>
			)
		})
		var thisPL = this.props.pl.filter((obj)=>{
			return obj.productLine === this.props.match.params.productline
		})
		console.log(thisPL);
		if(thisPL.length === 0){
			var desc = "";
		}else{
			var desc = thisPL[0].textDescription;
		}
		return(
			<div>
				<h1>Welcome to the {this.props.match.params.productline}</h1>
				<p>{desc}</p>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		pl:state.pl
	}
}
// export default ProductLines
export default connect(mapStateToProps)(ProductLines);