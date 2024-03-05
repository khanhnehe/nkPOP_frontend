import React, { Component } from 'react';
import Sidler from '../../components/Sidler/Sidler';
import ProductCarousel from '../../components/Sidler/ProductCarousel';
import Categories from './Section/Categories';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Banner from '../../components/Banner';
import TypeOutStanding from '../../pages/Products/Type/TypeOutStanding';
import MakeupCategory from '../../pages/Products/Category/MakeupCategory';
import SkinCategory from '../Products/Category/SkinCategory';
import HairCategory from '../Products/Category/HairCategory';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {

        // const { isLoggedIn } = this.props;
        // let linkToRedirect = isLoggedIn ? '' : '/home';

        return (
            <>
                <Sidler />
                <TypeOutStanding />

                <MakeupCategory />

                <SkinCategory />

                <HairCategory />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
