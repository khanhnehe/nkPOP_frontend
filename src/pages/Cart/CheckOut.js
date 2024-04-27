import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCartByUseId, checkOutOrder, getOrderValues, tinhFreeShip, getShipPrice_total } from '../../store/actions/productAction';
import './CheckOut.scss';
import Select from 'react-select';
import { PiPackageThin } from "react-icons/pi";
import pay from "../../assets/online-bill.png";
import logo1 from "../../assets/logo.png"
import { Link, NavLink } from 'react-router-dom';
import { GrFormNext } from "react-icons/gr";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const CheckOut = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    //lấy id


    const listOrder = useSelector(state => state.admin.listCartOrder);
    const user = listOrder && listOrder.user;
    const cart = listOrder && listOrder._id;

    const orderValues = useSelector(state => state.admin.orderValues);
    const freeShip = useSelector(state => state.admin.freeShip);
    const listcheckOutOrder = useSelector(state => state.admin.checkOutOrder);
    const navigate = useNavigate();

    const fetchcheckOut = async () => {
        try {
            await dispatch(getCartByUseId(id));
        } catch (e) {
            console.error('Error fetching Order list:', e);
        }
    }
    const [checkout, setCheckout] = useState({
        fullName: '',
        address: '',
        phone: '',
        note: '',
        city: '',
        paymentMethod: '',
        shippingMethod: ''
    });

    const getValuesOfOrder = async () => {
        await dispatch(getOrderValues())
    }

    const [orderValue, setOrderValues] = useState({
        cityValue: [],
        paymentMethod: [],
        shippingMethod: []
    })

    useEffect(() => {
        if (orderValues && orderValues.city && orderValues.shippingMethod) {
            setOrderValues({
                cityValue: orderValues.city,
                paymentMethod: orderValues.paymentMethod || [],
                shippingMethod: orderValues.shippingMethod || []
            });
        }
    }, [orderValues]);

    const handleOnChange = async (selectedOption, id) => {
        let value;
        // thì value sẽ là giá trị của event
        if (selectedOption && selectedOption.target) {
            value = selectedOption.target.value;
        } else {
            // nl sẽ là thuộc tính value của đối tượng selectedOption.
            value = selectedOption.value;
        }

        //  cập nhật state checkout với giá trị mới.
        setCheckout((prevCheck) => ({
            ...prevCheck,
            [id]: value
        }))

        // id là 'city' thì tinhFreeShip.
        if (id === 'city') {
            // tạo một đối tượng checkout mới với giá trị city đã cập nhật.
            const newCheckout = {
                ...checkout,
                [id]: value
            };

            dispatch(tinhFreeShip(listOrder.totalPrice, newCheckout.city))
                .then(shippingMethod => {
                    dispatch(getShipPrice_total(listOrder.totalPrice, newCheckout.city))
                        .then(({ shippingPrice, totalPriceOrder }) => {
                            setCheckout({
                                ...newCheckout,
                                shippingMethod,
                                shippingPrice,
                                totalPriceOrder
                            });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
        }
    }

    // useEffect(() => {
    //     console.log('checkout.shippingMethod:', checkout.shippingMethod);
    // }, [checkout.shippingMethod]);


    function validateInput() {
        let isValid = true;
        let checkArr = ['fullName', 'address', 'phone', 'city', 'paymentMethod',];

        for (let i = 0; i < checkArr.length; i++) {
            if (!checkout[checkArr[i]]) {
                isValid = false;
                toast.error('Bạn điền thiếu: ' + [checkArr[i]]);
                break;
            }
        }
        return isValid;
    }

    const handleCheckOutOrder = async () => {
        try {
            let isValid = validateInput();
            console.log('isValid:', isValid);
            if (!isValid) {
                return;
            }
            const orderData = {
                ...checkout,
                shippingAddress: {
                    fullName: checkout.fullName,
                    address: checkout.address,
                    city: checkout.city,
                    phone: checkout.phone
                },
                user,
                cart
            };
            await dispatch(checkOutOrder(orderData));
            navigate('/profile/my-order/');


        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getValuesOfOrder()
        fetchcheckOut(id);
    }, [id])


    return (
        <>
            <div className='checkOut-page'>
                <div className='line'>
                    {/* <img src={logo1} className='image' /> */}
                    <div className='title-checkOut'>Thanh toán</div>
                </div>
                <div className='container'>
                    <div className='checkOut row '>
                        <div className='cart'>
                            <Link to='/cart'>
                                <div className='' style={{ color: "#009eff" }}>Giỏ hàng</div>

                            </Link>

                            <div className='title-small'> <GrFormNext />Thông tin giao hàng</div>
                        </div>

                        <div className='left col-6'>
                            <div className="col-sm-11 mt-3">
                                <input
                                    type="text" placeholder="Họ tên người nhận"
                                    className="form-control"
                                    value={checkout.fullName}
                                    onChange={(event) => handleOnChange(event, 'fullName')}

                                />
                            </div>
                            <div className="col-sm-11 mt-3">
                                <input
                                    type="text" placeholder="Số điện thoại"
                                    className="form-control"
                                    value={checkout.phone}
                                    onChange={(event) => handleOnChange(event, 'phone')}

                                />
                            </div>


                            <div className="col-sm-11 mt-3">
                                <Select
                                    options={orderValue.cityValue.map(value => ({ value, label: value }))}
                                    placeholder="Chọn tỉnh/thành phố"
                                    value={orderValue.cityValue.find(option => option.value === checkout.city)}
                                    onChange={(selectedOption) => handleOnChange(selectedOption, 'city')}
                                />
                            </div>

                            <div className='ship col-11'>Phương thức vận chuyển</div>
                            {checkout.city ? (
                                <div className="shipping-method col-11 mt-3">
                                    <input
                                        type="radio"
                                        id="shippingMethod"
                                        value={checkout.shippingMethod}
                                        checked={true} // This will make the radio button checked by default
                                        onChange={(event) => handleOnChange(event, 'shippingMethod')}
                                    />
                                    <label >{checkout.shippingMethod}</label>
                                </div>
                            ) :
                                <div className='no-ship col-11'>
                                    <PiPackageThin className='icon' />
                                    <p>Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.</p>
                                </div>
                            }

                            <div className="col-sm-11 mt-3">
                                <input
                                    type="text" placeholder="Địa chỉ đầy đủ"
                                    className="form-control"
                                    value={checkout.address}
                                    onChange={(event) => handleOnChange(event, 'address')}


                                />
                            </div>
                            <div className="col-sm-11 mt-3">
                                <textarea
                                    placeholder="Nhập ghi chú (nếu có)"
                                    rows="3"
                                    className="form-control"
                                    value={checkout.note}
                                    onChange={(event) => handleOnChange(event, 'note')}
                                ></textarea>
                            </div>

                            <div className='payment col-11'>Phương thức thanh toán</div>
                            {orderValue.paymentMethod.map((method, index) => (
                                <div className='shipping-method col-11 mt-3' key={index}>
                                    <input
                                        type="radio"
                                        value={method}
                                        checked={checkout.paymentMethod === method}
                                        onChange={(event) => handleOnChange(event, 'paymentMethod')}
                                    />
                                    <label>{method}</label>
                                </div>
                            ))}


                        </div>




                        <div className='right col-6'>
                            <div className='order row'>
                                {listOrder && listOrder.cartItems && listOrder.cartItems.length > 0 && (
                                    listOrder.cartItems.map((item, index) => (

                                        <div className='left col-12' key={index}>
                                            <div className='check-row'>
                                                {/* info */}
                                                <div className='content-left'>
                                                    <div className='item-left'>
                                                        <img src={item.image} className="checkOut-image" />
                                                    </div>

                                                    <div className='item-right'>
                                                        <div className='name'>{item.name}</div>
                                                        <span className={item?.name_variant ? 'name-variant' : ''}>{item?.name_variant}</span>
                                                    </div>
                                                </div>
                                                {/* amount */}
                                                <div className='content-right'>
                                                    <div className='amount-number'>x{item.amount}</div>

                                                    <div className='tong-price'>{item.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>


                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {/* bên phải */}
                                <div className='gia-ship col-12'>
                                    <div className='tam-tinh'>Tạm tính </div>
                                    <div className='tam-tinh'>
                                        {listOrder && listOrder.totalPrice
                                            && listOrder.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </div>
                                </div>
                                <div className='gia-ship col-12'>
                                    <div className='tam-tinh'>Phí vận chuyển </div>
                                    <div className='tam-tinh'>
                                        {checkout.shippingPrice && checkout.shippingPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </div>
                                </div>


                                <div className='gia col-12'>
                                    <div className='tam'>Tổng cộng</div>
                                    <div className='tam'>{checkout.totalPriceOrder && checkout.totalPriceOrder.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                </div>

                                <div className='col thanh-toan col-11'
                                    onClick={handleCheckOutOrder}
                                >Hoàn tất đơn hàng</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default CheckOut;