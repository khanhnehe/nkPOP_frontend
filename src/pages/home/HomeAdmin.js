import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import './HomeAdmin.scss'
import Widget from '../../admin/Widget/Widget';

const HomeAdmin = () => {
    return (
        <>
            <div className='home'>
                <Sidebar />
                <div className='homeContainer'>
                    <Navbar />
                    <div className='widgets'>
                        <Widget type='order' />
                        <Widget type='revenue' />
                        <Widget type='user' />
                        <Widget type='out_stock' />
                    </div>
                </div>

            </div>
        </>
    )

}

export default HomeAdmin;
