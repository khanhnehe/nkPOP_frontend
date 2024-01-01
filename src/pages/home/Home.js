import React, { Component } from 'react';
import Sidler from '../../components/Sidler/Sidler';
import ProductCarousel from '../../components/Sidler/ProductCarousel';
import Categories from './Section/Categories';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {

        console.log("check")

        return (
            <>
                <Sidler />
                <ProductCarousel />

                <Categories />

            </>
        );
    }
}

export default Home;
