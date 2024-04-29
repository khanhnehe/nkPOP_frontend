import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, filterStatusOder,getOrderByUserId } from '../../../store/actions/productAction';
import { NavLink,useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import './OrderCho.scss'
import { IoIosStar } from "react-icons/io";
import sao from '../../../assets/star.png';

const OrderHoanThanh = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const listOrders = useSelector(state => state.admin.listOrderById)

    const [show, setShow] = useState(false);
    const [review, setReview] = useState({ rating: 0, comment: '' });
    const handleClose = () => setShow(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleShow = (productId, variant, name_variant) => {
        // Kiểm tra xem variant và name_variant có tồn tại không trước khi đặt giá trị cho chúng
        if (variant && name_variant) {
            setCurrentProduct({ productId: productId, variantId: variant._id, variantName: name_variant });
        } else {
            // Nếu không có variant hoặc name_variant, bạn có thể đặt variantId và variantName thành một chuỗi rỗng hoặc một giá trị mặc định nào đó
            setCurrentProduct({ productId: productId, variantId: "", variantName: "" });
        }
        setShow(true);
    };

    const fetchHoanhThanh = async () => {
        await dispatch(getOrderByUserId(id))
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
            const orderUserDaMua = listOrders.find(order =>
                order.cart.some(item => item.product === currentProduct.productId)
            );

            if (orderUserDaMua) {

                // Thêm userId, variantId và variantName vào dữ liệu đánh giá
                const reviewData = { ...review, userId: orderUserDaMua.user, variantId: currentProduct.variantId, variantName: currentProduct.variantName };
                await dispatch(addReview(currentProduct.productId, reviewData));

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
    }, [id]);
    const completedOrders = listOrders.filter(order => order.statusUser === 'Đã giao thành công');

    return (
        <>
            <div className='OrderCho'>
                <div className='top row'>
                    <div className='my-order'>
                        {completedOrders && completedOrders.map(order => {
                            return (
                                <div className='boc' key={order._id}>
                                                                        <div className='code'>Mã đơn: {order.orderCode}</div>

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
                                                    <div className='price'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                                    <div className='price-sale'>{item.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                                    <div className='btn-review' onClick={() => handleShow(item.product, item?.variant, item?.name_variant)}>Đánh giá</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='bottom'>
                                        <div className='tien'>Thành tiền:   {order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                        <div className='status-ht' >{order.statusUser}</div>
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