import React, { useEffect, useState, useRef } from 'react';
import "./OrderCho.scss"
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from "react-icons/fc";
import { getAllOrder, confirmStatusOrder, filterStatusOder } from '../../../store/actions/productAction';
import { TbEyeSearch } from "react-icons/tb";
import { NavLink } from 'react-router-dom';


const CancelOrder = () => {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const listOrders = useSelector(state => state.admin.listStatusOfOrder)

    const fetchChoXacNhan = async () => {
        await dispatch(filterStatusOder('Đơn hàng bị hủy'))
    }

    const cancelOrder = async (orderId) => {
        try {
            await dispatch(confirmStatusOrder(orderId, "cancel"))
            fetchChoXacNhan()

        } catch (e) {
            console.log(e);
        }
    }



    const handleRefresh = () => {
        fetchChoXacNhan()
    }

    useEffect(() => {
        fetchChoXacNhan();
    }, []);

    return (
        <>
            <div className='OrderCho'>
                <div className='top row'>

                    <div className='my-order'>


                        {listOrders && listOrders.map(order => {
                            return (
                                <div className='boc' key={order._id}>
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
                                                    <div className='price'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                    <div className='price-sale'>{item.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='bottom'>
                                        <div className='tien'>Thành tiền:   {order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>|

                                        <div className='status' style={{ color: "#c50013" }}>{order.statusUser}</div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>
            </div>

        </>
    )
}

export default CancelOrder;