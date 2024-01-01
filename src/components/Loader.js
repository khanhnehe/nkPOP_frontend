import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './Loader.scss';
import loaderImg from "../assets/loader.png"

class Loader extends Component {


    render() {
        return ReactDOM.createPortal(
            <>
                <div className='wrapper'>
                    <div className='loader-container'>
                        <div className='loader'>
                        </div>
                        <p className="loading-text">Loading...</p>
                    </div>
                </div>
            </>

            ,
            // theo id của html public
            document.getElementById('loader')
        );
    }
}

export default Loader;
