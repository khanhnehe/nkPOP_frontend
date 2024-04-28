import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { weeklyRevenue } from '../../store/actions/productAction';

import "./Chart.scss"

const ChartWeek = () => {
    const dispatch = useDispatch();
    const weeklyRevenueData = useSelector(state => state.admin.weekRevenue);
    const [selectedWeek, setSelectedWeek] = useState(weeklyRevenueData ? weeklyRevenueData.length - 1 : 0);

    useEffect(() => {
        dispatch(weeklyRevenue());
    }, [dispatch]);

    const daysOfWeek = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

    const data = weeklyRevenueData && weeklyRevenueData[selectedWeek] ? weeklyRevenueData[selectedWeek].daily.map((revenue, index) => ({
        name: daysOfWeek[index],
        revenue
    })) : [];


    useEffect(() => {
        if (weeklyRevenueData) {
            setSelectedWeek(weeklyRevenueData.length - 1);
        }
    }, [weeklyRevenueData]);

    const handleWeekChange = (event) => {
        setSelectedWeek(event.target.value);
    };

    return (
        <>
            <div className="chart">
                <div className='title mb-3'>Doanh thu trong tuần: {weeklyRevenueData && weeklyRevenueData[selectedWeek] ? weeklyRevenueData[selectedWeek].weekly.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</div>
                <select className="select-week mb-2" value={selectedWeek} onChange={handleWeekChange}>
                    {weeklyRevenueData ? weeklyRevenueData.map((week, index) => (
                        <option value={index} key={index}>Tuần {index + 1}</option>
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
                        <Bar dataKey="revenue" fill="#86c386" background={{ fill: '#eee' }} />Doanh thu
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default ChartWeek;