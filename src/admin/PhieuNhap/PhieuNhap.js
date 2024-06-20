import React, { useEffect, useState, useRef } from 'react';
import "./PhieuNhap.scss"
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, Button as MaterialButton } from '@mui/material';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import { searchProduct } from '../../store/actions/adminAction';
import { allPhieuNhap, changeNhapHang, updateNhapHang } from '../../store/actions/productAction';
import { IoSearch } from 'react-icons/io5';
import { MdEditDocument } from "react-icons/md";

const PhieuNhap = () => {
    const dispatch = useDispatch();
    const listSearchProduct = useSelector(state => state.admin.listSearchProduct)
    const [searchproduct, setSearch] = useState('');
    const listNhapHang = useSelector(state => state.admin.listNhapHang);
    const [listNhapHangForm, setListNhapHang] = useState(listNhapHang);

    const fetchListProduct = async () => {
        try {
            await dispatch(allPhieuNhap());
        } catch (error) {
            console.error('Error fetching Product list:', error);
        }
    };

    const handleVariantChange = (e, itemIndex, phieuIndex, variantIndex, field) => {
        // Chuyển đổi giá trị mới thành số
        const newValue = e.target.value && !isNaN(e.target.value) ? Number(e.target.value) : 0;

        if (isNaN(newValue)) {
            console.error('Invalid number value');
            return;
        }
        // Tạo một bản sao của listNhapHang
        const newListNhapHang = [...listNhapHang];
        // Cập nhật giá trị tương ứng
        newListNhapHang[itemIndex].phieuItems[phieuIndex].variants[variantIndex][field] = newValue;
        // Cập nhật state
        setListNhapHang(newListNhapHang);
        // Tạo dữ liệu cần thiết để gửi đến backend
        const data = {
            id: newListNhapHang[itemIndex]._id,
            phieuItems: newListNhapHang[itemIndex].phieuItems.map(phieuItem => ({
                product: phieuItem.product,
                variants: phieuItem.variants.map(variant => ({
                    variant: variant.variant,
                    newQuantity: variant.newQuantity,
                    price: variant.price
                })),
            }))
        };
        dispatch(changeNhapHang(data));
        fetchListProduct();
    };
    const handleItemChange = (e, itemIndex, phieuIndex, field) => {
        const newValue = e.target.value && !isNaN(e.target.value) ? Number(e.target.value) : 0;

        if (isNaN(newValue)) {
            console.error('Invalid number value');
            return;
        }

        const newListNhapHang = [...listNhapHang];
        newListNhapHang[itemIndex].phieuItems[phieuIndex][field] = newValue;
        setListNhapHang(newListNhapHang);

        const data = {
            id: newListNhapHang[itemIndex]._id,
            phieuItems: newListNhapHang[itemIndex].phieuItems.map(phieuItem => ({
                product: phieuItem.product,
                newQuantity: phieuItem.newQuantity,
                price: phieuItem.price
            }))
        };

        dispatch(changeNhapHang(data));
        fetchListProduct();
    };
    const handleSaveChanges = async () => {
        try {
            if (listNhapHangForm && Array.isArray(listNhapHangForm)) {
                // Get the first item from listNhapHangForm
                const item = listNhapHangForm[0];

                // Create the data object
                const data = {
                    id: item._id,
                    phieuItems: item.phieuItems.map(phieuItem => ({
                        product: phieuItem.product,
                        variants: phieuItem.variants.map(variant => ({
                            variant: variant.variant,
                            newQuantity: variant.newQuantity,
                            price: variant.price
                        })),
                    }))
                };

                // Send the data to the backend
                await dispatch(updateNhapHang(data));
                await fetchListProduct();
            } else {
                console.error('listNhapHangForm is null or not an array');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };
    const handleSearchChange = async (event) => {
        setSearch(event.target.value);
        await dispatch(searchProduct(searchproduct))
    };

    const handleSearchSubmit = async () => {
        await dispatch(searchProduct(searchproduct))
    }

    useEffect(() => {
        fetchListProduct();
    }, []);

    return (
        <>
            <div className='Product'>
                <Sidebar />
                <div className='Product-container'>
                    <Navbar />
                    <div className='Product-content'>
                        <div className='bottom row'>
                            <div className='title-cate h4 my-3 mx-2'>Danh sách các phiếu nhập</div>
                            {listNhapHang && listNhapHang.map((item, index) => (
                                item.phieuItems && item.phieuItems.map((phieuItem, phieuIndex) => (
                                    <table className="table-product" key={phieuIndex}>
                                        <thead>
                                            <tr className='' style={{ backgroundColor: "#E6E6E6" }}>
                                                <th>sản phẩm</th>
                                                <th>Phân loại</th>
                                                <th>Tồn kho</th>
                                                <th>SKU </th>
                                                <th>Số lượng nhập</th>
                                                <th>Giá nhập</th>
                                                <th>Số lượng sau nhập </th>
                                                <th>Tổng chi phí</th>
                                                {/* <th>Nhà phân phối</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowSpan={phieuItem.variants ? phieuItem.variants.length + 1 : 1}>
                                                    <div className='anh-name'>
                                                        <div>
                                                            <img src={phieuItem.image[0]} style={{ width: "50px" }} />
                                                        </div>
                                                        <div className='name'>
                                                            {phieuItem.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>    </td>
                                                <td>{phieuItem.quantity_product}</td>
                                                <td>{phieuItem.sku_product}</td>
                                                <td><input type="text" value={item.newQuantity} onChange={e => handleItemChange(e, index, phieuIndex, 'newQuantity')} /></td>
                                                <td><input type="text" value={item.price} onChange={e => handleItemChange(e, index, phieuIndex, 'price')} /></td>
                                                <td>{item.totalQuantity}</td>
                                                <td>{item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>

                                            </tr>
                                            {phieuItem.variants && phieuItem.variants.map((variant, variantIndex) => (
                                                <tr key={variantIndex}>
                                                    <td>{variant.name_variant}</td>
                                                    <td>{variant.quantity_variant}</td>
                                                    <td>{variant.sku_variant}</td>
                                                    <td><input type="text" value={variant.newQuantity} onChange={e => handleVariantChange(e, index, phieuIndex, variantIndex, 'newQuantity')} /></td>
                                                    <td><input type="text" value={variant.price} onChange={e => handleVariantChange(e, index, phieuIndex, variantIndex, 'price')} /></td>
                                                    <td>{variant.totalQuantity}</td>
                                                    <td>{variant.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                </tr>
                                            ))}
                                        </tbody>


                                        <tfoot>
                                            <tr>
                                                <td colSpan="9">
                                                    <MaterialButton variant="contained" color="primary" onClick={handleSaveChanges}>Lưu</MaterialButton>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                ))
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PhieuNhap;