import React, { useEffect, useState, useRef } from 'react';
import "./AllOrders.scss"
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SidebarOrder from './SidebarOrder/SidebarOrder';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from "react-icons/fc";
import { getAllOrder, searchOrder, getOrderByDate } from '../../store/actions/productAction';
import { TbEyeSearch } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";
import { IoSearch } from 'react-icons/io5';


const AllOrders = () => {

    const dispatch = useDispatch();
    const listOrders = useSelector(state => state.admin.orderByDate) 
    const listSearchOrder = useSelector(state => state.admin.listSearchOrder)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  
    
    const [search, setSearch] = useState('');

    const fetchAllOrders = async () => {
        await dispatch(getAllOrder())
    }

    const handleSearchChange = async (event) => {
        setSearch(event.target.value);
        await dispatch(searchOrder(search))

    };

    const fetchOrdersByDate = async () => {
        await dispatch(getOrderByDate(startDate, endDate));
    }

    const handleSearchSubmit = async () => {
        await dispatch(searchOrder(search))
    }

    const getColor = (statusUser) => {
        switch (statusUser) {
            case 'Đơn hàng bị hủy':
                return { color: "#dc3545", backgroundColor: "#f6c4c4" };
            case 'Đơn hàng đang được giao':
                return { color: "#8912d5", backgroundColor: "#ffe2ff" };
            case 'Đã giao thành công':
                return { color: "#0a8db3", backgroundColor: "#e2fbff" };
            default:
                return { color: "#65990e", backgroundColor: "#e9ffc5" };
        }
    };

    const handleRefresh = () => {
        fetchAllOrders()
    }

    useEffect(() => {
        fetchOrdersByDate();
    }, [startDate, endDate]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <>

            <div className='AllOrders'>
                <Sidebar />
                <div className='AllOrders-container'>
                    <Navbar />
                    <div className='AllOrders-content'>

                        <div className='top row'>
                            <SidebarOrder />

                            <div className='sreach col-7'>
                                <input type='text'
                                    placeholder='Nhập tên sản phẩm cần tìm'
                                    className="input col-9"
                                    value={search}
                                    onChange={(event) => handleSearchChange(event,)} />

                                <div className='find' onClick={handleSearchSubmit}><IoSearch /></div>
                            </div>

                            <div className='date col-5'>
                                <div className='text'>Ngày đặt hàng:</div>
                                <div className='boc'>
                                    <FcCalendar className='icon' />
                                    <DatePicker
      selected={startDate}
      onChange={(dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      }}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      dateFormat="dd/MM/yyyy"
    />
                            </div>
                            </div>

                        </div>
                        <div className='bottom row'>
                            <div className='up-order'>
                            <div className='length'>{listOrders && listOrders.length} Đơn hàng </div>
                                                            <div className='fresh' onClick={handleRefresh}><TbRefresh />   Làm mới</div>
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Mã Đơn</th>
                                        <th>Sản Phẩm</th>
                                        <th>Tổng Đơn</th>
                                        <th>Trạng thái</th>
                                        {/* <th>Hành động</th> */}
                                        <th>Xem chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(search ? listSearchOrder : listOrders)?.map(order => {
                                        return (
                                            <tr key={order._id}>
                                                <td style={{fontWeight: "500"}}>{order.orderCode}</td>
                                                <td>
                                                    {order.cart && order.cart.map((item, index) => (
                                                        <div key={index} className='product-info'>
                                                            <img src={item.image} alt={item.name} className='product-image' />
                                                            {/* tên, variant, amount */}
                                                            <div className='product-info-name'>
                                                                <span className='product-name'>{item.name}</span>
                                                                {item.variant &&
                                                                    <span className='product-variant'>{item.name_variant}
                                                                    </span>}

                                                                <span className='amount'>x {item.amount} </span>
                                                            </div>
                                                            <div style={{fontWeight: "500"}} className=''>{item.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>

                                                        </div>
                                                    ))}
                                                </td>
                                                <td style={{fontWeight: "500", color: "#800303" }}>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</td>
                                                <td >
                                                <span className='status-tong' style={{ ...getColor(order.statusAdmin),}}>{order.statusAdmin}</span>
                                                </td>
                                                <td><TbEyeSearch className='icon-eye' />Chi tiết</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default AllOrders;