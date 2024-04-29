import React, { useEffect, useState, useRef } from 'react';
import "./OrderCho.scss"
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from "react-icons/fc";
import { getAllOrder, confirmStatusOrder, filterStatusOder } from '../../../store/actions/productAction';
import { TbEyeSearch } from "react-icons/tb";


const OrderGiao = () => {

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const listOrders = useSelector(state => state.admin.listStatusOfOrder)

    const fetchChoXacNhan = async () => {
        await dispatch(filterStatusOder('Đơn hàng đang được giao'))
    }


    // const confirmOrder = async (orderId) => {
    //     try {
    //         await dispatch(confirmStatusOrder(orderId, "receive"))
    //         fetchChoXacNhan()

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }




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
                                    <div className='code'>Mã đơn: {order.orderCode}</div>

                                    {order.cart && order.cart.map((item, index) => (
                                        <div key={index} className='product-info '>

                                            {/* tên, variant, amount, price */}
                                            <div className='product-info-name row'>
                                                <div className='up-info col-10'>
                                                    <img src={item.image} alt={item.name} className='product-image' />

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
                                        <div className='tien'>Thành tiền:   {order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>|

                                        <div className='status-giao'>{order.statusUser}</div>

                                        {/* <div className='action-yes' onClick={() => confirmOrder(order._id)}>Xác nhận đã nhận hàng</div> */}

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

export default OrderGiao;