import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyRevenue } from '../../store/actions/productAction';

import "./Chart.scss"

const ChartMonth = () => {
    const dispatch = useDispatch();
    const monthlyRevenueData = useSelector(state => state.admin.monthlyRevenue);
    const [selectedMonth, setSelectedMonth] = useState(monthlyRevenueData ? monthlyRevenueData.length - 1 : 0);

    useEffect(() => {
        dispatch(monthlyRevenue());
    }, [dispatch]);

    const weeksOfMonth = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'];

    const data = monthlyRevenueData && monthlyRevenueData[selectedMonth] ? monthlyRevenueData[selectedMonth].weekly.map((revenue, index) => ({
        name: weeksOfMonth[index],
        revenue
    })) : [];


    useEffect(() => {
        if (monthlyRevenueData) {
            setSelectedMonth(monthlyRevenueData.length - 1);
        }
    }, [monthlyRevenueData]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <>
            <div className="chart p-4">
                <div className='title mb-3'>Doanh thu trong tháng: {monthlyRevenueData && monthlyRevenueData[selectedMonth] ? monthlyRevenueData[selectedMonth].monthly.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' }) : 'N/A'}</div>
                <select className="select-month mb-2" value={selectedMonth} onChange={handleMonthChange}>
                    {monthlyRevenueData ? monthlyRevenueData.map((month, index) => (
                        <option value={index} key={index}>Tháng {index + 1}</option>
                    )) : null}
                </select>

                <ResponsiveContainer width="100%" height={440}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis tickFormatter={(tickItem) => `${tickItem.toLocaleString('vi-VN')}`} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#84CDC9" background={{ fill: '#eee' }} />Doanh thu
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default ChartMonth;