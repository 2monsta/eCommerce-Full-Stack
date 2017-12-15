import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import ProductRow from '../components/ProductRow';
import UpdateCart from '../actions/UpdateCart';
import {bindActionCreators} from 'redux';

class ProductLines extends Component{
	constructor(){
		super();
		this.state ={
			productList: []
		}
		this.getProducts = this.getProducts.bind(this);
	}
	getProducts(props){
    const pl = props.match.params.productline;
    // const decodedPL = decodeURIComponent(pl);
    console.log(pl);
    const url = `${window.apiHost}/productlines/${pl}/get`
    axios.get(url)
      .then((response)=>{
        // console.log(response);
        this.setState({
          productList: response.data
        })
      });
  }

	componentDidMount(){
    this.getProducts(this.props);
	}

	componentWillReceiveProps(newProps){
	  this.getProducts(newProps);
  }

	render(){
		// console.log(this.props);
		const products = this.state.productList.map((product, index)=>{
		  console.log(product);
			return (
				<ProductRow key={index} product={product} addToCart={this.props.addCart} token={this.props.auth.token}/>
			)
		});
		var thisPL = this.props.pl.filter((obj)=>{
			return obj.productLine === this.props.match.params.productline
		})
		// console.log(thisPL);
		if(thisPL.length === 0){
			var desc = "";
		}else{
			var desc = thisPL[0].textDescription;
		}
		return(
			<div className={"row"}>
				<h1>Welcome to the {this.props.match.params.productline}</h1>
				<p>{desc}</p>
        <div className={"products"}>
          <table>
            <thead>
            <tr>
              <th>Product NamE</th>
              <th>Model Scale</th>
              <th>Made By</th>
              <th>Description</th>
              <th>In Stock</th>
              <th>Your Pirce!</th>
              <th>MSRP</th>
            </tr>
            </thead>
            <tbody>
            {products}
            </tbody>
          </table>
        </div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		pl:state.pl,
    auth:state.auth
	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addCart: UpdateCart
  },dispatch);
}
// export default ProductLines
export default connect(mapStateToProps,mapDispatchToProps)(ProductLines);