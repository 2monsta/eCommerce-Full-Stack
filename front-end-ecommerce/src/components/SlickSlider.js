import React, {Component} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SlickSlider extends Component{
	constructor(){
		super();
		this.state = {
			slickStyles: {}
		}
	}

	componentDidMount(){
		this.setState({
			slickStyles: {
				float: "left"
			}
		})
	}

  render(){
    const settings = {
      dots:true,
      infinite: true,
      speed: 500,
      slidesToShow:1,
      slidesToScroll:1,
      autoplay:true,
      swipe: true
    };
		var style = {
			width: "100%"
		}
    return(
      <div id={"slickSlider"}>
       <Slider {...settings}>
         <div>
           <img src="/slider-images/ferrari.jpg" style={style} alt=""/>
         </div>
         <div>
           <img src="/slider-images/lamb.jpg" style={style} alt=""/>
         </div>
         <div>
           <img src="/slider-images/schooner.jpg" style={style} alt=""/>
         </div>
       </Slider>
      </div>
    )
  }
}

export default SlickSlider;