import React, { useEffect, useState, useRef } from 'react';
import "./CreateProduct.scss"
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { createProduct, getAllBrand, getAllCategory, getAllType } from '../../../store/actions/adminAction';
import Select from 'react-select';
import { getBase64 } from '../../../utils/Base64';

const CreateProduct = () => {
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
        variants: [],
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

    // tính giá sale 
    useEffect(() => {
        if (product.price && product.discount) {
            const sale_price = product.price - (product.price * product.discount) / 100;
            setProduct(prevProduct => ({ ...prevProduct, sale_price }));
        }
    }, [product.price, product.discount]);

    const handleOnChange = (event, id) => {
        const value = event.target.value;
        setProduct((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validateInput = () => {
        let isValid = true;
        let checkArr = ['name_product', 'brand', 'description', 'category', 'product_type',
            'images', 'price', 'quantity', 'sku'];

        for (let i = 0; i < checkArr.length; i++) {
            if (!product[checkArr[i]]) {
                isValid = false;
                toast.error('Bạn điền thiếu: ' + checkArr[i]);
                break;
            }
        }
        return isValid;
    };

    const handleCreateProduct = async () => {
        try {
            let isValid = validateInput();
            if (!isValid) {
                return;
            }
            await dispatch(createProduct(product));
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
                variants: [],
                sku: '',
            });
            setSelectCategory([]); // Reset danh sách danh mục đã chọn
            setSelectBrand([]);
            setSelectType([]);
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
            // Log danh sách danh mục đã chọn và sản phẩm sau khi cập nhật
            // console.log('Selected Categories:', filter_select_type);
            // console.log('Updated Product:', {
            //     ...product,
            //     [id]: selectedOptions.map(option => option.value),
            // });
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

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const [variants, setVariants] = useState([
        { name: '', images: [], price: '', quantity: '', discount: '', promotionPrice: '', sku: '' }
    ]);

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', images: [], price: '', quantity: '', discount: '', promotionPrice: '', sku: '' }]);
    };

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const newVariants = [...variants];
        newVariants[index][name] = value;
        setVariants(newVariants);
    };


    return (
        <>
            <div className='CreateProduct'>
                <div className='row title h5 mb-3'>Thêm sản phẩm</div>
                <div className='col ben-trai '>
                    <div className="form-group row mb-3">
                        <label className="col-sm-2 h6 col-form-label">Tên sản phẩm:</label>
                        <div className="col-sm-4">
                            <input
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
                            <input
                                type="text"
                                className="form-control"
                                value={product.description}
                                onChange={(event) => handleOnChange(event, 'description')}
                            />
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-sm-2 h6 col-form-label">Giá:</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                            <Button variant="outlined" onClick={handleUploadClick}>Chọn hình ảnh</Button>
                        </div>
                        <div>
                            {product.images && product.images.map((image, index) => (
                                <img key={index} src={image} style={{ height: '100px', width: '100px', marginTop: '5px' }} />
                            ))}
                        </div>

                        <div className='ms-2 custombg col-10 p-3 mt-3 '>
                            <div className='h6'>Mục sản phẩm</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kích thước</th>
                                        <th>Giá</th>
                                        <th>Kho hàng</th>
                                        <th>SKU phân loại</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {variants.map((variant, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="text"
                                                    name="name"
                                                    value={variant.name}
                                                    onChange={(event) => handleInputChange(event, index)}
                                                    placeholder="Kích thước" />
                                            </td>
                                            <td>
                                                <input type="text" name="price"
                                                    value={variant.price}
                                                    onChange={(event) => handleInputChange(event, index)} placeholder="Giá" />
                                            </td>
                                            <td>
                                                <input type="text" name="quantity"
                                                    value={variant.quantity}
                                                    onChange={(event) => handleInputChange(event, index)} placeholder="Kho hàng" />
                                            </td>
                                            <td>
                                                <input type="text" name="sku"
                                                    value={variant.sku}
                                                    onChange={(event) => handleInputChange(event, index)} placeholder="SKU phân loại" />
                                            </td>
                                            <td>
                                                <button className='btn-custom' onClick={handleAddVariant}>+</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className='col-12 mt-3'>
                            <Button className="btn btn-save text-light" onClick={handleCreateProduct} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                                Lưu
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;
