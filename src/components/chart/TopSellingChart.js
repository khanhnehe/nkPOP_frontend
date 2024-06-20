import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTopSelling } from '../../store/actions/adminAction';

import "./Chart.scss"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FF5A', '#FF8C19', '#708090', '#8B4513'];

const TopSellingChart = () => {
    const dispatch = useDispatch();
    const topSellingData = useSelector(state => state.admin.topProduct);

    useEffect(() => {
        dispatch(getTopSelling());
    }, [dispatch]);

    const data = topSellingData ? topSellingData.slice(0, 10).map((product, index) => ({
        name: product.name_product.length > 10 ? product.name_product.substring(0, 17) + '...' : product.name_product,
        sales: product.purchases
    })) : [];


    return (
        <div className="chart p-4">
            <div className='title mb-3'>Top 10 sản phẩm bán chạy nhất</div>
            <ResponsiveContainer width="100%" height={440}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="sales"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TopSellingChart;