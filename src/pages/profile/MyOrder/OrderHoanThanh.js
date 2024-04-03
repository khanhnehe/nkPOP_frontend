import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, filterStatusOder } from '../../../store/actions/productAction';
import { NavLink } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

const OrderHoanThanh = () => {
    const dispatch = useDispatch();
    const listOrders = useSelector(state => state.admin.listStatusOfOrder)

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
                console.log('Current product:', currentProduct);
                console.log('User ID:', orderContainingProduct.user);

                // Thêm userId vào dữ liệu đánh giá
                const reviewData = { ...review, userId: orderContainingProduct.user };
                await dispatch(addReview(currentProduct, reviewData));
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
                                        <div className='tien'>Thành tiền:   {order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>|
                                        <div className='status-ht' style={{ color: "#1da1f2" }}>{order.statusUser}</div>
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
                        <Form.Group controlId="formBasicRating">
                            <Form.Label>Đánh giá</Form.Label>
                            <input
                                type="number"
                                className="form-control"
                                value={review.rating}
                                onChange={(event) => handleOnChange(event, 'rating')}
                                placeholder="Nhập đánh giá của bạn"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicComment">
                            <Form.Label>Bình luận</Form.Label>
                            <input
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
                    <Button variant="primary" onClick={addReviewOrder}>
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default OrderHoanThanh;