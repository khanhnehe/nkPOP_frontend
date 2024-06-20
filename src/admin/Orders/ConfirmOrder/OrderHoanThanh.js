import React, { useEffect, useState, useRef } from 'react';
import "./OrderHoanThanh.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import SidebarOrder from '../SidebarOrder/SidebarOrder';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from "react-icons/fc";
import { getOrderByDate, searchOrder, filterStatusOder } from '../../../store/actions/productAction';
import { TbEyeSearch } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";
import { Modal } from 'react-bootstrap';


const OrderHoanThanh = () => {

    const dispatch = useDispatch();
    // const listOrders = useSelector(state => state.admin.listStatusOfOrder)
    const listSearchOrder = useSelector(state => state.admin.listSearchOrder)
    const listOrders = useSelector(state => state.admin.orderByDate)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
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
    const fetchOrdersByDate = async () => {
        await dispatch(getOrderByDate(startDate, endDate));
    }
    const handleSearchSubmit = async () => {
        await dispatch(searchOrder(search))
    }

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };
    const closeOrderDetails = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchOrdersByDate();
    }, [startDate, endDate]);


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
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(dates) => {
                                            const [start, end] = dates;
                                            setStartDate(start);
                                            setEndDate(end);
                                        }}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        dateFormat="dd/MM/yyyy"
                                    />                                </div>
                            </div>

                        </div>
                        <div className='bottom row'>
                            <div className='up-order'>
                            <div className='length'>{listOrders.filter(order => order.statusAdmin === 'Đã giao thành công').length} Đơn hàng </div>
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
                                                <td style={{fontWeight: "500"}}>{order.orderCode}</td>
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
                                                                <div style={{fontWeight: "500"}} className=''>{item.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>

                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td style={{fontWeight: "500", color: "#800303" }}>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</td>
                                                    <td>
                                                        <span  className='status' style={{color: "#0a8db3", backgroundColor: "#e2fbff"}}>{order.statusAdmin}</span>
                                                    </td>
                                                    
                                                    {/* <td>
                                                    <div className='action-giao' onClick={() => handleOrderHoanThanh(order._id)}>Xác nhận đã giao</div>
                                                </td> */}
                                                <td onClick={() => openOrderDetails(order)}><TbEyeSearch className='icon-eye' />Chi tiết</td>
                                                </tr>
                                            );
                                        })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <Modal show={isModalOpen} onHide={closeOrderDetails}>
                <Modal.Header style={{ fontSize: '13px' }} closeButton>
                    <Modal.Title style={{ fontSize: '14px', marginLeft: '5px' }}>Chi tiết hóa đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <div className='modal-order'>
                            <div className='code mb-3'>Mã đơn: {selectedOrder.orderCode}</div>
                            <div className='top'>
                                <div className='user'>
                                    <div>Họ tên người nhận: {selectedOrder.shippingAddress.fullName}</div>
                                    <div>Số điện thoại: {selectedOrder.shippingAddress.phone}</div>
                                </div>
                                <div className='user'>
                                    <div>Thành phố: {selectedOrder.shippingAddress.city}</div>
                                    <div>Địa chỉ: {selectedOrder.shippingAddress.address}</div>
                                </div>
                            </div>
                            {selectedOrder.cart.map((item, index) => (
                                <div key={index}>
                                    <div className='info'>
                                        <div className='name-var'>
                                            <div className='name'> {item.name}</div>
                                            <div className='var'> {item.name_variant}</div>
                                        </div>
                                        <div className='bottom'>
                                            <div>x {item.amount}</div>
                                            <div>{item.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='info-bottom'>
                                <p className="mt-3" style={{fontWeight: "600"}}>
                                    Tổng tiền: {selectedOrder.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}
                                    </p>
                                <p>Phương thưc thanh toán: {selectedOrder.paymentMethod}</p>
                                <p>Phương thức vận chuyển: {selectedOrder.shippingMethod}</p>
                                {/* {selectedOrder.isPaid && <p>Đã thanh toán</p>}
                                {selectedOrder.isDelivered && <p>Đã nhận hàng</p>} */}
                                {selectedOrder.isDelivered && <p>Ngày nhận: {new Date(selectedOrder.deliveredAt).toLocaleDateString()}</p>}

                                <p>{selectedOrder.statusAdmin}</p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderHoanThanh;