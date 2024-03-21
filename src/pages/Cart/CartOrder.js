import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCartByUseId } from '../../store/actions/productAction';
import './CartOrder.scss';

const CartOrder = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

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
    const increaseAmount = () => {
        setAmount(prevAmount => prevAmount + 1);
    };

    // Hàm để giảm số lượng, nhưng không cho phép số lượng nhỏ hơn 1
    const decreaseAmount = () => {
        setAmount(prevAmount => prevAmount > 1 ? prevAmount - 1 : 1);
    };


    useEffect(() => {
        fetchCart(id);
    }, [id])

    return (
        <>
            <div className='cart-page'>
                <div className='container'>
                    <div className='title-cart'>Giỏ hàng</div>
                    <div className='order row'>
                        {/* trái */}
                        <div className='left col-9'>
                            <div className='row'>
                                <div className='content-left col-6'>
                                    <label>Sản phẩm</label>
                                </div>
                                <div className='content-right col-6'>
                                    <label className='me-4'>Số lượng</label>
                                    <label className='me-4'>Giá</label>

                                    <label>Tổng</label>
                                </div>
                            </div>
                        </div>
                        {/* phải */}
                        <div className='right col-3'>
                            <label>Tổng Đơn hàng</label>
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
                                                <img src={item.image} className="cart-image" />
                                            </div>

                                            <div className='item-right'>
                                                <div className='name'>{item.name}</div>
                                                <div className='name-variant'>{item?.name_variant}</div>
                                            </div>
                                        </div>
                                        {/* amount */}
                                        <div className='content-right col-6'>
                                            <div className='item-amount'>
                                                <button className='btn-amount' onClick={decreaseAmount}>-</button>
                                                <div className='amount-number'>{item.amount}</div>
                                                <button className='btn-amount' onClick={increaseAmount}>+</button>

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
                        <div className='right col-3'>
                            <div>Tổng: {listOrder && listOrder.totalPrice
                                && listOrder.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CartOrder;