import React, { Component } from 'react';
import './Sidler.scss';
import { Carousel } from 'react-bootstrap';
import poster1 from '../../assets/poster1.jpg'; // Make sure this path is correct
import poster2 from '../../assets/poster2.jpg'; // Make sure this path is correct
import poster5 from '../../assets/poster5.1.jpg'; // Make sure this path is correct
import poster6 from '../../assets/poster7.jpg'; // Make sure this path is correct

class Sidler extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <>
                <div className='Carousel-controller m-3'>
                    <Carousel>
                        <Carousel.Item>
                            <img src={poster1} alt="First slide" className="carousel-img" />
                            <Carousel.Caption>

                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={poster2} alt="Second slide" className="carousel-img" />
                            <Carousel.Caption>

                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={poster5} alt="Third slide" className="carousel-img" />
                            <Carousel.Caption>

                            </Carousel.Caption>
                        </Carousel.Item><Carousel.Item>
                            <img src={poster6} alt="Third slide" className="carousel-img" />
                            <Carousel.Caption>

                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </>
        );
    }
}

export default Sidler;
