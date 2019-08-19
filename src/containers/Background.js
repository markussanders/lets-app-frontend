import React from 'react';
import hero from '../hero.jpg';
import lizzo from '../lizzo.jpg';
import milkbar from '../milkbar.jpg';
import mall from '../mall.jpg';
import dinner from '../dinner.jpg';
import rooftop from '../rooftop.jpg';
import sparklers from '../sparklers.jpg';
import skyline from '../skyline.jpg';

class Background extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            slide: skyline,
            slideImages: [hero, lizzo, milkbar, mall, dinner, rooftop, sparklers, skyline]
        }
    }

    componentDidMount() {
        setInterval(() => this.setState({
            slide: this.state.slideImages[Math.floor(Math.random() * this.state.slideImages.length)],
        }), 5000) 
    }
    
    render() {
        return (
        <div id="background">
            {this.props.imgUrl ? <img id="background-image" src={this.props.imgUrl} alt="background"/> :  <img id="background-image" src={this.state.slide} alt="background"/> }
        </div>
    )
    }
}


export default Background;