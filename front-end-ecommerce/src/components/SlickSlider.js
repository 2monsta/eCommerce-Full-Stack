import React, {Component} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SlickSlider extends Component{
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

    return(
      <div id={"slickSlider"}>
       <Slider {...settings}>
         <div>
           <img src="/slider-images/ferrari.jpg" alt=""/>
         </div>
         <div>
           <img src="/slider-images/lamb.jpg" alt=""/>
         </div>
         <div>
           <img src="/slider-images/schooner.jpg" alt=""/>
         </div>
       </Slider>
      </div>
    )
  }
}

export default SlickSlider;