import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { detailProduct } from '../../store/actions/adminAction';
import './InfoProduct.scss';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";
import { marked } from 'marked';

const InfoProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const infoProduct = useSelector(state => state.admin.detailProduct);

    //state cho ảnh hiện tại và variant hiện tại
    const [currentImage, setCurrentImage] = useState(0);
    const [currentVariant, setCurrentVariant] = useState(null);

    const [start, setStart] = useState(0);

    const [isExpanded, setIsExpanded] = useState(false);
    const markdownText = infoProduct?.description;
    // Nếu markdownText không tồn tại (undefined hoặc null), chúng ta sẽ chuyển đổi chuỗi rỗng để tránh lỗi
    const htmlText = marked(markdownText || '');


    const images =
        infoProduct && infoProduct.images && infoProduct.variants
            // Nếu cả ba đều tồn tại, tạo một mảng mới bằng cách kết hợp infoProduct.images và ảnh từ tất cả các variant
            ? [...infoProduct.images, ...infoProduct.variants.map(variant => variant.images).flat()]
            // Nếu infoProduct.variants không tồn tại, kiểm tra xem infoProduct.images có tồn tại không
            : infoProduct && infoProduct.images
                // Nếu infoProduct.images tồn tại, tạo một mảng mới chỉ chứa infoProduct.images
                ? [...infoProduct.images]
                : [];

    const handleNext = () => {
        if (start + 5 >= images.length) {
            setStart(0);
        } else {
            setStart(start + 1);
        }
    };

    const handlePrev = () => {
        if (start - 1 < 0) {
            setStart(images.length - 5);
        } else {
            setStart(start - 1);
        }
    };



    const handleVariantChange = (variant) => {
        //khi nhấp chọn 2 lần để bỏ
        // Kiểm tra xem variant được chọn có phải là variant hiện tại hay không
        if (currentVariant && currentVariant._id === variant._id) {
            // Nếu đúng, đặt currentVariant thành null để bỏ chọn nó
            setCurrentVariant(null);
        } else {
            // Nếu không, đặt currentVariant thành variant được chọn
            setCurrentVariant(variant);
            // Tìm index của ảnh đầu tiên của variant trong mảng images
            const variantImageIndex = images.findIndex(image => image === variant.images[0]);
            setCurrentImage(variantImageIndex);
        }
    };

    //___amount
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
        dispatch(detailProduct(id));
    }, [dispatch, id]);

    const handleLoad = () => {
        dispatch(detailProduct(id));
    }

    return (
        <>
            <div className='product-page'>
                <div className='container'>
                    <div className='info-product'>
                        <div className='row'>
                            <div className='col-6 left p-2'>
                                <div className='image-info'>
                                    <div className='top-image'>
                                        {/* Hiển thị ảnh lớn ở trên cùng. Nếu một variant đang được chọn, hiển thị ảnh đầu tiên của variant đó.
                                            Nếu không, hiển thị ảnh hiện tại dựa trên index của `currentImage`. */}
                                        <img src={currentVariant ? currentVariant.images[0] : images[currentImage]} className="product-image" />

                                        {/* Hiển thị danh sách các ảnh nhỏ ở dưới. Người dùng có thể chọn một ảnh để xem. */}
                                        <div className="bot-image">
                                            <button id="goToPrevSlide" onClick={handlePrev}><GrPrevious className='icon' /></button>

                                            {/* Hiển thị ds image, bắt đầu từ ảnh `start` và kết thúc ở ảnh `start + 5`.
                                                     Khi một ảnh được chọn, cập nhật `currentImage` để hiển thị ảnh đó và đặt `currentVariant` về null. */}
                                            {images.slice(start, start + 5).map((image, index) => (
                                                <div className={`image-slide ${index === currentImage ? 'active' : ''}`}
                                                    key={index} onClick={() => {
                                                        setCurrentImage(start + index);
                                                        if (currentVariant) {
                                                            setCurrentVariant(null);
                                                        }
                                                    }}>
                                                    <img src={image} className="product-image" />
                                                </div>
                                            ))}

                                            <button onClick={handleNext}><GrNext className='icon' /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 right p-4'>
                                {/* thông tin */}
                                <div className='info-top'>
                                    <div className='brand-info mb-2'>

                                        {infoProduct && infoProduct.brand && (
                                            <NavLink to={`/brand/${infoProduct.brand._id}`}>
                                                {infoProduct.brand.brand_name}
                                            </NavLink>
                                        )}<GrFormNext />

                                    </div>
                                    <div className='info-top-down'>
                                        <div className='title-info' onClick={handleLoad}>{infoProduct?.name_product}</div>
                                        <div className='discount'>{currentVariant ? -  currentVariant.discount : -  infoProduct?.discount}%</div>
                                    </div>

                                </div>

                                {/* review */}
                                <div className='info-center col-6'>
                                    <p className='text-star'>{infoProduct?.averageRating}<IoIosStar className='icon-star' /></p>
                                    {/* số lượt đánh giá */}
                                    <p className='text-review'>{infoProduct?.reviews?.length} Đánh giá</p>
                                    <p>{infoProduct?.purchases} Đã bán</p>
                                </div>

                                {/* giá */}
                                <div className='price-info'>
                                    <div className='price'>
                                        {currentVariant
                                            ? currentVariant?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                            : infoProduct?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </div>
                                    <div className='sale-price'>
                                        {currentVariant
                                            ? currentVariant?.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                            : infoProduct?.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </div>
                                </div>

                                {/* biến thể */}
                                <div className='variant-option'>
                                    {infoProduct?.variants ? infoProduct.variants.map((variant, index) => (
                                        variant && variant.name && variant.images && variant.images[0] && variant._id ? (
                                            <div
                                                class={`product-variant ${currentVariant && currentVariant._id === variant._id ? 'active' : ''}`}
                                                key={variant._id}
                                            >
                                                <input
                                                    value={variant.name}
                                                    type="radio"
                                                    id={`product-swatch-input-option1-${index + 1}`}
                                                    onChange={() => handleVariantChange(variant)}
                                                    checked={currentVariant && currentVariant._id === variant._id}
                                                />
                                                <label for={`product-swatch-input-option1-${index + 1}`}>
                                                    <img className="img-variant" src={variant.images[0]} alt={variant.name} />
                                                    <span className="">{variant.name}</span>
                                                </label>
                                            </div>
                                        ) : null
                                    )) : null}
                                </div>

                                {/* chọn số lượng mua */}
                                <div className='so-luong'>
                                    <div className='amount'>
                                        <button className='btn-amount' onClick={decreaseAmount}>-</button>
                                        <div className='amount-number'>{amount}</div>
                                        <button className='btn-amount' onClick={increaseAmount}>+</button>
                                        <div className='quantity mt-4'>{currentVariant ? currentVariant.quantity : infoProduct?.quantity} Sản phẩm có sẵn</div>


                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    {/* render review */}
                    <div className='info-review'>
                        <div className='title mb-2'>Chi tiết sản phẩm</div>
                        <div
                            className='description-info'
                            dangerouslySetInnerHTML={{ __html: htmlText }}
                            style={{ maxHeight: isExpanded ? '' : '350px', overflow: 'hidden' }}
                        ></div>

                        <div className="button-container">
                            {isExpanded ? (
                                <button className='btn-expand'
                                    onClick={() => setIsExpanded(false)}>Thu gọn</button>
                            ) : (
                                <button className='btn-expand'
                                    onClick={() => setIsExpanded(true)}>Mở rộng</button>
                            )}
                        </div>

                        <div className='review'>

                            <div className='boc-dg'>
                                <div className='title'>Đánh giá sản phẩm</div>
                                <div className='boc-sao'>
                                    <p className='text-star'>{infoProduct?.averageRating}<IoIosStar className='icon-star' /></p>
                                    <p className='text-p'>trên  5</p>
                                </div>


                            </div>

                            {infoProduct?.reviews?.map((review, index) => {
                                return (
                                    <div className='danh-gia mt-4'>
                                        <div key={index} className=''>
                                            <div className='user-info'>
                                                <img className='user-image' src={review.user.image} />
                                                <div className='user-name'>{review.user.firstName}</div>
                                            </div>
                                            <div className='cmt-info'>
                                                <div className='rating'>{review.rating} <IoIosStar className='icon-star' /> </div>
                                                <div className='comment'>{review.comment}</div>
                                                <div className='created-at'>{new Date(review.createdAt).toLocaleDateString()}</div>
                                            </div>

                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoProduct;