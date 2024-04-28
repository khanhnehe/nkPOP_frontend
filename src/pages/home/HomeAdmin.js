import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import './HomeAdmin.scss'
import Widget from '../../admin/Widget/Widget';
import ChartWeek from "../../components/chart/ChartWeek";
import Chart_Daily from "../../components/chart/Chart_Daily";
import Chart_Month from "../../components/chart/Chart_Month";
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
                    <div className='charts'>
                        <Chart_Daily />
                        <ChartWeek />
                    </div>
                    <div className='list-container'>

                        <div></div>
                        <Chart_Month />
                    </div>
                </div>
            </div>
        </>
    )

}

export default HomeAdmin;
