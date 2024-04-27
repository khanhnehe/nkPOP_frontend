import React, { useEffect, useState, useRef } from 'react';
import "./OrderHoanThanh.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import SidebarOrder from '../SidebarOrder/SidebarOrder';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from "react-icons/fc";
import { getAllOrder, searchOrder, filterStatusOder } from '../../../store/actions/productAction';
import { TbEyeSearch } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";


const OrderHoanThanh = () => {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const listOrders = useSelector(state => state.admin.listStatusOfOrder)
    const listSearchOrder = useSelector(state => state.admin.listSearchOrder)

    const [search, setSearch] = useState('');

    const fetchChoXacNhan = async () => {
        await dispatch(filterStatusOder('Đã giao thành công'))
    }


    const handleRefresh = () => {
        fetchChoXacNhan()
    }
    const handleSearchChange = async (event) => {
        setSearch(event.target.value);
        await dispatch(searchOrder(search))
    };

    const handleSearchSubmit = async () => {
        await dispatch(searchOrder(search))
    }


    useEffect(() => {
        fetchChoXacNhan();
    }, []);

    return (
        <>
            <div className='OrderHoanThanh'>
                <Sidebar />
                <div className='AllOrders-container'>
                    <Navbar />
                    <div className='AllOrders-content'>

                        <div className='top row'>
                            <SidebarOrder />

                            <div className='sreach col-7'>
                                <input type='text'
                                    placeholder='Nhập tên sản phẩm cần tìm'
                                    className="input col-9"
                                    value={search}
                                    onChange={(event) => handleSearchChange(event,)} />

                                <div className='find' onClick={handleSearchSubmit}>Tìm kiếm</div>
                            </div>

                            <div className='date col-5'>
                                <div className='text'>Ngày đặt hàng:</div>
                                <div className='boc'>
                                    <FcCalendar className='icon' />
                                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} className='chon-ngay' />
                                </div>
                            </div>

                        </div>
                        <div className='bottom row'>
                            <div className='up-order'>
                                <div className='length'>{listOrders.length} Đơn hàng </div>
                                <div className='fresh' onClick={handleRefresh}><TbRefresh />   Làm mới</div>
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Mã Đơn</th>
                                        <th>Sản Phẩm</th>
                                        <th>Tổng Đơn</th>
                                        <th>Trạng thái</th>
                                        {/* <th>Hành động</th> */}
                                        <th>Xem chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(search ? listSearchOrder : listOrders)
                                        .filter(order => order.statusAdmin === 'Đã giao thành công')


                                        .map(order => {
                                            console.log(order.cart);
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order.orderCode}</td>
                                                    <td>
                                                        {order.cart && order.cart.map((item, index) => (
                                                            <div key={index} className='product-info'>
                                                                <img src={item.image} alt={item.name} className='product-image' />
                                                                {/* tên, variant, amount */}
                                                                <div className='product-info-name'>
                                                                    <span className='product-name'>{item.name}</span>
                                                                    {item.variant &&
                                                                        <span className='product-variant'>{item.name_variant}
                                                                        </span>}

                                                                    <span className='amount'>x {item.amount} </span>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td className='status' >{order.statusAdmin}</td>
                                                    {/* <td>
                                                    <div className='action-giao' onClick={() => handleOrderHoanThanh(order._id)}>Xác nhận đã giao</div>
                                                </td> */}
                                                    <td><TbEyeSearch className='icon-eye' />Chi tiết</td>
                                                </tr>
                                            );
                                        })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default OrderHoanThanh;