import React, { Component } from 'react';
import Sidler from '../../components/Sidler/Sidler';
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
                <h1>Home hello</h1>

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
