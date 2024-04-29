import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCartByUseId, deleteitemCart, changeAmount } from '../../store/actions/productAction';
import './CartOrder.scss';
import bia from '../../assets/fre.webp';
import { NavLink } from 'react-router-dom';


const CartOrder = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.user.userInfo)
    const listOrder = useSelector(state => state.admin.listCartOrder);

    const fetchCart = async () => {
        try {
            await dispatch(getCartByUseId(id));
        } catch (e) {
            console.error('Error fetching Order list:', e);
        }
    }

    //
    // Khởi tạo state amount với giá trị ban đầu là 1
    const [amount, setAmount] = useState(1);

    // Hàm để tăng số lượng
    const increaseAmount = async (itemId) => {
        await dispatch(changeAmount(itemId, 'increase')) // Add 'increase' action
        setAmount(prevAmount => prevAmount + 1);
        fetchCart(itemId)

    };

    // Hàm để giảm số lượng, nhưng không cho phép số lượng nhỏ hơn 1
    const decreaseAmount = async (itemId) => {
        await dispatch(changeAmount(itemId, 'decrease')) // Add 'decrease' action
        setAmount(prevAmount => prevAmount - 1);
        fetchCart(itemId)

    };

    const handledeleteitemCart = async (itemId) => {
        try {
            await dispatch(deleteitemCart(itemId));
            fetchCart(id)
        } catch (e) {
            console.log('lỗi', e)
        }
    }



    useEffect(() => {
        fetchCart(id);
    }, [id])


    return (
        <>
            <div className='cart-page'>
            <div className="line"><NavLink to='/'>Trang chủ</NavLink> / Giỏ hàng</div>  

                <div className='container'>
                    <div className='title-cart mt-4'>Giỏ hàng</div>
                    {/* <img src={bia} className='freeship' /> */}
                    <div className='order row'>
                        {/* trái */}
                        <div className='left col-9'>
                            <div className='row'>
                                <div className='content-left col-6'>
                                    <label>Sản phẩm</label>
                                </div>
                                <div className='content-right col-6'>
                                    <label className='ms-4 me-1'>Số lượng</label>
                                    <label className='ms-3 me-1'>Giá</label>

                                    <label className='ms-4'>Tổng</label>
                                </div>
                            </div>
                        </div>
                        {/* phải */}
                        <div className='right col-2'>
                            <span className='text-tam-tinh'>Tổng Đơn hàng</span>
                            <div className='tam-tinh'>Tạm Tính: {listOrder && listOrder.totalPrice
                                && listOrder.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </div>

                        </div>

                    </div>
                    <div className='order row'>
                        {listOrder && listOrder.cartItems && listOrder.cartItems.length > 0 && (
                            listOrder.cartItems.map((item, index) => (

                                <div className='left col-9' key={index}>
                                    <div className='row'>
                                        {/* info */}
                                        <div className='content-left col-6 mb-4'>
                                            <div className='item-left'>
                                                <button className='btn-delete' onClick={() => handledeleteitemCart(item._id)}>x</button>
                                                <img src={item.image} className="cart-image" />
                                            </div>

                                            <div className='item-right'>
                                                <div className='name'>{item.name}</div>
                                                <span className={item?.name_variant ? 'name-variant' : ''}>{item?.name_variant}</span>
                                            </div>
                                        </div>
                                        {/* amount */}
                                        <div className='content-right col-6'>
                                            <div className='content-right col-6'>
                                                <div className='item-amount'>
                                                    <button className='btn-amount' onClick={() => decreaseAmount(item._id)}>-</button>
                                                    <div className='amount-number'>{item.amount}</div>
                                                    <button className='btn-amount' onClick={() => increaseAmount(item._id)}>+</button>
                                                </div>
                                            </div>
                                            <div className='item-price'>
                                                <div className='price'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                <div className='sale_price'>{item.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                            </div>

                                            <div className='tong-price'>{item.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* bên phải */}

                        <div className='col'>

                            {listOrder && listOrder.cartItems && listOrder.cartItems.length > 0 && (
                                <NavLink to={`/checkout/${user._id}`} >
                                    <div className='check-out'>Thanh toán</div>
                                </NavLink>
                            )}

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CartOrder;