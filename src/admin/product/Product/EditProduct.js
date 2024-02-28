import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { getAllBrand, getAllCategory, getAllType, editProduct, getAllProduct } from '../../../store/actions/adminAction';
import Select from 'react-select';
import "./EditProduct.scss";
import { getBase64 } from '../../../utils/Base64';
import Navbar from '../../../components/Navbar/Navbar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';

const EditProduct = ({ fetchProduct }) => {
    const { id } = useParams();

    const [product, setProduct] = useState({
        name_product: '',
        brand: '',
        description: '',
        category: [],
        product_type: [],
        images: [],
        price: '',
        quantity: '',
        discount: '',
        sale_price: '',
        variants: [
            {
                name: "",
                images: [],
                price: '',
                quantity: '',
                discount: '',
                promotionPrice: '',
                sku: "",
            }
        ],
        sku: '',
    });

    //select option
    const [selectCategory, setSelectCategory] = useState([]);
    const [selectBrand, setSelectBrand] = useState([]);
    const [selectType, setSelectType] = useState([]);


    const dispatch = useDispatch();
    const listBrand = useSelector(state => state.admin.allBrand);
    const listCategory = useSelector(state => state.admin.allCategory);
    const listProductType = useSelector(state => state.admin.allType);

    useEffect(() => {
        dispatch(getAllBrand());
        dispatch(getAllCategory());
        dispatch(getAllType());
    }, [dispatch]);


    //lấy product

    

    const handleOnChange = (event, name) => {
        const { value } = event.target;
        const updateProduct = { ...product };
        updateProduct[name] = value;
        setProduct(updateProduct);
    };


    const validateInput = () => {
        let isValid = true;
        let checkArr = ['name_product', 'brand', 'description', 'category', 'product_type', 'images', 'price', 'quantity', 'sku'];

        const displayNames = {
            'name_product': 'Tên sản phẩm',
            'brand': 'Thương hiệu',
            'description': 'Mô tả',
            'category': 'Danh mục',
            'product_type': 'Loại sản phẩm',
            'images': 'Hình ảnh',
            'price': 'Giá',
            'quantity': 'Số lượng',
            'sku': 'SKU'
        };

        for (let i = 0; i < checkArr.length; i++) {
            if (!product[checkArr[i]]) {
                isValid = false;
                toast.error('Bạn điền thiếu: ' + displayNames[checkArr[i]]);
                break;
            }
        }
        return isValid;
    };

    const handleEditProduct = async () => {
        try {
            let isValid = validateInput();
            if (!isValid) {
                return;
            }
            let updateProduct = { ...product, _id: product._id }
            await dispatch(editProduct(updateProduct));
            setProduct({
                name_product: '',
                brand: '',
                description: '',
                category: [],
                product_type: [],
                images: [],
                price: '',
                quantity: '',
                discount: '',
                sale_price: '',
                variants: [
                    {
                        name: "",
                        images: [],
                        price: '',
                        quantity: '',
                        discount: '',
                        promotionPrice: '',
                        sku: "",
                    }
                ],
                sku: '',
            });
            setSelectCategory([]); // Reset danh sách danh mục đã chọn
            setSelectBrand([]);
            setSelectType([]);

            if (fetchProduct) {
                fetchProduct();
            }
        } catch (error) {
            console.error('Error create user:', error);
        }
    };

    const handleOnChangeCategory = (selectedOptions, actionMeta, id) => {
        if (id === 'category') {
            // Lọc ds danh mục từ Redux chỉ giữ lại những danh mục đã được chọn
            const filter_select_type = listCategory.filter(category =>
                selectedOptions.some(option => option.value === category._id)
            );
            // Cập nhật state local với danh sách danh mục đã chọn
            setSelectCategory(filter_select_type);

            // Cập nhật trường 'category' trong state local của sản phẩm với ID của các danh mục đã chọn
            setProduct((prevState) => ({
                ...prevState,
                [id]: selectedOptions.map(option => option.value),
            }));
        }
    };

    const handleOnChangeType = (selectedOptions, actionMeta, id) => {
        if (id === 'product_type') {
            // Lọc ds danh mục từ Redux chỉ giữ lại những danh mục đã được chọn
            const filter_select_type = listProductType.filter(product_type =>
                selectedOptions.some(option => option.value === product_type._id)
            );
            setSelectType(filter_select_type);

            setProduct((prevState) => ({
                ...prevState,
                [id]: selectedOptions.map(option => option.value),
            }));

        }
    };

    const handleOnChangeBrand = (selectedOption) => {
        // Cập nhật selectBrand
        setSelectBrand({
            brand_name: selectedOption.label,
            _id: selectedOption.value,
        });

        // Cập nhật product
        setProduct((prevState) => ({
            ...prevState,
            brand: selectedOption.value,
        }));

    };

    const fileInputRef = useRef();
    const fileInputRefVa = useRef();



    const handleImageChange = async (event) => {
        const fileList = Array.from(event.target.files);
        const updatedImages = await Promise.all(fileList.map(async file => {
            if (!file.url && !file.preview) {
                let base64Image = await getBase64(file);
                base64Image = `data:image/jpeg;base64,${base64Image.split(',')[1]}`;
                file.preview = base64Image;
            }
            return file.preview;
        }));
        setProduct(prevState => ({ ...prevState, images: [...prevState.images, ...updatedImages] }));
    };
    // xóa ảnh
    const handleRemoveImage = (index) => {
        setProduct(prevState => {
            const images = [...prevState.images];
            images.splice(index, 1);
            return { ...prevState, images };
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };



    //mục sản phẩm
    // Hàm này thêm một biến thể mới vào mảng variants trong product
    const handleAddVariant = () => {
        setProduct(prevState => ({
            // Sử dụng toán tử spread để sao chép tất cả các thuộc tính hiện tại của product
            ...prevState,
            // Thêm một biến thể mới vào mảng variants
            variants: [...prevState.variants, { name: '', images: [], price: '', quantity: '', discount: '', promotionPrice: '', sku: '' }]
        }));
    };

    // Hàm này cập nhật giá trị của một trường trong một biến thể cụ thể
    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        setProduct(prevState => {
            // Tạo một bản sao mới của mảng variants
            const newVariants = [...prevState.variants];
            // Cập nhật giá trị của trường tương ứng trong biến thể cụ thể
            newVariants[index][name] = value;
            // Trả về một bản sao mới của product với mảng variants đã được cập nhật
            return { ...prevState, variants: newVariants };
        });
    };
    const handleButtonClick = () => {
        fileInputRefVa.current.click();
    };

    // Hàm này cập nhật mảng hình ảnh của một biến thể cụ thể
    const handleImageVar = async (event, index) => {
        const file = event.target.files[0]; // chỉ lấy file đầu tiên từ danh sách file
        let base64Image = await getBase64(file);
        base64Image = `data:image/jpeg;base64,${base64Image.split(',')[1]}`;
        setProduct(prevState => {
            // Tạo một bản sao mới của mảng variants
            const newVariants = [...prevState.variants];
            // Cập nhật hình ảnh của biến thể cụ thể
            newVariants[index].images = [base64Image]; // chỉ đặt một hình ảnh duy nhất
            // Trả về một bản sao mới của product với mảng variants đã được cập nhật
            return { ...prevState, variants: newVariants };
        });
    };

    const handleRemoveVariant = (index) => {
        setProduct(prevState => {
            const newVariants = [...prevState.variants];
            newVariants.splice(index, 1);
            return { ...prevState, variants: newVariants };
        });
    };

    return (
        <>
            <div className='EditProduct'>
                <Sidebar />
                <div className='edit-container'>
                    <Navbar />

                    <div className='top row'>
                        <div className='col ben-trai '>
                            <div className='col-2 title-product mb-3'>Chỉnh sửa thông tin sản phẩm</div>

                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Tên sản phẩm:</label>
                                <div className="col-sm-4">
                                    <input placeholder="Tên sản phẩm"
                                        type="text"
                                        className="form-control"
                                        value={product.name_product}
                                        onChange={(event) => handleOnChange(event, 'name_product')}
                                    />
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Thương hiệu:</label>
                                <div className="col-sm-4">
                                    <Select
                                        options={listBrand.map(brand => ({ // Chuyển đổi  ds brand Select
                                            label: brand.brand_name,
                                            value: brand._id,
                                        }))}
                                        value={{
                                            label: selectBrand.brand_name,
                                            value: selectBrand._id,
                                        }}
                                        onChange={(selectedOption) =>
                                            handleOnChangeBrand(selectedOption, 'brand')
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Danh mục:</label>
                                <div className="col-sm-4">
                                    <Select placeholder="Chọn danh mục..."
                                        isMulti // Cho phép chọn nhiều mục
                                        options={listCategory.map(category => ({ // Chuyển đổi  ds category Select
                                            label: category.category_name, // Tên danh mục sẽ hiển thị cho người dùng
                                            value: category._id, // ID danh mục sẽ được lưu khi người dùng chọn mục này
                                        }))}
                                        value={selectCategory.map(category => ({ // Chuyển đổi danh sách danh mục đã chọn từ state local thành Select
                                            label: category.category_name, // Tên danh mục sẽ hiển thị cho người dùng
                                            value: category._id, // ID danh mục sẽ được lưu khi người dùng chọn mục này
                                        }))}
                                        onChange={(selectedOptions, actionMeta) => // Hàm này sẽ được gọi khi người dùng thay đổi lựa chọn
                                            handleOnChangeCategory(selectedOptions, actionMeta, 'category') // Gọi hàm handleOnChangeCategory với các lựa chọn mới, thông tin về hành động, và 'category' để biết rằng đây là trường 'category' đang được thay đổi
                                        }
                                    />
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Phân loại sản phẩm:</label>
                                <div className="col-sm-4">
                                    <Select placeholder="Chọn phân loại..."
                                        isMulti // Cho phép chọn nhiều mục
                                        options={listProductType.map(product_type => ({
                                            label: product_type.type_name,
                                            value: product_type._id,
                                        }))}
                                        value={selectType.map(product_type => ({
                                            label: product_type.type_name,
                                            value: product_type._id,
                                        }))}
                                        onChange={(selectedOptions, actionMeta) =>
                                            handleOnChangeType(selectedOptions, actionMeta, 'product_type')
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Mô tả sản phẩm:</label>
                                <div className="col-sm-4">
                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        value={product.description}
                                        onChange={(event) => handleOnChange(event, 'description')}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Giá:</label>
                                <div className="col-sm-4">
                                    <input
                                        type="text" placeholder="Giá"
                                        className="form-control"
                                        value={product.price}
                                        onChange={(event) => handleOnChange(event, 'price')}
                                    />
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Mã giảm(nhập 0-100)%:</label>
                                <div className="col-sm-4">
                                    <input
                                        type="text" placeholder="Nhập từ 0% đến 100%"
                                        className="form-control"
                                        value={product.discount}
                                        onChange={(event) => handleOnChange(event, 'discount')}
                                    />
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Giá bán:</label>
                                <div className="col-sm-4">
                                    <input
                                        type="text" placeholder="Giá bán"
                                        className="form-control"
                                        value={product.sale_price}
                                        onChange={(event) => handleOnChange(event, 'sale_price')}
                                    />
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Số lượng:</label>
                                <div className="col-sm-4">
                                    <input
                                        type="text" placeholder="Số lượng"
                                        className="form-control"
                                        value={product.quantity}
                                        onChange={(event) => handleOnChange(event, 'quantity')}
                                    />
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="col-sm-2 h6 col-form-label">Mã SKU:</label>
                                <div className="col-sm-4">
                                    <input
                                        type="text" placeholder="Mã SKU"
                                        className="form-control"
                                        value={product.sku}
                                        onChange={(event) => handleOnChange(event, 'sku')}
                                    />
                                </div>
                            </div>


                            <div className="form-group row mb-3">
                                <labe className='col-sm-2 h6 col-form-label' >Thêm hình ảnh </labe>
                                <div className="col-sm-4 mt-1">
                                    Số hình ảnh ({product.images.length})
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        multiple
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                    <Button variant="outlined" className="ms-3" onClick={handleUploadClick}>Chọn hình ảnh</Button>
                                </div>
                                <div className='' style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {product.images && product.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} style={{ height: '100px', width: '100px', marginTop: '3px', }} />
                                            <button className='btn-delete' onClick={() => handleRemoveImage(index)}>x</button>
                                        </div>
                                    ))}
                                </div>
                                {/*  */}
                                <div className='ms-2 custombg col-12 p-3 mt-3 '>
                                    <div className='h6'>Mục sản phẩm</div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tên phân loại</th>
                                                <th>Giá</th>
                                                <th>Giảm giá</th>
                                                <th>Giá khuyến mãi</th>
                                                <th>Số lượng</th>
                                                <th>SKU phân loại</th>
                                                <th>Hình ảnh</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.variants.map((variant, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input type="text" className=''
                                                            name="name"
                                                            value={variant.name}
                                                            onChange={(event) => handleInputChange(event, index)}
                                                            placeholder="Tên phân loại" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="price"
                                                            value={variant.price}
                                                            onChange={(event) => handleInputChange(event, index)} placeholder="Giá" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="discount"
                                                            value={variant.discount}
                                                            onChange={(event) => handleInputChange(event, index)} placeholder="Giảm giá" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="promotionPrice"
                                                            value={variant.promotionPrice}
                                                            onChange={(event) => handleInputChange(event, index)} placeholder="Giá khuyến mãi" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="quantity"
                                                            value={variant.quantity}
                                                            onChange={(event) => handleInputChange(event, index)} placeholder="Số  lượng" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="sku"
                                                            value={variant.sku}
                                                            onChange={(event) => handleInputChange(event, index)} placeholder="SKU phân loại" />
                                                    </td>
                                                    <td>
                                                        <input
                                                            style={{ display: 'none' }}
                                                            id="file-upload"
                                                            className="custom-file-input"
                                                            type="file"
                                                            onChange={(event) => handleImageVar(event, index)}
                                                            multiple
                                                            accept="image/*"
                                                            ref={fileInputRefVa}

                                                        />

                                                        <label htmlFor="file-upload" className="custom-file-upload ">
                                                            <Button variant="contained" size="small" onClick={handleButtonClick}>Tải lên</Button>
                                                        </label>
                                                        <div>
                                                            {variant.images && variant.images.map((image, index) => (
                                                                <img key={index} src={image} style={{ height: '50px', width: '50px', marginTop: '3px' }} />
                                                            ))}
                                                        </div>

                                                    </td>

                                                    <td>
                                                        <div className='btn-custom' onClick={() => handleAddVariant()}>+</div>
                                                        {product.variants.length > 1 && <div className='btn-custom' onClick={() => handleRemoveVariant(index)}>-</div>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className='col-12 mt-3'>
                                    <Button className="btn btn-save text-light" onClick={handleEditProduct} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                                        Lưu
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
