import React, { Component } from 'react';
import Sidler from '../../components/Sidler/Sidler';
import ProductCarousel from '../../components/Sidler/ProductCarousel';
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

            </>
        );
    }
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return {};
};

export default Home;
