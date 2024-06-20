import React, { useEffect, useState, useRef } from 'react';
import "./OrderCho.scss"
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from "react-icons/fc";
import { getAllOrder, getOrderByUserId } from '../../../store/actions/productAction';
import { TbEyeSearch } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';


const AllOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const listOrders = useSelector(state => state.admin.listOrderById)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getColor = (statusUser) => {
        switch (statusUser) {
            case 'Đơn hàng bị hủy':
                return { color: "#dc3545", backgroundColor: "#f6c4c4" };
            case 'Đơn hàng đang được giao':
                return { color: "#8912d5", backgroundColor: "#ffe2ff" };
            case 'Đã giao thành công':
                return { color: "#0a8db3", backgroundColor: "#e2fbff" };
            default:
                return { color: "#65990e", backgroundColor: "#e9ffc5" };
        }
    };

    const fetchAllOrders = async () => {
        await dispatch(getOrderByUserId(id))
    }
    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };
    const closeOrderDetails = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        fetchAllOrders();
    }, [id]);


    return (
        <>
            <div className='OrderCho'>
                <div className='top row'>

                    <div className='my-order'>


                        {listOrders && listOrders.map(order => {
                            return (
                                <div className='boc' key={order._id}>
                                    <div className='code' onClick={() => openOrderDetails(order)} >Mã đơn: {order.orderCode}</div>

                                    {order.cart && order.cart.map((item, index) => (
                                        <div key={index} className='product-info '>

                                            {/* tên, variant, amount, price */}
                                            <div className='product-info-name row'>
                                                <div className='up-info col-10'>
                                                    <NavLink to={`/product/${item.product}`}>
                                                        <img src={item.image} className='product-image' />
                                                    </NavLink>
                                                    <div className='name'>
                                                        <span className='product-name'>{item.name}</span>
                                                        {item.variant &&
                                                            <span className='product-variant'>{item.name_variant}</span>
                                                        }
                                                    </div>

                                                </div>

                                                <div className='down-info col-2'>
                                                    <span className='amount'>x {item.amount} </span>
                                                    <div className='price'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                                    <div className='price-sale'>{item.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='bottom'>
                                        <div className='tien'>Thành tiền:  {order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>|


                                        <div className='status-tong' style={{ ...getColor(order.statusUser), fontWeight: '600' }}>{order.statusUser}</div>
                                    </div>

                                </div>
                            );
                        })}

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

export default AllOrder;