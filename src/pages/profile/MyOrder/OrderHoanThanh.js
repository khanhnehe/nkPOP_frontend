import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, filterStatusOder } from '../../../store/actions/productAction';
import { NavLink } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import './OrderCho.scss'
import { IoIosStar } from "react-icons/io";
import sao from '../../../assets/star.png';

const OrderHoanThanh = () => {
    const dispatch = useDispatch();
    const listOrders = useSelector(state => state.admin.listStatusOfOrder)
        .sort((a, b) => b.date - a.date); // Sắp xếp theo ngày, ngày mới nhất lên đầu

    const [show, setShow] = useState(false);
    const [review, setReview] = useState({ rating: 0, comment: '' });
    const handleClose = () => setShow(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleShow = (productId) => {
        setCurrentProduct(productId);
        setShow(true);
    };

    const fetchHoanhThanh = async () => {
        await dispatch(filterStatusOder("Đã giao thành công"))
    }

    const handleOnChange = (event, id) => {
        setReview(prevReview => ({
            ...prevReview,
            [id]: event.target.value,
        }));
    };

    const addReviewOrder = async () => {
        if (currentProduct) {
            // Tìm đơn hàng chứa sản phẩm đang được đánh giá
            const orderContainingProduct = listOrders.find(order =>
                order.cart.some(item => item.product === currentProduct)
            );

            if (orderContainingProduct) {
                // console.log('Current product:', currentProduct);
                // console.log('User ID:', orderContainingProduct.user);

                // Thêm userId vào dữ liệu đánh giá
                const reviewData = { ...review, userId: orderContainingProduct.user };
                await dispatch(addReview(currentProduct, reviewData));

                setReview({
                    rating: 0,
                    comment: ''
                })
                handleClose();


            }
        }
    }
    useEffect(() => {
        fetchHoanhThanh();
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
                                            <div className='product-info-name row'>
                                                <div className='up-info col-10'>
                                                    <NavLink to={`/product/${item.product}`}>
                                                        <img src={item.image[0]} className='product-image' />
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
                                                    {!order.isReview && <div className='btn-review' onClick={() => handleShow(item.product)}>Đánh giá</div>}

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='bottom'>
                                        <div className='tien'>Thành tiền:   {order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                        <div className='status-ht' style={{ color: "#1da1f2", fontWeight: '600' }}>{order.statusUser}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <label>Chất lượng sản phẩm</label>
                        <div className='review-start'>
                            <Form.Group controlId="formBasicRating" className='col-2 mb-2'>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={review.rating}
                                    onChange={(event) => handleOnChange(event, 'rating')}
                                    placeholder="Chọn số sao"
                                    min="1"
                                    max="5"
                                />
                            </Form.Group>
                            <IoIosStar className='icon-star' />
                        </div>
                        <div className='col-4' style={{ width: '100px', height: 'auto' }}>
                            <img src={sao} className='anh-sao' style={{ width: '100px', height: 'auto' }} />
                        </div>




                        <Form.Group controlId="formBasicComment">
                            <label>Lời đánh giá</label>
                            <textarea
                                rows="3"
                                type="text"
                                className="form-control"
                                value={review.comment}
                                onChange={(event) => handleOnChange(event, 'comment')}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className="btn-modal" onClick={addReviewOrder}>
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default OrderHoanThanh;