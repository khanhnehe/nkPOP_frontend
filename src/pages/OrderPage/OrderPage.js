import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { detailProduct } from '../../store/actions/adminAction';
import './OrderPage.scss';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";
import { marked } from 'marked';

const OrderPage = () => {
    const dispatch = useDispatch();


    return (
        <>

        </>
    );
}

export default OrderPage;