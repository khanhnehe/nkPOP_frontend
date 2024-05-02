import React, { useEffect, useState, useRef } from 'react';
import "./PhieuNhap.scss"
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, Button as MaterialButton } from '@mui/material';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import {  searchProduct } from '../../store/actions/adminAction';
import { allPhieuNhap , changeNhapHang} from '../../store/actions/productAction';
import { IoSearch } from 'react-icons/io5';
import { MdEditDocument } from "react-icons/md";

const PhieuNhap = () => {
    const dispatch = useDispatch();
    const listSearchProduct = useSelector(state => state.admin.listSearchProduct)
    const [searchproduct, setSearch] = useState('');
    const listNhapHang = useSelector(state => state.admin.listNhapHang);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listNhapHangForm, setListNhapHang] = useState(listNhapHang);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchListProduct = async () => {
        try {
            await dispatch(allPhieuNhap());
        } catch (error) {
            console.error('Error fetching Product list:', error);
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
                            <div className='title-cate h4 my-3 mx-2'>Danh sách danh mục</div>
                            <div className='sreach mb-5'>
                                <div className='col-4' style={{ display: 'flex' }}>
                                    <input type='text'
                                        placeholder='Nhập tên sản phẩm cần tìm'
                                        className="input col-11"
                                        value={searchproduct}
                                        onChange={(event) => handleSearchChange(event,)} />

                                    <div className='find' onClick={handleSearchSubmit}><IoSearch /></div>
                                </div>
                            </div>
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
                                                <th>Nhà phân phối</th>
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
                                                <td><input type="number"   value={item.newQuantity}  /></td>
                                                <td><input type="number"  value={item.price}  /></td>
                                                <td>{item.totalQuantity}</td>
                                                <td>{item.totalPrice}</td>
                                            </tr>
                                            {phieuItem.variants && phieuItem.variants.map((variant, variantIndex) => (
                                                <tr key={variantIndex}>
                                                    <td>{variant.name_variant}</td>
                                                    <td>{variant.quantity_variant}</td>
                                                    <td>{variant.sku_variant}</td>
                                                    <td><input type="number" value={variant.newQuantity}/></td>
                                                    <td><input type="number"  value={variant.price} /></td>
                                                    <td>{variant.totalQuantity}</td>
                                                    <td>{variant.itemsPrice}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="9">
                                                    <MaterialButton variant="contained" color="primary">Lưu</MaterialButton>
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