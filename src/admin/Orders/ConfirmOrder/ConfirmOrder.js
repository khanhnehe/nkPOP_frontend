import React, { useEffect, useState, useRef } from 'react';
import "./ConfirmOrder.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import SidebarOrder from '../SidebarOrder/SidebarOrder';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from "react-icons/fc";
import { getAllOrder, confirmStatusOrder } from '../../../store/actions/productAction';
import { TbEyeSearch } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";


const ConfirmOrder = () => {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const listOrders = useSelector(state => state.admin.listAllOrders)

    const fetchAllOrders = async () => {
        await dispatch(getAllOrder())
    }

    const cancelOrder = async (orderId) => {
        try {
            await dispatch(confirmStatusOrder(orderId, "cancel"))
            fetchAllOrders()

        } catch (e) {
            console.log(e);
        }
    }

    const confirmOrder = async (orderId) => {
        try {
            await dispatch(confirmStatusOrder(orderId, "confirm"))
            fetchAllOrders()

        } catch (e) {
            console.log(e);
        }
    }

    const handleRefresh = () => {
        fetchAllOrders()
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <>
            <div className='ConfirmOrder'>
                <Sidebar />
                <div className='AllOrders-container'>
                    <Navbar />
                    <div className='AllOrders-content'>

                        <div className='top row'>
                            <SidebarOrder />

                            <div className='sreach col-7'>
                                <input type='text' className="input col-9" />
                                <div className='find'>Tìm kiếm</div>
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
                                        <th>Hành động</th>
                                        <th>Xem chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listOrders && listOrders.map(order => {
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
                                                <td className='status'>{order.statusAdmin}</td>
                                                <td>
                                                    {/* nếu statusAdmin  là 'Đơn hàng đang được giao' */}
                                                    {order.statusAdmin === 'Đơn hàng đang được giao'
                                                        ? (
                                                            // đúng hiện 'Đã Xác Nhận'
                                                            <div className='action-yes'>Đã Xác Nhận</div>
                                                        )
                                                        : (
                                                            // sai hiện 'Xác Nhận'
                                                            <div onClick={() => confirmOrder(order._id)} className={order.statusAdmin === 'Đơn hàng bị hủy'
                                                                ?
                                                                'action-yes disabled'
                                                                :
                                                                'action-yes'}>Xác Nhận</div>
                                                        )}

                                                    {/*nếu là 'Đơn hàng bị hủy' */}
                                                    {order.statusAdmin === 'Đơn hàng bị hủy'
                                                        ? (
                                                            // đúng
                                                            <div className='action' >Đã hủy Đơn</div>
                                                        )
                                                        : (
                                                            // sai, statusAdmin là ''
                                                            <div onClick={() => cancelOrder(order._id)} className={order.statusAdmin === 'Đơn hàng đang được giao'
                                                                ?
                                                                // tiếp tực Nếu đúng, 'disabled' để vô hiệu div và hiện Hủy đon
                                                                'action disabled'
                                                                :
                                                                'action'}>Hủy Đơn</div>
                                                        )}
                                                </td>
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

export default ConfirmOrder;