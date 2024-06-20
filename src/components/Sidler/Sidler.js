import React, { Component } from 'react';
import './Sidler.scss';
import { Carousel } from 'react-bootstrap';
import poster1 from '../../assets/skin4.png';
import poster6 from '../../assets/skin2.png';
// import poster5 from '../../assets/poster5.1.jpg';
import poster2 from '../../assets/skin3.png';
import row1 from "../../assets/row1.jpg"
import row2 from "../../assets/row2.jpeg"
import row3 from "../../assets/banner-giam-gia.png"

class Sidler extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <>
                <div className='Carousel-controller'>
                    <div className='row'>
                        <div className='col-12 edit-silde'>
                            <Carousel>
                                <Carousel.Item>
                                    <img src={poster1} alt="First slide" className="carousel-img" />
                                    <Carousel.Caption>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={poster6} alt="Second slide" className="carousel-img" />
                                    <Carousel.Caption>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={poster2} alt="Third slide" className="carousel-img" />
                                    <Carousel.Caption>

                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        {/* <div className='col-3 left-side'>

                            <div className='row line-1'>
                                <img src={row1} className="row-img" />
                            </div>
                            <div className='row line-2 mt-3'>
                                <img src={row2} className="row-img" />


                            </div>
                        </div> */}
                    </div>

                </div>
            </>
        );
    }
}

export default Sidler;
