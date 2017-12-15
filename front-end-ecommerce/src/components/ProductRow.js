import React from 'react';

function ProductRow(props){
  console.log(props.token);
  const product = props.product;
  if(props.token === undefined){
    var button = "";
  }else{
    var button = <button className={"btn"} onClick={()=>{props.addToCart(props.token, product.productCode)}}>Add To Cart</button>
  }
  if(product.quantityInStock >100){
    var inStock = "In Stock!";
  }else if(product.quantityInStock > 0){
    var inStock = "Order Soon!"
  }else{
    var inStock = "Out of Stock!"
  }
  return(
    <tr>
      <td>{product.productName}</td>
      <td>{product.productScale}</td>
      <td>{product.productVendor}</td>
      <td>{product.productDescription}</td>
      <td>{inStock}</td>
      <td>{product.buyPrice}</td>
      <td>{product.MSRP}</td>
      <td>{button}</td>
    </tr>
  )
}
export default ProductRow;